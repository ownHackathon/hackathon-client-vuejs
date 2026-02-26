# [Master Markdown Guide:]{.text-red-500} [Alle Funktionen im Überblick]{.text-blue-500}

Diese Seite dient als Referenz für alle verfügbaren Formatierungen mittels Markdown.

---

## 1. Überschriften (Headings) {#1-überschriften-headings}

# h1 Überschrift
```
# h1 Überschrift
```
## h2 Überschrift
```
## h2 Überschrift
```
### h3 Überschrift
```
### h3 Überschrift
```
#### h4 Überschrift
```
#### h4 Überschrift
```
##### h5 Überschrift
```
##### h5 Überschrift
```
###### h6 Überschrift
```
###### h6 Überschrift
```

## Horizontale Linien
___
```
___
```

---
```
---
```

***
```
***
```

## 2. Textformatierung & Farben

### Standard-Hervorhebungen:
*   **Fett**
```
**Fett**
```
*   *Kursiv* 
```
*Kursiv*
```
*   ~~Durchgestrichen~~ 
```
~~Durchgestrichen~~
```
*   ==Markiert==
```
==Markiert==
```
*   ++Unterstrichen++
```
++Unterstrichen++
```

### Farben & Styling (Universal-Werkzeug):
Um Text zu färben, umschließe ihn einfach mit eckigen Klammern `[...]` und schreibe die Farbe dahinter. Das funktioniert für einzelne Wörter und ganze Sätze, ohne dass du auf Leerzeilen achten musst.

*   **Einzelne Wörter:**
    Nur dieses [Wort ist blau]{.text-blue-500} im Satz.
```
Nur dieses [Wort ist blau]{.text-blue-500} im Satz.
```

*   **Ganze Sätze:**
    [Dieser komplette Satz soll rot leuchten.]{.text-red-500}
```
[Dieser komplette Satz soll rot leuchten.]{.text-red-500}
```

*   **Überschriften färben:**
    ### Eine blaue Überschrift {.text-blue-500}
```
### Eine blaue Überschrift {.text-blue-500}
```

*   **Ganze Zeile(n) einfärben:**

    Dieser Text ist rot. 
    Und dieser auch. {.text-red-500}

```
*   **Ganze Zeile(n) einfärben:**

Dieser Text ist rot.
Und dieser auch. {.text-red-500}

`Dieser Text ist rot. {.text-red-500}`
``` 

**[Wichtig:]{.text-red-700}** Es muss jeweils vor und nach der zu färbenden Zeile(n) sich eine Leerzeile befinden! 


### Wissenschaftliche Notation:
* **Hochgestellt:** X^2^ (`X^2^`)
* **Tiefgestellt:** H~2~O (`H~2~O`)

### Typografische Ersetzungen
`(c)` => (c)
`(C)` => (C)
`(r)` => (r)
`(R)` => (R)
`(tm)` => (tm)
`(TM)` => (TM)
`(p)` => (p)
`(P)` => (P)
`+-` => +-

`test..` => test..
`test...` => test... 
`test.....` => test.....
`test?.....` => test?.....
`test!....` => test!....

Ersetzung von wiederholten gleichen Zeichen: 
`!!!!!!` => !!!!!!
`??????` => ????
`,,` => ,,
`--` => --
`---` => ---

"Klugscheißer, doppelte Anführungszeichen" und 'einfache Anführungszeichen'
`"Klugscheißer, doppelte Anführungszeichen" und 'einfache Anführungszeichen'`

## 3. Hinweisboxen (Custom Containers)

::: info Information
Ein blauer Hinweis für allgemeine Tipps.
:::
```
::: info Information
Ein blauer Hinweis für allgemeine Tipps.
:::
```

::: success Erfolg
Ein grüner Kasten für positive Meldungen.
:::
```
::: success Erfolg
Ein grüner Kasten für positive Meldungen.
:::
```

::: warning Warnung
Ein orangefarbener Achtung-Text.
:::
```
::: warning Warnung
Ein orangefarbener Achtung-Text.
:::
```

::: danger Gefahr
Ein roter kritischer Hinweis.
:::
```
::: danger Gefahr
Ein roter kritischer Hinweis.
:::
```

## 4. Listen & Aufzählungen

Markdown bietet verschiedene Möglichkeiten, Informationen zu strukturieren. Hier sind alle Varianten:

### A. Ungeordnete Listen
Verwende `*`, `-`, oder `+` gefolgt von einem Leerzeichen.
*   Punkt 1
*   Punkt 2
    *   Unterpunkt (2 Leerzeichen einrücken)
    *   Noch ein Unterpunkt
