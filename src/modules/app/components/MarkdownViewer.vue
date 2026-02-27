<template>
  <div
      class="markdown-body p-3 overflow-auto"
      v-html="sanitizedHtml"
  ></div>
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

const model = defineModel();

const containerTypes = ['info', 'warning', 'success', 'danger'];

const md = markdownIt({
  html: false,
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
  allowedAttributes: []
});
containerTypes.forEach(type => {
  md.use(container, type, {
    validate: function (params) {
      return params.trim().match(new RegExp(`^${type}+(.*)$`));
    },
    render: function (tokens, idx) {
      const m = tokens[idx].info.trim().match(new RegExp(`^${type}+(.*)$`));
      if (tokens[idx].nesting === 1) {
        const title = m[1].trim() || type.toUpperCase();
        return `<div class="custom-container ${type}"><p class="custom-container-title">${title}</p>\n`;
      } else {
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
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener noreferrer');

    const classIndex = tokens[idx].attrIndex('class');
    if (classIndex < 0) {
      tokens[idx].attrPush(['class', 'external-link']);
    } else {
      tokens[idx].attrs[classIndex][1] += ' external-link';
    }
  } else {
    const targetIndex = tokens[idx].attrIndex('target');
    if (targetIndex >= 0) {
      tokens[idx].attrs.splice(targetIndex, 1);
    }
  }

  return self.renderToken(tokens, idx, options);
};

const sanitizedHtml = computed(() => {
  const rawHtml = md.render(model.value || '');

  return DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['span', 'input', 'label', 'abbr', 'sup', 'sub', 'mark', 'ins', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'width', 'height'],
    ADD_ATTR: ['class', 'style', 'type', 'checked', 'disabled', 'id', 'width', 'height', 'href', 'target'],
    FORCE_BODY: true
  });
});
</script>

<style scoped>
.markdown-body {
  min-height: 200px;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
}

.markdown-body :deep(h1), .markdown-body :deep(h2) {
  border-bottom: 1px solid var(--p-surface-200);
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
}

.markdown-body :deep(code) {
  background: var(--p-surface-900);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

.markdown-body :deep(pre) {
  background: var(--p-surface-900);
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
  border-left: 0.25rem solid var(--p-surface-300);
  padding: 0.5rem 1rem;
  margin: 1.5rem 0;
  color: var(--p-text-muted-color);
  border-radius: 0 4px 4px 0;
}

.markdown-body :deep(blockquote blockquote) {
  margin: 0.5rem 0;
  border-left-color: var(--p-surface-200);
}

.markdown-body :deep(blockquote p) {
  margin: 0;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  display: block;
  overflow-x: auto;
  border-radius: 8px;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 0.75rem 1rem;
  border: 1px solid var(--p-surface-300);
  line-height: 1.5;
}

.markdown-body :deep(th) {
  font-weight: bold;
  color: var(--p-text-color);
}

.markdown-body :deep(tr:nth-child(even)) {
}

.markdown-body :deep(tr:hover) {
  background-color: var(--p-surface-600);
  transition: background-color 0.2s;
}

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

.markdown-body :deep(img[class*="shadow-"]) {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1); /* Dezenter Rahmen zur Abgrenzung */
}

.markdown-body :deep(img.shadow-1) {
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.15) !important;
}

.markdown-body :deep(img.shadow-2) {
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2) !important;
}

.markdown-body :deep(img.shadow-3) {
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.25), 0 0 4px rgba(255, 255, 255, 0.1) !important;
}

.markdown-body :deep(img.shadow-4) {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 5px 15px rgba(0, 0, 0, 0.5) !important;
}

.markdown-body :deep(img.shadow-5) {
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.35), 0 10px 20px rgba(0, 0, 0, 0.6) !important;
}

.markdown-body :deep(img.shadow-6) {
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.2) !important;
}

.markdown-body :deep(img.shadow-7) {
  box-shadow: 0 0 60px rgba(255, 255, 255, 0.45), 0 0 20px rgba(255, 255, 255, 0.1) !important;
}

.markdown-body :deep(img.shadow-8) {
  box-shadow: 0 0 80px rgba(255, 255, 255, 0.5), 0 10px 40px rgba(0, 0, 0, 0.8) !important;
}

