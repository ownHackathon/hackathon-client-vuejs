<template>
  <div class="card">
    <div class="flex flex-column gap-2 w-full">
    <span v-if="label" class="font-bold text-gray-700">
      <i class="pi pi-eye mr-2"></i>{{ label }}
    </span>
      <!-- Das gerenderte HTML wird hier sicher ausgegeben -->
      <div
          class="markdown-body p-3 border-round surface-ground border-1 border-300 overflow-auto"
          v-html="sanitizedHtml"
      ></div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import markdownIt from 'markdown-it';
import deflist from 'markdown-it-deflist';
import footnote from 'markdown-it-footnote';
import abbr from 'markdown-it-abbr';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';
import mark from 'markdown-it-mark';
import ins from 'markdown-it-ins';
import {full as emoji} from 'markdown-it-emoji';
import container from 'markdown-it-container';
import taskCheckbox from 'markdown-it-task-checkbox';
import iterator from 'markdown-it-link-attributes';
import bracketedSpans from 'markdown-it-bracketed-spans';
import attrs from 'markdown-it-attrs';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import DOMPurify from 'dompurify';

const props = defineProps({
  value: {type: String, default: ''},
  label: {type: String, default: ''}
});
// Registrierung der verschiedenen Container-Typen
// Wir definieren hier 'info', 'warning' und 'success'
const containerTypes = ['info', 'warning', 'success', 'danger'];

const md = markdownIt({
  html: false, // Sicherheit: Kein rohes HTML erlauben
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, {language: lang}).value;
      } catch (__) {
      }
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';// use external default escaping
  }
});

md.linkify.set({fuzzyEmail: false});
md.use(abbr);
md.use(footnote);
md.use(sub);
md.use(sup);
md.use(mark);
md.use(ins);
md.use(emoji);
md.use(bracketedSpans);

md.use(iterator, {
  pattern: /^https?:\/\//,
  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer'
  }
});
md.use(taskCheckbox, {
  disabled: true,
  divWrap: true,
  divClass: 'task-item',
  idPrefix: 'cbx_'
});
md.use(deflist);
md.use(attrs.default || attrs, {
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: [] // Erlaubt alle Attribute
});
containerTypes.forEach(type => {
  md.use(container, type, {
    validate: function (params) {
      // Prüft, ob nach den ::: genau unser Typ steht (z.B. ::: info)
      return params.trim().match(new RegExp(`^${type}+(.*)$`));
    },
    render: function (tokens, idx) {
      const m = tokens[idx].info.trim().match(new RegExp(`^${type}+(.*)$`));
      if (tokens[idx].nesting === 1) {
        // Öffnendes Tag: Wir fügen eine CSS-Klasse hinzu
        // m[1] enthält optionalen Text nach dem Typ (z.B. ::: info Titel)
        const title = m[1].trim() || type.toUpperCase();
        return `<div class="custom-container ${type}"><p class="custom-container-title">${title}</p>\n`;
      } else {
        // Schließendes Tag
        return '</div>\n';
      }
    }
  });
});
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const href = tokens[idx].attrGet('href');

  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
  const isAnchor = href && href.startsWith('#');

  if (isExternal && !isAnchor) {
    // EXTERNE LINKS
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener noreferrer');

    // Klasse für Icon hinzufügen
    const classIndex = tokens[idx].attrIndex('class');
    if (classIndex < 0) {
      tokens[idx].attrPush(['class', 'external-link']);
    } else {
      tokens[idx].attrs[classIndex][1] += ' external-link';
    }
  } else {
    // INTERNE ANKER / RELATIVE LINKS
    // Wir entfernen ein eventuell vorhandenes target
    const targetIndex = tokens[idx].attrIndex('target');
    if (targetIndex >= 0) {
      tokens[idx].attrs.splice(targetIndex, 1);
    }
  }

  // NUTZE renderToken statt defaultRender -> Verhindert Rekursion!
  return self.renderToken(tokens, idx, options);
};

