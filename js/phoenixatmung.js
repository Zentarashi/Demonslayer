// ============================================================
// PHOENIXATMUNG
// Liest [Phoenixatmung]Technikname|Beschreibung[/Phoenixatmung]
// (vom Forum bereits zu <div class="phoenixatmung">...</div>
// umgewandelt) und baut daraus die komplette Struktur.
// Phönix- und Flammen-Bilder liegen als Hintergrundbild fest
// in der CSS-Datei (phoenixatmung.css) und müssen hier nicht
// mehr eingefügt werden.
// ============================================================

document.querySelectorAll('.phoenixatmung').forEach(function (el) {
  if (el.dataset.pxInit) return;
  el.dataset.pxInit = '1';

  var raw = el.textContent.trim();
  var parts = raw.split('|');
  var technikname = (parts[0] || '').trim();
  var beschreibung = (parts.slice(1).join('|') || '').trim();

  el.innerHTML =
    '<div class="px-glow"></div>' +
    '<div class="px-fire px-fire-bottom"></div>' +
    '<div class="px-fire px-fire-top"></div>' +
    '<div class="px-phoenix"></div>' +
    '<div class="px-content">' +
      '<div class="px-label">Phoenixatmung</div>' +
      '<div class="px-title"><span class="px-typewriter"></span></div>' +
      '<div class="px-divider"></div>' +
      '<div class="px-desc"></div>' +
    '</div>';

  var titleEl = el.querySelector('.px-typewriter');
  var descEl = el.querySelector('.px-desc');
  descEl.textContent = beschreibung;

  // Typewriter startet, sobald der Phönix seine volle
  // Sichtbarkeit erreicht hat (38% von 12s Zyklus)
  var i = 0;
  function type() {
    if (i <= technikname.length) {
      titleEl.textContent = technikname.slice(0, i);
      i++;
      setTimeout(type, 90);
    }
  }
  setTimeout(type, 4560);
});
