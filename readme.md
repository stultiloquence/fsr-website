# Readme: Wie man diese Website benutzt.

Es zwei Abschnitte in diesem Readme:

- Siehe **Für Nutzer** um Seiten (Texte, Bilder, Termine, Aktuelle Hinweise, …) hinzuzufügen oder zu ändern.
- Siehe **Für Entwickler** um zu verstehen, wie die Website funktioniert und wie man tiefgreifendere Änderungen umsetzt.

## Für Nutzer

### Überblick über den contents-Ordner

Du solltest/musst nur im `contents`-Ordner arbeiten. Dort liegen Texte, Bilder und ähnliches (_Inhalte_ halt), die du erstellen, ändern oder löschen kannst. Dann führst du in einem Terminal im Website-Ordner `./build.sh` aus, und das sorgt dafür, dass alles richtig zusammengestellt und hoffentlich funktionstüchtig im `public_html`-Ordner landet.

(Du solltest nie etwas direkt im `public_html`-Ordner ändern, denn das `./build.sh`-Kommando überschreibt dort alles. Und ändere bitte auch nichts in diesem Ordner außerhalb von `contents`.)

```
contents
├── index.json
├── index-en.json
├── kontakte.md
├── erstis                   <– Abschnitt
|   ├── index.md             <– Text und Metadaten auf der Hauptseite des Abschnitts
|   ├── index-en.md          <– Optionale englische Version
│   ├── fakultative-übungen  <– Einzelner Artikel
│   │   └── index.md         <– Text und Metadaten
│   ├── faq
│   │   └── index.md
│   ├── warmup
│   │   ├── index.md
│   │   ├── Beweise_HA.pdf
│   │   ├── Beweise_Vorlesung.pdf
│   │   └── …
│   └── …
├── fachschaftsrat           <– Abschnitt
├── …                        <– Weitere Abschnitte
├── aktuelles                   
├── termine                   
├── static                   
└── css                      <- Ignorieren.
```

Die Dateistruktur im `contents`-Ordner spiegelt die der Website, die am Ende rauskommt. Gehen wir die verschiedenen Ordner durch:

- `erstis`, `fachschaftsrat`, `rund-ums-studium`, … (alle Ordner, die eine `index.md` und eventuell Unterordner mit weiteren `index.md`-Dateien enthalten): Hieraus werden die eigentlichen Seiten der Website. Aus Pfaden wie `/erstis/warmup/index.md` wird `/erstis/warmup/index.html`, auch unter `/erstis/warmup/` zu erreichen. Für jede der Hauptkategorien („Erstis”, „Fachschaftsrat“, …), die im Hauptmenü angezeigt werden, gibt es einen Ordner mit einer `index.md` für die „Startseite“ der jeweiligen Kategorie. Für jede Seite in den Kategorien gibt es einen Unterordner. Der eigentliche Text jeder Seite liegt dann in der `ìndex.md`-Datei in diesem Ordner. Andere Inhalte, die auf der jeweiligen Seite angezeigt oder verlinkt werden sollen (Bilder, PDFs, …) sollten immer neben der entsprechenden `index.md`-Datei liegen (siehe zum Beispiel all die Protokolle in `/fachschaftsrat/sitzungen/`).
- `termine` und `aktuelles`: Die hier enthaltenen `.md`-Dateien werden nicht selbst zu Seiten, sondern werden (zu Teilen) auf der Hauptseite in Boxen unter „Aktuelle Hinweise“ bzw. unter „Termine“ im Kalender angezeigt.
- `static`: Inhalte wie PDFs oder Bilder, die auf mehreren Seiten verlinkt/angezeigt werden, sollten in diesem Ordner liegen.
- `css` Hier liegen Dateien, die für das Aussehen der Website verantwortlich sind, und du kannst sie ignorieren.

Im folgenden steht genauer beschrieben, wie man die einzelnen Dateien modifizieren kann und sollte: Die `index.md`-Dateien, aktuelle Hinweise, Termine und die Startseite.

### Normale Seiten: Die `index.md`-Dateien