```
*   Punkt 1
*   Punkt 2
    *   Unterpunkt (2 Leerzeichen einrücken)
    *   Noch ein Unterpunkt
```

### B. Geordnete Listen
Verwende Zahlen gefolgt von einem Punkt. Die tatsächliche Zahl ist egal, das System zählt automatisch.
1. Erster Punkt
1. Zweiter Punkt
1. Dritter Punkt
```
1. Erster Punkt
1. Zweiter Punkt
1. Dritter Punkt
```

**Start-Offset:** Du kannst eine Liste bei einer beliebigen Zahl starten:

57. Dieser Punkt startet bei 57
1. Dieser wird automatisch zu 58

```
57. Dieser Punkt startet bei 57
1. Dieser wird automatisch zu 58
```

### C. Definitionslisten (Glossar)

Ideal, um Begriffe zu erklären.

Begriff
: Die Erklärung startet mit einem Doppelpunkt `:` und einem Leerzeichen.

```
Begriff
: Die Erklärung startet mit einem Doppelpunkt `:` und einem Leerzeichen.
```

Zweiter Begriff
: Eine Erklärung kann auch
über mehrere Zeilen gehen.

```
Zweiter Begriff
: Eine Erklärung kann auch
über mehrere Zeilen gehen.
```

Kompakter Stil (Alternative)
~ Erklärung mit Tilde `~` statt Doppelpunkt.

```
Kompakter Stil (Alternative)
~ Erklärung mit Tilde `~` statt Doppelpunkt.
```

### E. Verschachtelte Listen (Mix)
Du kannst verschiedene Listentypen kombinieren:
1.  **Vorbereitung**
    - [x] Werkzeug kaufen
    - [ ] Material prüfen
2.  **Durchführung**
    *   Schritt A
    *   Schritt B
```
Du kannst verschiedene Listentypen kombinieren:
1.  **Vorbereitung**
    - [x] Werkzeug kaufen
    - [ ] Material prüfen
2.  **Durchführung**
    *   Schritt A
    *   Schritt B
```

## 5. Listen-Styling (Farben & Icons)
Dank unserer Erweiterungen kannst du Listen auch farblich hervorheben:

*   [Roter Listenpunkt]{.text-red-500}
*   [Grüner Listenpunkt]{.text-green-500}
```
*   [Roter Listenpunkt]{.text-red-500}
*   [Grüner Listenpunkt]{.text-green-500}
```

**Ganze Liste stylen:**
Wenn du eine Klasse direkt hinter die Liste schreibst, wirkt sie auf alle Elemente:
*   Punkt 1
*   Punkt 2
    {.text-blue-500 .font-bold}
```
*   Punkt 1
*   Punkt 2
    {.text-blue-500 .font-bold}
```

## 6. Checklisten (Task-Lists) im Detail

Checklisten sind ideal, um Fortschritte zu tracken. Du startest sie mit `- [ ]` (offen) oder `- [x]` (erledigt).

### A. Basis-Varianten
- [ ] Eine offene Aufgabe
- [x] Eine erledigte Aufgabe
- [ ] Ein Punkt mit **fettem Text** oder *Kursivschrift*
```
- [ ] Eine offene Aufgabe
- [x] Eine erledigte Aufgabe
- [ ] Ein Punkt mit **fettem Text** oder *Kursivschrift*
```

### B. Ganze Zeile einfärben
Um einen kompletten Listenpunkt einzufärben, umschweife den Text mit `[]` und setze die Farbe an dass Ende der Zeile.