const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const href = tokens[idx].attrGet('href');

  // Prüfen, ob der Link extern ist (beginnt mit http oder https)
  if (href && (href.startsWith('http://') || href.startsWith('https://'))) {

    // 1. In neuem Tab öffnen
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener noreferrer');

    // 2. Klasse für das Icon hinzufügen
    const classIndex = tokens[idx].attrIndex('class');
    if (classIndex < 0) {
      tokens[idx].attrPush(['class', 'external-link']);
    } else {
      tokens[idx].attrs[classIndex][1] += ' external-link';
    }
  }

  return defaultRender(tokens, idx, options, env, self);
};

const sanitizedHtml = computed(() => {
  const rawHtml = md.render(props.value || '');

  return DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['span', 'input', 'label', 'abbr', 'sup', 'sub', 'mark', 'ins', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'width', 'height'],
    ADD_ATTR: ['class', 'style', 'type', 'checked', 'disabled', 'id', 'width', 'height', 'href', 'target'],
    // WICHTIG: Erlaubt Klassen explizit auf diesen Elementen
    FORCE_BODY: true
  });
});
</script>

<style scoped>
.card {

  margin: 2rem auto;
  width: calc(100% - 2rem);

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
  }

  @media (min-width: 1280px) {
    max-width: 1200px;
  }
}
.markdown-body {
  min-height: 200px;
  background-color: white;
  color: var(--p-text-color);
  line-height: 1.6;
}

/* Styling für dynamisch generierte Markdown-Inhalte */
.markdown-body :deep(h1), .markdown-body :deep(h2) {
  border-bottom: 1px solid var(--p-surface-200);
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
}

.markdown-body :deep(code) {
  background: var(--p-gray-800);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

.markdown-body :deep(pre) {
  background: var(--p-gray-800);
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.markdown-body :deep(ul), .markdown-body :deep(ol) {
  padding-left: 2rem;
}

.markdown-body :deep(.hljs) {
  display: block;
  overflow-x: auto;
  padding: 1em;
  border-radius: 8px;
}

.markdown-body :deep(blockquote) {
  /* Der senkrechte Strich vorne */
  border-left: 0.25rem solid var(--p-surface-300);

  /* Einrückung und Abstände */
  padding: 0.5rem 1rem;
  margin: 1.5rem 0;

  /* Textfarbe leicht abschwächen für den Zitat-Look */
  color: var(--p-text-muted-color);

  /* Optional: Ein ganz leichter Hintergrund macht es noch edler */


  /* Abrundung rechts (optional) */
  border-radius: 0 4px 4px 0;
}

/* Falls du Zitate im Zitat hast (verschachtelt) */
.markdown-body :deep(blockquote blockquote) {
  margin: 0.5rem 0;
  border-left-color: var(--p-surface-200);
}

/* Styling für Absätze innerhalb von Blockquotes, damit keine doppelten Margins entstehen */
.markdown-body :deep(blockquote p) {
  margin: 0;
}

/* 1. Grundstruktur der Tabelle */
.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  display: block; /* Ermöglicht horizontales Scrollen auf kleinen Bildschirmen */
  overflow-x: auto;
  border-radius: 8px;
}

/* 2. Header und Zellen-Styling */
.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 0.75rem 1rem;
  border: 1px solid var(--p-surface-300);
  line-height: 1.5;
}

/* 3. Header-spezifisches Styling */
.markdown-body :deep(th) {

  font-weight: bold;
  color: var(--p-text-color);
}

/* 4. Zebra-Striping (Jede zweite Zeile leicht eingefärbt) */
.markdown-body :deep(tr:nth-child(even)) {

}

/* 5. Hover-Effekt für Zeilen */
.markdown-body :deep(tr:hover) {
  background-color: var(--p-surface-600);
  transition: background-color 0.2s;
}

