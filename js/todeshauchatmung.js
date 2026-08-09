// ================================
// TODESHAUCH-ATMUNG - BBCode Parser
// BBCode: [Todeshauchatmung]Technikname|Beschreibung[/Todeshauchatmung]
// Ersetzt in eurem BBCode-Mapping:
//   [Todeshauchatmung]  -> <div class="todeshauchatmung">
//   [/Todeshauchatmung] -> </div>
// ================================

function initTodeshauchatmung() {
  document.querySelectorAll('.todeshauchatmung:not([data-ta-init])').forEach(function (el) {
    el.setAttribute('data-ta-init', '1');

    var raw = el.textContent.trim();
    var parts = raw.split('|');
    var title = (parts[0] || '').trim();
    var desc = (parts.slice(1).join('|') || '').trim();

    el.innerHTML =
      '<span class="ta-kanji k1">\u6b7b</span>' +   // 死
      '<span class="ta-kanji k2">\u8150</span>' +   // 腐 (Verfall)
      '<span class="ta-kanji k3">\u6bd2</span>' +   // 毒
      '<svg class="ta-cracks" viewBox="0 0 400 220" preserveAspectRatio="none">' +
        '<path d="M40,10 L70,60 L50,90 L90,140 L70,180"/>' +
        '<path d="M360,20 L330,70 L350,100 L310,150 L330,200"/>' +
        '<path d="M200,0 L215,40 L190,75 L210,120"/>' +
      '</svg>' +
      '<div class="ta-fangs">' +
        '<svg class="ta-fang ta-fang-left" viewBox="0 0 120 200"><path d="M14,196 C2,140 12,55 66,6 C60,72 48,145 14,196 Z" fill="rgba(200,255,150,0.55)"/></svg>' +
        '<svg class="ta-fang ta-fang-right" viewBox="0 0 120 200"><path d="M106,196 C118,140 108,55 54,6 C60,72 72,145 106,196 Z" fill="rgba(200,255,150,0.55)"/></svg>' +
      '</div>' +
      '<div class="ta-flash"></div>' +
      '<span class="ta-corner tl">\u2726</span>' +
      '<span class="ta-corner tr">\u2726</span>' +
      '<span class="ta-corner bl">\u2726</span>' +
      '<span class="ta-corner br">\u2726</span>' +
      '<div class="ta-label">TODESHAUCH-ATMUNG</div>' +
      '<div class="ta-header">' +
        '<span class="ta-icon">\u2620</span>' +
        '<span class="ta-title">' + title + '</span>' +
      '</div>' +
      '<hr class="ta-divider">' +
      '<div class="ta-desc">' + desc + '</div>' +
      '<div class="ta-fog"></div>';

    // Gift-Tropfen erzeugen
    for (var i = 0; i < 5; i++) {
      var d = document.createElement('span');
      d.className = 'ta-drip';
      d.style.left = (20 + Math.random() * 60) + '%';
      d.style.animationDuration = (2.4 + Math.random() * 1.6) + 's';
      d.style.animationDelay = (Math.random() * 3) + 's';
      el.appendChild(d);
    }

    // Giftsporen erzeugen
    for (var j = 0; j < 7; j++) {
      var s = document.createElement('span');
      s.className = 'ta-spore';
      s.style.left = (10 + Math.random() * 80) + '%';
      s.style.animationDuration = (4 + Math.random() * 3) + 's';
      s.style.animationDelay = (Math.random() * 5) + 's';
      el.appendChild(s);
    }
  });
}

document.addEventListener('DOMContentLoaded', initTodeshauchatmung);

// Falls Beiträge dynamisch nachgeladen werden (Ajax etc.)
new MutationObserver(initTodeshauchatmung).observe(document.body, { childList: true, subtree: true });