- [ ] Diese Zeile ist komplett rot{.text-red-500} => *leider noch buggy :(* @ToDo
- [x] [Diese Zeile ist komplett grün]{.text-green-500}
- [ ] [Wichtiger Hinweis in Blau]{.text-blue-500 .font-bold}
```
- [ ] Diese Zeile ist komplett rot{.text-red-500}
- [x] [Diese Zeile ist komplett grün]{.text-green-500}
- [ ] [Wichtiger Hinweis in Blau]{.text-blue-500 .font-bold}
```

### C. Einzelne Wörter innerhalb der Liste einfärben
Wenn nur ein Teil des Textes farbig sein soll, nutze eckige Klammern `[]`.
- [ ] Bitte die [Deadline einhalten]{.text-red-500} bis morgen.
- [ ] Checkliste mit [verschiedenen]{.text-blue-500} [Farben]{.text-orange-500}.
```
- [ ] Bitte die [Deadline einhalten]{.text-red-500} bis morgen.
- [ ] Checkliste mit [verschiedenen]{.text-blue-500} [Farben]{.text-orange-500}.
```

### D. Kombination mit anderen Funktionen
Du kannst fast alles innerhalb einer Checkliste nutzen:
- [ ] Ein Link: [Besuche unsere Website](https://example.com)
- [ ] Ein Emoji: Projektstart :rocket:
- [ ] Eine kurze Notiz: `Code-Snippet`
- [ ] Eine Korrektur: ~~Alte Aufgabe~~ ++Neue Aufgabe++
```
- [ ] Ein Link: [Besuche unsere Website](https://example.com)
- [ ] Ein Emoji: Projektstart :rocket:
- [ ] Eine kurze Notiz: `Code-Snippet`
- [ ] Eine Korrektur: ~~Alte Aufgabe~~ ++Neue Aufgabe++
```

### E. Verschachtelte Checklisten
Rücke Unterpunkte einfach um **2 Leerzeichen** ein.
- [ ] Hauptprojekt
    - [x] Unteraufgabe 1
    - [ ] Unteraufgabe 2
        - [ ] Detailprüfung
```
- [ ] Hauptprojekt
    - [x] Unteraufgabe 1
    - [ ] Unteraufgabe 2
        - [ ] Detailprüfung
```

### F. Status: Abgebrochen / Nicht relevant
Häufig nutzt man die Kombination aus erledigt und durchgestrichen:
- [x] ~~Diese Aufgabe wurde verworfen~~
- [ ] ==Diesen Punkt unbedingt prüfen!==
```
- [x] ~~Diese Aufgabe wurde verworfen~~
- [ ] ==Diesen Punkt unbedingt prüfen!==
```


## 7. Tabellen

Tabellen sind das beste Werkzeug, um strukturierte Daten zu vergleichen. Sie bestehen aus einer Kopfzeile, einer Trennzeile und den Datenzeilen.

### A. Basis-Struktur & Ausrichtung
Du kannst steuern, ob der Text in einer Spalte links, rechts oder mittig stehen soll, indem du Doppelpunkte `:` in der Trennzeile setzt.

| Links (Standard) | Zentriert | Rechts |
| :--- | :---: | ---: |
| Text linksbündig | Text in der Mitte | Text rechtsbündig |
| Spalte 1 | Spalte 2 | Spalte 3 |

```

| Links (Standard) | Zentriert | Rechts |
| :--- | :---: | ---: |
| Text linksbündig | Text in der Mitte | Text rechtsbündig |
| Spalte 1 | Spalte 2 | Spalte 3 |
```

### B. Formatierung innerhalb von Zellen
Du kannst fast alle anderen Markdown-Funktionen innerhalb einer Tabellenzelle nutzen:

| Feature | Beispiel | Syntax |
| :--- | :--- | :--- |
| **Fett & Kursiv** | **Wichtig** & *dezent* | `**Wichtig** & *dezent*` |
| **Markiert** | ==Highlight== | `==Highlight==` |
| **Korrekturen** | ~~Alt~~ ++Neu++ | `~~Alt~~ ++Neu++` |
| **Notizen** | `Code-Snippet` | `` `Code-Snippet` `` |
| **Wissenschaft** | X^2^ / H~2~O | `X^2^ / H~2~O` |

```

| Feature | Beispiel | Syntax |
| :--- | :--- | :--- |
| **Fett & Kursiv** | **Wichtig** & *dezent* | `**Wichtig** & *dezent*` |
| **Markiert** | ==Highlight== | `==Highlight==` |
| **Korrekturen** | ~~Alt~~ ++Neu++ | `~~Alt~~ ++Neu++` |
| **Notizen** | `Code-Snippet` | `` `Code-Snippet` `` |
| **Wissenschaft** | X^2^ / H~2~O | `X^2^ / H~2~O` |
```

### C. Emojis & Links
Tabellen eignen sich hervorragend für Status-Übersichten:

| Projekt | Status | Link |
| :--- | :---: | :--- |
| API Entwicklung | :rocket: Fertig | [Dokumentation](https://google.com) |
| Frontend | :warning: In Arbeit | [Vorschau](https://google.com) |
| Datenbank | :check: Stabil | [Logs](#) |

```

| Projekt | Status | Link |
| :--- | :---: | :--- |
| API Entwicklung | :rocket: Fertig | [Dokumentation](https://google.com) |
| Frontend | :warning: In Arbeit | [Vorschau](https://google.com) |
| Datenbank | :check: Stabil | [Logs](#) |
```

### D. Tabellen einfärben & stylen (Plugin: Attrs)
Du kannst der gesamten Tabelle oder einzelnen Inhalten Farben zuweisen.

**Einzelne Zellen oder Wörter färben:**
Nutze die eckigen Klammern `[]` innerhalb der Zelle.

| Aufgabe | Priorität |
| :--- | :--- |
| Server-Update | [KRITISCH]{.text-red-500} |
| Backup-Check | [Normal]{.text-green-500} |

```

| Aufgabe | Priorität |
| :--- | :--- |
| Server-Update | [KRITISCH]{.text-red-500} |
| Backup-Check | [Normal]{.text-green-500} |
```

## 8. Code-Blöcke
Nutze drei Backticks und die Sprache für Syntax-Highlighting:


```javascript
function hello() {
  console.log("Hallo Welt");
}
```

```
    ```javascript
    function hello() {
      console.log("Hallo Welt");
    }
    ```
```

---

## 9. Links & Bilder

### Links:
*   [Externer Link](https://google.com) (öffnet automatisch im neuen Tab mit Icon).
```
[Externer Link](https://google.com) (öffnet automatisch im neuen Tab mit Icon).
```
*   [Interner Anker](#1-überschriften-headings) (bleibt im selben Tab).
```
[Interner Anker](#1-überschriften-headings) (bleibt im selben Tab).
```

### Bilder Standard:
![Beispielbild](https://picsum.photos/200/300)
```
![Beispielbild](https://picsum.photos/200/300)
```

### Bilder skalieren (Erweiterte Syntax):
Du kannst die Größe direkt hinter dem Bild in geschweiften Klammern angeben:

#### Breite 300px:
![Beispiel](https://picsum.photos/500/500){width=300}
```
![Beispiel](https://picsum.photos/500/500){width=300}
```

#### Höhe 200px:
![Beispiel](https://picsum.photos/500/500){height=200}
```
![Beispiel](https://picsum.photos/500/500){height=200}
```

#### Feste Größe (300x150) & Schatten & Hovereffekt:
![Beispiel](https://picsum.photos/500/500){width=300 height=150 .shadow-3 .hover}
```
![Beispiel](https://picsum.photos/500/500){width=300 height=150 .shadow-3 .hover}
```

---

## 10. Glossar, Emojis & Fußnoten

**Definitionsliste:**

**Abkürzungen (Tooltips):**
Fahre mit der Maus über HTML für die Erklärung.
*[HTML]: Hyper Text Markup Language

```
Fahre mit der Maus über HTML für die Erklärung.
*[HTML]: Hyper Text Markup Language
```

**Extras:**
*   **Emojis klassisch**: 
`:rocket:` => :rocket:
`:tada:` => :tada:
`:smile:` => :smile:

*   ***Emojis kurz**:
`:-)` => :-)
`:-(` => :-(
`8-)` => 8-)
`;)` => ;)

*   **Fußnoten**: Ein Hinweis im Text[^1].

```
**Fußnoten**: Ein Hinweis im Text[^1].
```

---

## 11. Referenzen (Ganz unten im Dokument)

[^1]: Dies ist die Erklärung der Fußnote mit automatischem Rücksprung-Link.
```
[^1]: Dies ist die Erklärung der Fußnote mit automatischem Rücksprung-Link.
```

## 💡 Experten-Tipp: Erweitertes Styling
Es kann die Darstellung von Elementen gezielt über geschweifte Klammern `{}` gesteuert werden.
Hierfür stehen sowohl die Utility-Classes von [PrimeFlex](https://primeflex.org/installation) als auch native CSS-Eigenschaften über das `style`-Attribut zur Verfügung.

Dabei wird zwischen zwei Anwendungsbereichen unterschieden:

*   **Block-Elemente:** Die Formatierung wirkt auf den gesamten Absatz (Klammer direkt am Zeilenende).
*   **Inline-Elemente:** Durch die Verwendung von eckigen Klammern `[]` können gezielt einzelne Wörter oder Satzteile innerhalb einer Zeile formatiert werden.

**Praxis-Beispiele:**

*   **Hintergrundfärbung via PrimeFlex-Klasse:**
    **Primärer Hintergrund**{.bg-primary}
```
**Primärer Hintergrund**{.bg-primary}
```

 *   **Textfarbe via CSS-Attribut:**
     **Roter Text**{style="color:red"}
 ```
 **Roter Text**{style="color:red"}
 ```

 *   **Selektive Formatierung im Textfluss:**
     Nur das Wort [Style]{style="color:red"} hervorheben.
```
Nur das Wort [Style]{style="color:red"} hervorheben.
```
