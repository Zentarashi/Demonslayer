/* ============================================
   INSEKTENATMUNG — JS
   Baut den Anzeige-Block aus [InsektenAtmung]Technikname|Beschreibung[/InsektenAtmung]
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  var BUTTERFLIES = [
    { cls: 'ia-butterfly-1', size: [90, 68], fill: '#3d1a5c', opacity: 0.95 },
    { cls: 'ia-butterfly-2', size: [70, 52], fill: '#2a1140', opacity: 0.9 },
    { cls: 'ia-butterfly-3', size: [48, 36], fill: '#4a1f6e', opacity: 0.85 },
    { cls: 'ia-butterfly-4', size: [58, 44], fill: '#331755', opacity: 0.9 },
    { cls: 'ia-butterfly-5', size: [42, 32], fill: '#241038', opacity: 0.8 }
  ];

  var STARS = [
    { top: '24px',  left: '70%', size: 3, delay: '0s' },
    { top: '60px',  left: '60%', size: 2, delay: '0.5s' },
    { top: '100px', left: '85%', size: 2, delay: '1s' },
    { top: '140px', left: '55%', size: 3, delay: '1.5s' },
    { top: '30px',  left: '40%', size: 2, delay: '0.3s' },
    { top: '170px', left: '15%', size: 2, delay: '0.8s' }
  ];

  function buildButterflySVG(b) {
    var w = b.size[0], h = b.size[1];
    return (
      '<svg class="ia-butterfly ' + b.cls + '" width="' + w + '" height="' + h +
      '" viewBox="0 0 26 20">' +
        '<g class="ia-wings">' +
          '<path d="M13,10 C6,-3 -4,0 0,10 C-4,20 6,23 13,10 Z" fill="' + b.fill + '" stroke="#c084fc" stroke-width="0.5" opacity="' + b.opacity + '"/>' +
          '<path d="M13,10 C20,-3 30,0 26,10 C30,20 20,23 13,10 Z" fill="' + b.fill + '" stroke="#c084fc" stroke-width="0.5" opacity="' + b.opacity + '"/>' +
          '<circle cx="4" cy="7" r="1.6" fill="#150a26" opacity="0.6"/>' +
          '<circle cx="22" cy="7" r="1.6" fill="#150a26" opacity="0.6"/>' +
        '</g>' +
        '<ellipse cx="13" cy="10" rx="1.3" ry="4.8" fill="#150a26"/>' +
      '</svg>'
    );
  }

  function buildStars() {
    return STARS.map(function (s) {
      return '<span class="ia-star" style="top:' + s.top + '; left:' + s.left +
        '; width:' + s.size + 'px; height:' + s.size + 'px; animation-delay:' + s.delay + ';"></span>';
    }).join('');
  }

  function buildKaleidoscope() {
    return (
      '<svg class="ia-kaleidoscope" viewBox="0 0 110 110">' +
        '<circle cx="55" cy="55" r="50" stroke="#e0aaff" stroke-width="0.8" fill="none"/>' +
        '<circle cx="55" cy="55" r="35" stroke="#e0aaff" stroke-width="0.8" fill="none"/>' +
        '<line x1="5" y1="55" x2="105" y2="55" stroke="#e0aaff" stroke-width="0.6"/>' +
        '<line x1="55" y1="5" x2="55" y2="105" stroke="#e0aaff" stroke-width="0.6"/>' +
        '<line x1="20" y1="20" x2="90" y2="90" stroke="#e0aaff" stroke-width="0.6"/>' +
        '<line x1="90" y1="20" x2="20" y2="90" stroke="#e0aaff" stroke-width="0.6"/>' +
      '</svg>'
    );
  }

  function typewriterGlitch(el, text) {
    var glitchChars = '!<>-_\\/[]{}—=+*^?#';
    var i = 0;

    function step() {
      if (i <= text.length) {
        var revealed = text.slice(0, i);
        var scrambled = '';
        if (i < text.length) {
          for (var j = 0; j < 3; j++) {
            scrambled += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
        }
        el.textContent = revealed + scrambled;
        i++;
        setTimeout(step, 40);
      } else {
        el.textContent = text;
      }
    }
    step();
  }

  var blocks = document.querySelectorAll('.insektenatmung');

  blocks.forEach(function (block) {
    var raw = block.textContent.trim();
    var parts = raw.split('|');
    var technikname = (parts[0] || '').trim();
    var beschreibung = (parts.slice(1).join('|') || '').trim();

    block.textContent = '';

    var html =
      '<div class="ia-glow-tr"></div>' +
      '<div class="ia-glow-bl"></div>' +
      buildStars() +
      buildKaleidoscope() +
      BUTTERFLIES.map(buildButterflySVG).join('') +
      '<div class="ia-label">Insektenatmung</div>' +
      '<div class="ia-title"></div>' +
      '<div class="ia-line"></div>' +
      '<div class="ia-description"></div>';

    block.innerHTML = html;

    var titleEl = block.querySelector('.ia-title');
    var descEl = block.querySelector('.ia-description');

    descEl.textContent = beschreibung;
    typewriterGlitch(titleEl, technikname);
  });

});