Diese Dateien sind das Herz der ganzen Angelegenheit, hier spielt sich fast alles ab. Grundlegende Idee, wenn man etwas konkretes ändern oder anpassen will, ist natürlich immer, sich einfach eine passende `index.md`-Datei rauszusuchen und daraus Dinge zu kopieren/nachzumachen. Es sind einfache Text-Dateien, die man mit jedem Texteditor öffnen kann.

#### Die Metadaten

Wie dir vielleicht auffällt, fängt jede `.md`-Datei mit einem Abschnitt an, der von zwei `---` begrenzt wird. Darin werden sogenannte _Metadaten_ angegeben, die nicht direkt auf der Seite angezeigt werden, aber trotzdem wichtige Informationen enthalten. Das Format zwischen den `---`-Markierungen ist [YAML](https://de.wikipedia.org/wiki/YAML), aber es ist eigentlich sehr intuitiv und wir nutzen nur super grundlegende Sachen:

- `title:` Um den Titel der Seite zu spezifizieren (der dann zum Beispiel in den Menüs als Link erscheint), ändere diesen Wert.
- `description:` Hier sollte eine kurze Beschreibung der Seite stehen (das ist sinnvoll für die Accessibility der Seite und dafür, dass Suchmaschinen sie finden).
- `template:` sollte für die Startseite den Wert `startseite.pug` und für alle anderen den Wert `simple-page.pug` haben (entsprechend den Vorlagen aus dem `templates`-Ordner). 
- `weight:` gibt die Position an, in der die Seite im Menü bzw. Submenü erscheint. (Genau genommen geht es nur um die Reihenfolge, also um den Wert im Vergleich zu den Geschwister-Seiten.)
- Wenn unbedingt nötig, gibt es in den `index.md`-Dateien, die die Hauptseite einer Kategorie markieren (also zum Beispiel `erstis/index.md`), die Möglichkeit, weitere Einträge aufzulisten, die in der Kategorie im Zweitlevel-Menü auftauchen sollen, aber nicht zu Seiten korrespondieren. Einziges Beispiel dafür ist momentan der Link zum Peer-Mentoring-Programm, der im Submenü unter `erstis` auftaucht. Der korrespondierende Eintrag in den Metadaten von `erstis/index.md` sieht so aus:

  ```
  additionalNavEntries:
      - name: Peer-Mentoring-Programm 🔗
        url: 'https://fakultaeten.hu-berlin.de/de/mnf/lehre_studium/pmp'
        weight: 5
  ```

  (Die Einrückung ist wichtig, insbesondere die zwei zusätzlichen Leerzeichen vor `url`; mit weiteren Unterpunkten könnte man auch mehr als nur einen Eintrag spezifizieren.)

#### Der Text (Markdown)

Unter den Metadaten steht der Text in einem bestimmten Format, nämlich [Markdown](https://de.wikipedia.org/wiki/Markdown) (daher `.md`), ein weit verbreitetes, super simples Format zur Auszeichnung von Texten. (Browser verstehen das nicht direkt, sondern verstehen nur HTML, und dafür ist der Static Site Generator da: Er übersetzt diese Dateien in HTML, sodass du kein HTML schreiben brauchst.) In Markdown kann man Überschriften und Subüberschriften, besonders betonten Text (kursiv und fett), Links, nummerierte und unnummerierte Listen und Bilder einfügen. Viel mehr geht nicht, aber das ist auch die Idee: Es soll simpel sein und nur das anbieten, das man braucht. Für die grundlegende, sehr einfache und gut lesbare Syntax google einfach „Markdown Tutorial“ oder guck dir den Wikipedia-Link oben an. Diese Basics sollten für jeglichen normalen Text ausreichen.

##### Wie man Texte schreiben sollte: Checkliste

- Kurz und bündig!
- Statt „Informationen zu Blabla findest du [hier](https://example.org)“ lieber „Die HU veröffentlicht [Informationen zu Blabla](https://example.org).“


#### Links

Links setzt man so: `[Beispiel-Linktext](https://example.org)`. In den Klammern kann stehen:

- Eine absolute URL wie `https://example.org`, vor allem für externe Websites.
- Ein Link, der mit `/` anfängt, wie `/fachschaftsrat/wahlen/index.md`, ein Link, der relativ zum `contents`-Ornder interpretiert wird.
- Oder ein Link wie `wahlen/index.md` oder `meinBeispielPDF.pdf` stehen, der relativ zur aktuellen `index.md`-Datei interpretiert wird. Das ist insbesondere für Inhalte wie PDFs und Bilder praktisch, die zu der konkreten Seite gehören und im selben Ordner liegen.
- Ein Link, der mit `#` anfängt, zum Beispiel `#fachschaftsratswahl-2018`, der zu einer Überschrift auf der aktuellen Seite verlinkt. Dabei müssen Leerzeichen in der Überschrift zu `-`, alle Buchstaben werden in Kleinbuchstaben umgewandelt und einige Sonderzeichen (auch Umlaute) geraten eventuell auch in Mitleidenschaft und werden auch in `-` umgewandelt. Um zu gucken, wie der korrekte Link für eine bestimmte Überschrift aussieht, kannst du im Browser deiner Wahl auf die Überschrift rechtsklicken, „inspect this element“ oder „Element untersuchen“ oder so auswählen und dann im aufpoppenden Fenster (das unter anderem den generierten HTML-Quelltext zeigt) nach dem Stück Text suchen, das zwischen den Anführungszeichen nach dem `id="…"` im hervorgehobenen Element steht. Oder, anstatt das im Browser zu machen, suchst du nach der richtigen HTML-Datei im `public_html`-Ordner und dann dort nach der entsprechenden Überschrift und guckst wieder auf die `id="…"`. Viel Spaß und sorry, dass das leicht technisch ist.

Wie oben schon erwähnt, sollten PDF-Dateien, sofern sie nur auf einer bestimmten Seite gebraucht werden, „lokal“ in deren Ordner gespeichert werden; wenn sie „global“ gebraucht werden, dann sollten sie im `static`-Ordner liegen.

#### (Reihen von) Bildern

Einzelne Bilder fügt man so ein: `![Beschreibender Alternativ-Text](meinBild.jpg)`. Dabei kann `meinBild.jpg` jeglicher Pfad zu einem Bild sein oder auch jede der anderen Optionen, die oben unter „Links“ beschrieben ist. Das Bild wird dann in voller Breite angezeigt (dass es eventuell den rechten Rand der Texte überragt, ist Absicht: Der Text ist so schmal, weil Zeilen mit über 80 Zeichen schwerer zu lesen sind, aber warum sollte ein schönes Bild nicht möglichst groß angezeigt werden?). Für ein Bild mit Bildunterschrift kann man das folgende HTML-Gerüst benutzen (Markdown erlaubt es, HTML-Tags einzufügen, wenn nötig):

```
<figure>
  <img src="weihnachtsfeier.jpg">
  <figcaption>
    Das JWD ist festlich geschmückt.
  </figure>
</figure>
```

Wie oben schon erwähnt, sollten Bild-Dateien, sofern sie nur auf einer bestimmten Seite gebraucht werden, „lokal“ in deren Ordner gespeichert werden; wenn sie „global“ gebraucht werden, dann sollten sie im `static`-Ordner liegen.

Um mehrere Bilder hintereinander anzuzeigen, wie zum Beispiel die Profilbilder des Fachschaftsrats unter `/fachschaftsrat/index.md`, packt man mehrere solcher Blöcke in ein `div` der dafür geschrieben Klasse `bilderreihe`. Die Bilder werden dann 300 Pixel hoch angezeigt. Man kann auch noch die Klasse `klein` für 150 Pixel hohe Bilder hinzufügen:

```
<div class="bilderreihe klein">

<figure>
    <img alt="Anke-Bilge Bianchi" src="../static/leute/Anke.jpg">
    <figcaption>
        Anke-Bilge Bianchi
    </figcaption>
</figure>

<figure>
    <img alt="Tobias Bucher" src="../static/leute/Tobse.jpg">
    <figcaption>
        Tobias Bucher,<br>
        <strong>Finanzer</strong>
    </figcaption>
</figure>

…

</div>
```

(Ansonsten ist es bloß `<div class="bilderreihe klein">`.)

**Noch eine wichtige Sache:** Um Datenvolumen und Ladegeschwindigkeiten der Website zu schonen, sollten Bilder auf jeden Fall runterskaliert/verkleinert werden auf die Größe, auf der sie auf der Website auch angezeigt werden. Die Bilder in `bilderreihe`n werden 150 bzw. 300 Pixel hoch angezeigt und sollten deshalb auf diese Höhe skaliert werden, und auch Bilder, die alleine stehen, werden nicht breiter als 800 Pixel angezeigt.

(Zugegebenermaßen sind die Bilder dann auf Bildschirmen höherer Auflösung (auf denen ein Website-Pixel 4 oder 9 echten Pixeln entsspricht) nicht so gestochen scharf, wie sie sein könnten; wenn man das wirklich möchte, ist es natürlich ideal, beim `img`-Tag ein `srcset`-Attribut mit mehreren Größen des Bildes anzugeben, sodass sich der Browser dann das richtige runterladen kann. Das wird zum Beispiel [hier](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) im Detail beschrieben, ist aber relativ technisch und idealerweise würde man das noch automatisieren.)



#### Tabellen

Auch für Tabellen nutzen wir die Möglichkeit, in Markdown einfach HTML-Tags einzufügen. Wieder ist es empfehlenswert, sich eine Datei anzugucken, in der es Tabellen gibt, zum Beispiel `/fachschaftsrat/wahlen/index.md`, `/rund-ums-studium/infoveranstaltung-abschlussarbeit/index.md` oder `/erstis/warmup/index.md` für eine stundenplanartige Tabelle.

Wie man in HTML eine einfache, grundlegende Tabelle schreibt, ist im Internet tausendfach beschrieben, zum Beispiel [bei MDN](https://developer.mozilla.org/de/docs/Web/HTML/Element/table) unter „Beispiele“. Wir gehen mal davon aus, dass du jetzt ein Grundgerüst der Form

```
<table>
  <thead>
    <tr>
      <th>Spalte 1 Überschrift</th>
      <th>Spalte 2 Überschrift</th>
      …
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Spalte 1, erste Zeile</th>
      <th>Spalte 2, erste Zeile</th>
      …
    </tr>
    …
  </tbody>
</table>
```

hast (Die Zeilen in `thead` mit den `th`-Zellen sind für die Spaltenüberschriften, die in `tbody` mit den `td`-Zellen für die Einträge). Das an sich wird hoffentlich schon okay aussehen. (Wie bei den Bildern ist es Absicht, dass die Tabelle eventuell den rechten Textrand überragt: Textzeilen sollten nicht länger als 80 Zeichen sein, aber warum sollte eine Tabelle nicht breiter sein, wenn sie den Platz nutzen kann?) Auf der Website sollte aber jede Tabelle noch in ein `div` der Klasse `scroll-container` gepackt werden, damit die Tabelle auf kleineren Bildschirmen (Handys) nicht totgequetscht wird, sondern seitlich scrollen kann. Das sieht dann so aus:

```
<div class="scroll-container">
<table>
  …
</table>
</div>
```

Schließlich sind noch einige CSS-Klassen vordefiniert, um das Aussehen der Tabelle anzupassen:

- `middle-centered`: Der Text aller Spalten wird zentriert.
- `first-left-aligned`: Der Text der ersten Spalte ist linksbündig (hat Vorrang vor `middle-centered`).
- `last-right-aligned`: Der Text der letzten Spalte ist rechtsbündig (hat Vorrang vor `middle-centered`).
- `stundenplan`: Wird momentan nur vom Stundenplan auf `/erstis/warmup/index.md` verwendet und gibt ein stundenplanartiges Aussehen.

Klassen kann man als Leerzeichen-separierte Liste im `class`-Attribut des `table`-Elements wie folgt hinzufügen:

```
<div class="scroll-container">
<table class="first-left-aligned middle-centered last-right-aligned">
  …
</table>
</div>
```

Einfach ausprobieren und hoffentlich sieht es gut aus. :)


### Aktuelle Hinweise und Termine

Die `.md`-Dateien (Markdown) in den Ordnern `hinweise` und `termine` werden überraschenderweise zu Einträgen unter „Aktuelle Hinweise“ bzw. Einträgen im Kalender auf der Startseite. Es handelt sich um Markdown-Dateien wie schon oben unter _Normale Seiten: Die `index.md`-Dateien_ beschrieben, aber sie sind im Regelfall natürlich deutlich kürzer (und haben eher selten Tabellen oder Bilder oder so). Sie sollten auch keine Hauptüberschrift haben (eine hinter einem `#`), denn die wird automamtisch eingefügt.

Die Dateinamen sind an sich egal, aber es ist sinnvoll, mit einem Datum der Form `YYYY-MM-(DD-)…` zu beginnen, damit sie im Ordner in einer groben Reihenfolge sind, und darauf einen aussagekräftigen Titel folgen zu lassen, damit man zum Beispiel alte Hinweise/Termine einfach finden kann usw. Orientiere dich an den bestehenden Dateien.

Außerdem sind die Metadaten wichtig und anders:

- Für **Hinweise** gibt es bloß zwei Felder:
  - `title:` ein Titel, der auch als Überschrift angezeigt wird, und
  - `visible:`, das `true` oder `false` sein kann. Nur Hinweise, die `visible: true` gesetzt haben, werden auf der Startseite angezeigt. So können alle alten Hinweis-Dateien im `hinweise`-Ordner bleiben, ohne, dass man sie löschen braucht, indem einfach `visible: false` gesetzt wird, wenn sie nicht mehr angezeigt werden sollen. Oder man kann Hinweise vorbereiten, die erst in der Zukunft angezeigt werden sollen.
- Für **Termine** gibt es drei Felder:
  - `kurztitel:` sollte ein super kurzer Titel sein (ein oder zwei Wörter), er wird im Kalender angezeigt, wo nicht viel Platz ist.
  - `title:` funktioniert wie bei den Hinweisen.
  - `date:` sollte das Datum und die Uhrzeit des Termins beinhalten, im Default-ISO-8601-Format, also so: `2020-04-20T17:00:00Z` für den 20. April 2020 um 17:00:00 Uhr.

Insbesondere bei Hinweisen sollte man darauf achten, dass der beschreibende Text kurz ist, denn die Hinweise werden oben auf der Startseite vorm Kalender angezeigt. Wenn da 3 Boxen mit jeweils einem bis zwei Absätzen stehen, dann ist der Kalender schon nur noch durch Scrollen zu sehen. Sollte wirklich militärisch kurz und knackig sein.

Generell ist es natürlich wieder am einfachsten, einen bestehenden Hinweis/Termin zu kopieren und nach seinen Wünschen anzupassen.



### Startseite

Die `index.md`-Datei für die Startseite ist, bis auf Metadaten, überraschend leer. Das liegt daran, dass diese Seite so speziell ist, dass alles von einem eigenen Template gemanagt wird, das neben dem `contents`-Ordner in `templates/startseite.pug` liegt. Es handelt sich um ein [Pug-Template](https://pugjs.org/api/getting-started.html). Das Ändern dieses Templates ist natürlich eher etwas _Für Entwickler_ (siehe unten), aber wenn du zum Beispiel bloß die Einträge im Schnellzugriff ändern willst, kannst du die entsprechenden Textfetzen in der `startseite.pug`-Datei bestimmt erraten und anpassen. Außerdem wird die Kontakt-Spalte aus der `kontakt.md`-Datei eingelesen, die einfach eine Markdown-Datei ist und modifizert werden kann. Es sind bloß einige `<address>`-Elemente (mit `<br>`-Elementen für Linebreaks) darin enthalten, zur semantischen Auszeichnung der Informationen.



## Für Entwickler

- das git Repo
- installation
- wintersmith build