.markdown-body :deep(img[class*="hover"]:hover) {
  filter: brightness(1.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
}

.markdown-body :deep(img) {
}

.markdown-body :deep(p:has(img)) {
  text-align: center;
}

.markdown-body :deep(abbr[title]) {
  text-decoration: underline dotted;
  cursor: help;
  border-bottom: none;
  color: var(--p-primary-color);
}

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

.markdown-body :deep(.custom-container p:last-child) {
  margin-bottom: 0;
}

.markdown-body :deep(dl) {
  margin: 1.5rem 0;
  padding: 0;
}

.markdown-body :deep(dt) {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--p-primary-color);
  margin-top: 1rem;
}

.markdown-body :deep(dd) {
  margin-left: 1.5rem;
  margin-top: 0.25rem;
  color: var(--p-text-muted-color);
  line-height: 1.5;
}

.markdown-body :deep(dt:not(:first-child)) {
  padding-top: 1rem;
  border-top: 1px solid var(--p-surface-200);
}

.markdown-body :deep(.footnote-ref) {
  margin-left: 2px;
}

.markdown-body :deep(.footnote-ref a) {
  text-decoration: none;
  font-weight: bold;
  color: var(--p-primary-color);
  font-size: 0.8rem;
  vertical-align: super;
}

.markdown-body :deep(.footnotes) {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--p-surface-300);
  color: var(--p-text-muted-color);
  font-size: 0.9rem;
}

.markdown-body :deep(.footnotes-list) {
  padding-left: 1.5rem;
}

.markdown-body :deep(.footnote-backref) {
  text-decoration: none;
  color: var(--p-primary-color);
  margin-left: 0.5rem;
  font-family: sans-serif;
}

.markdown-body :deep(.footnote-item) {
  margin-bottom: 0.5rem;
}

.markdown-body :deep(sub),
.markdown-body :deep(sup) {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

.markdown-body :deep(sup) {
  top: -0.5em;
}

.markdown-body :deep(sub) {
  bottom: -0.25em;
}

.markdown-body :deep(sup a),
.markdown-body :deep(sub) {
  color: var(--p-primary-color);
}

.markdown-body :deep(mark) {
  background-color: #fff2ac; /* Klassisches Marker-Gelb, aber weicher */
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  margin: 0 0.1rem;
  color: #333;
}

.markdown-body :deep(ins) {
  text-decoration: underline;
  color: var(--p-text-color);
  text-decoration-color: var(--p-primary-400);
  text-decoration-thickness: 2px;
  background-color: transparent;
}

.markdown-body :deep(ins:hover) {
  text-decoration: underline;
  cursor: text;
}

.markdown-body :deep(.emoji) {
  height: 1.2em;
  vertical-align: middle;
}

.markdown-body :deep(.task-list-item) {
  list-style-type: none;
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.markdown-body :deep(.task-list-item-checkbox) {
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  cursor: pointer;
  transform: scale(1.1);
}

.markdown-body :deep(.task-list-item label) {
  cursor: pointer;
  line-height: 1.5;
}

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
  gap: 4px;
}

.markdown-body :deep(.external-link::after) {
  font-family: 'primeicons';
  content: "\e93c";
  font-size: 0.6rem;
  margin-left: 1px;
  display: inline-block;
  position: relative;
  top: -0.4em;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.markdown-body :deep(.external-link:hover) {
  text-decoration: underline;
}

.markdown-body :deep(.external-link:hover::after) {
  color: var(--p-primary-color);
}

.markdown-body :deep(.task-list-item.text-red-500 label),
.markdown-body :deep(.task-list-item.text-red-500) {
  color: var(--p-red-500) !important;
}

.markdown-body :deep(.task-list-item[class*="text-"]) label {
  color: inherit;
}

.markdown-body :deep(li.text-red-500),
.markdown-body :deep(li.text-red-500 *) {
  color: var(--p-red-500) !important;
}

.markdown-body :deep(.task-item.text-red-500),
.markdown-body :deep(.task-item.text-red-500 *) {
  color: var(--p-red-500) !important;
}

.markdown-body :deep(.text-red-500) {
  color: var(--p-red-500) !important;
}

.markdown-body :deep(table.text-blue-500),
.markdown-body :deep(table.text-blue-500 th),
.markdown-body :deep(table.text-blue-500 td) {
  color: var(--p-blue-500) !important;
}

.markdown-body :deep(.table-wrapper.text-blue-500 table *) {
  color: var(--p-blue-500) !important;
}

.markdown-body :deep(table[class*="text-"] *) {
  color: inherit !important;
}
</style>