/* 6. Textausrichtung (Markdown-it setzt hier oft inline-styles wie text-align:right) */
/* Das CSS respektiert diese automatisch, wir stellen nur sicher, dass der Text oben ausgerichtet ist */
.markdown-body :deep(td) {
  vertical-align: top;
}

.markdown-body :deep(img) {
  max-width: 100%;
  display: block;
  margin: 1.5rem auto;

  border-radius: 8px;
  border: 1px solid var(--p-surface-200);
  max-height: 600px;
}

/* Basis-Regel für alle Bilder mit Schatten-Klasse */
.markdown-body :deep(img[class*="shadow-"]) {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1); /* Dezenter Rahmen zur Abgrenzung */
}

/* Shadow 1: Ganz zarter Lichtsaum */
.markdown-body :deep(img.shadow-1) {
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.15) !important;
}

/* Shadow 2: Weicher Schimmer */
.markdown-body :deep(img.shadow-2) {
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2) !important;
}

/* Shadow 3: Deutliche Erhebung durch Licht */
.markdown-body :deep(img.shadow-3) {
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.25), 0 0 4px rgba(255, 255, 255, 0.1) !important;
}

/* Shadow 4: Kräftiger Glow (dein gewünschter Look) */
.markdown-body :deep(img.shadow-4) {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 5px 15px rgba(0, 0, 0, 0.5) !important;
}

/* Shadow 5: Schwebend mit Hintergrundbeleuchtung */
.markdown-body :deep(img.shadow-5) {
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.35), 0 10px 20px rgba(0, 0, 0, 0.6) !important;
}

/* Shadow 6: Intensiver Halo-Effekt */
.markdown-body :deep(img.shadow-6) {
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.2) !important;
}

/* Shadow 7: Starker Fokus-Glow */
.markdown-body :deep(img.shadow-7) {
  box-shadow: 0 0 60px rgba(255, 255, 255, 0.45), 0 0 20px rgba(255, 255, 255, 0.1) !important;
}

/* Shadow 8: Maximales "Backlight" (Kino-Look) */
.markdown-body :deep(img.shadow-8) {
  /* Kombiniert einen extrem weiten weißen Schein mit einem dunklen Kernschatten für Tiefe */
  box-shadow: 0 0 80px rgba(255, 255, 255, 0.5), 0 10px 40px rgba(0, 0, 0, 0.8) !important;
}

/* Optionaler Hover-Effekt: Das Bild "leuchtet" beim Drüberfahren auf */
.markdown-body :deep(img[class*="hover"]:hover) {

  filter: brightness(1.1);
  /* Der Schatten wird beim Hover etwas intensiver */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
}

.markdown-body :deep(img) {

}

.markdown-body :deep(p:has(img)) {
  text-align: center; /* Zentriert auch eventuelle Bildunterschriften */
}

.markdown-body :deep(abbr[title]) {
  text-decoration: underline dotted; /* Die typischen Punkte unter der Abkürzung */
  cursor: help; /* Zeigt das Fragezeichen/Hilfe-Symbol beim Hover */
  border-bottom: none; /* Entfernt eventuelle Browser-Standard-Rahmen */
  color: var(--p-primary-color); /* Optional: Färbe Abkürzungen dezent ein */
}


/* Basis-Styling für alle Container */
.markdown-body :deep(.custom-container) {
  margin: 1.5rem 0;
  padding: 1rem;
  border-left: 0.5rem solid;
  border-radius: 6px;
  background-color: var(--p-surface-50);
}

.markdown-body :deep(.custom-container-title) {
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-size: 0.9rem;
}

/* Spezifische Farben für die Typen */
.markdown-body :deep(.custom-container.info) {
  border-color: var(--p-blue-500);
  background-color: var(--p-blue-50);
  color: var(--p-blue-900);
}

.markdown-body :deep(.custom-container.warning) {
  border-color: var(--p-orange-500);
  background-color: var(--p-orange-50);
  color: var(--p-orange-900);
}

