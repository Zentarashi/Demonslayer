// ============================================================
// NOVAATMUNG
// Liest [Novaatmung]Technikname|Beschreibung[/Novaatmung]
// (vom Forum bereits zu <div class="novaatmung">...</div>
// umgewandelt) und baut daraus die komplette Struktur.
// 4 Sternkerne kollabieren zeitversetzt, jeder mit eigenen
// Plasmastrahl-Winkeln.
// ============================================================

document.querySelectorAll('.novaatmung').forEach(function (el) {
  if (el.dataset.nvInit) return;
  el.dataset.nvInit = '1';

  var raw = el.textContent.trim();
  var parts = raw.split('|');
  var technikname = (parts[0] || '').trim();
  var beschreibung = (parts.slice(1).join('|') || '').trim();

  // 4 Sternkerne: Position, Kollaps-Zeitpunkt (Versatz), Strahl-Winkel
  var novas = [
    { top: '32%', left: '62%', delay: '0s',   width: 90, angles: [0, 45, 90, 135] },
    { top: '58%', left: '78%', delay: '1.2s', width: 70, angles: [0, 90] },
    { top: '22%', left: '82%', delay: '2.4s', width: 60, angles: [20, 110] },
    { top: '70%', left: '60%', delay: '3.6s', width: 80, angles: [60, 150] }
  ];

  function makeNova(n) {
    var pos = 'top:' + n.top + ';left:' + n.left + ';';
    var html =
      '<div class="nv-core" style="' + pos + 'animation-delay:' + n.delay + ';"></div>' +
      '<div class="nv-flash" style="' + pos + 'animation-delay:' + n.delay + ';"></div>';
    n.angles.forEach(function (a) {
      html += '<div class="nv-beam" style="' + pos + '--a:' + a + 'deg;width:' + n.width + 'px;animation-delay:' + n.delay + ';"></div>';
    });
    return html;
  }

  el.innerHTML =
    '<div class="nv-rim"></div>' +
    novas.map(makeNova).join('') +
    '<div class="nv-content">' +
      '<div class="nv-label">Novaatmung</div>' +
      '<div class="nv-title"><span class="nv-typewriter"></span></div>' +
      '<div class="nv-divider"></div>' +
      '<div class="nv-desc"></div>' +
    '</div>';

  var titleEl = el.querySelector('.nv-typewriter');
  var descEl = el.querySelector('.nv-desc');
  descEl.textContent = beschreibung;

  var i = 0;
  function type() {
    if (i <= technikname.length) {
      titleEl.textContent = technikname.slice(0, i);
      i++;
      setTimeout(type, 90);
    }
  }
  setTimeout(type, 700);
});