.markdown-body :deep(.custom-container.success) {
  border-color: var(--p-green-500);
  background-color: var(--p-green-50);
  color: var(--p-green-900);
}

.markdown-body :deep(.custom-container.danger) {
  border-color: var(--p-red-500);
  background-color: var(--p-red-50);
  color: var(--p-red-900);
}

/* Verhindert extra Abstände beim ersten/letzten Element im Container */
.markdown-body :deep(.custom-container p:last-child) {
  margin-bottom: 0;
}

/* Der Container der Liste */
.markdown-body :deep(dl) {
  margin: 1.5rem 0;
  padding: 0;
}

/* Der Begriff (Term) */
.markdown-body :deep(dt) {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--p-primary-color); /* Nutzt deine Hauptfarbe für den Begriff */
  margin-top: 1rem;
}

/* Die Definition */
.markdown-body :deep(dd) {
  margin-left: 1.5rem; /* Einrückung */
  margin-top: 0.25rem;
  color: var(--p-text-muted-color); /* Etwas dezentere Farbe */
  line-height: 1.5;
}

/* Trennlinie zwischen den Einträgen (optional für mehr Struktur) */
.markdown-body :deep(dt:not(:first-child)) {
  padding-top: 1rem;
  border-top: 1px solid var(--p-surface-200);
}

/* 1. Die kleine Zahl im Text ([1]) */
.markdown-body :deep(.footnote-ref) {
  margin-left: 2px;
}

.markdown-body :deep(.footnote-ref a) {
  text-decoration: none;
  font-weight: bold;
  color: var(--p-primary-color);
  font-size: 0.8rem;
  vertical-align: super; /* Stellt die Zahl hoch */
}

/* 2. Der Bereich am Ende des Dokuments */
.markdown-body :deep(.footnotes) {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--p-surface-300);
  color: var(--p-text-muted-color);
  font-size: 0.9rem;
}

/* Überschrift für den Fußnoten-Bereich (optional via CSS erzeugt) */
.markdown-body :deep(.footnotes-list) {
  padding-left: 1.5rem;
}

/* Der Rückkehr-Link (Pfeil zurück zum Text ↩) */
.markdown-body :deep(.footnote-backref) {
  text-decoration: none;
  color: var(--p-primary-color);
  margin-left: 0.5rem;
  font-family: sans-serif;
}

.markdown-body :deep(.footnote-item) {
  margin-bottom: 0.5rem;
}


/* Verhindert, dass hoch/tiefgestellte Zeichen den Zeilenabstand verzerren */
.markdown-body :deep(sub),
.markdown-body :deep(sup) {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

.markdown-body :deep(sup) {
  top: -0.5em; /* Position nach oben */
}

.markdown-body :deep(sub) {
  bottom: -0.25em; /* Position nach unten */
}

/* Optional: Färbe sie dezent ein, damit sie sich vom Text abheben */
.markdown-body :deep(sup a),
.markdown-body :deep(sub) {
  color: var(--p-primary-color);
}


.markdown-body :deep(mark) {
  /* Ein dezentes Gelb oder deine Primary-Farbe als Hintergrund */
  background-color: #fff2ac; /* Klassisches Marker-Gelb, aber weicher */

  /* Alternative: Deine PrimeVue Primary-Farbe (sehr dezent) */
  /* background-color: var(--p-primary-100); */
  /* color: var(--p-primary-900); */

  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  margin: 0 0.1rem;

  /* Damit der Marker-Effekt bei dunklen Themes auch gut aussieht */
  color: #333;
}

.markdown-body :deep(ins) {
  /* Klassische Unterstreichung */
  text-decoration: underline;

  /* Optische Abgrenzung zu Links: Eine dezentere Farbe */
  color: var(--p-text-color);

  /* Optional: Eine Wellenlinie oder eine andere Farbe für die Linie */
  text-decoration-color: var(--p-primary-400);
  text-decoration-thickness: 2px;

  background-color: transparent; /* Sicherstellen, dass kein Hintergrund da ist */
}

/* Hover-Effekt entfernen, falls Links einen haben, damit der Unterschied klar ist */
.markdown-body :deep(ins:hover) {
  text-decoration: underline;
  cursor: text;
}

/* Emojis etwas besser für den Textfluss positionieren */
.markdown-body :deep(.emoji) {
  /* Falls das Plugin Bilder statt Unicode nutzt (optional konfigurierbar) */
  height: 1.2em;
  vertical-align: middle;
}

/* Tipp: Stelle sicher, dass eine Schriftart geladen ist, die Emojis gut unterstützt */
.markdown-body {
  /* ... */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
}

/* Entfernt die Aufzählungspunkte bei Task-Listen */
.markdown-body :deep(.task-list-item) {
  list-style-type: none;
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

/* Die Checkbox selbst stylen */
.markdown-body :deep(.task-list-item-checkbox) {
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  cursor: pointer;
  /* Optionale Skalierung für bessere Sichtbarkeit */
  transform: scale(1.1);
}

/* Den Text der Liste stylen */
.markdown-body :deep(.task-list-item label) {
  cursor: pointer;
  line-height: 1.5;
}

/* Erledigte Aufgaben leicht ausgrauen (optional) */
.markdown-body :deep(.task-list-item-checkbox[checked] + label) {
  color: var(--p-text-muted-color);
  text-decoration: line-through;
}

.markdown-body :deep(.external-link) {
  color: var(--p-primary-color);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px; /* Abstand zwischen Text und Icon */
}

/* Das Icon über ein Pseudo-Element hinzufügen */
.markdown-body :deep(.external-link::after) {
  font-family: 'primeicons';
  content: "\e93c"; /* Korrekter Code für pi-external-link in v6/v7 */
  font-size: 0.75rem;
  margin-left: 4px;
  vertical-align: middle;
  color: var(--p-text-muted-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Hover-Effekt */
.markdown-body :deep(.external-link:hover) {
  text-decoration: underline;
}

.markdown-body :deep(.external-link:hover::after) {
  color: var(--p-primary-color);
}

/* Stellt sicher, dass die Farbe der Klasse auch im Label ankommt */
.markdown-body :deep(.task-list-item.text-red-500 label),
.markdown-body :deep(.task-list-item.text-red-500) {
  color: var(--p-red-500) !important;
}

/* Allgemein: Text in Task-Listen soll die Farbe der Eltern-Klasse erben */
.markdown-body :deep(.task-list-item[class*="text-"]) label {
  color: inherit;
}

/* Wenn die Klasse am Listenpunkt hängt */
.markdown-body :deep(li.text-red-500),
.markdown-body :deep(li.text-red-500 *) {
  color: var(--p-red-500) !important;
}

/* Falls das neue Plugin ein div nutzt */
.markdown-body :deep(.task-item.text-red-500),
.markdown-body :deep(.task-item.text-red-500 *) {
  color: var(--p-red-500) !important;
}

/* Falls du die [Spans]{.class} nutzt */
.markdown-body :deep(.text-red-500) {
  color: var(--p-red-500) !important;
}

/* Wenn die Klasse direkt am table-Tag landet */
.markdown-body :deep(table.text-blue-500),
.markdown-body :deep(table.text-blue-500 th),
.markdown-body :deep(table.text-blue-500 td) {
  color: var(--p-blue-500) !important;
}

/* Falls wir die Tabelle in einen farbigen Container einpacken */
.markdown-body :deep(.table-wrapper.text-blue-500 table *) {
  color: var(--p-blue-500) !important;
}

/* Generelle Regel für alle Farbklassen in Tabellen */
.markdown-body :deep(table[class*="text-"] *) {
  color: inherit !important;
}


</style>
