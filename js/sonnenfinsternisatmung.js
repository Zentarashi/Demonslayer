/* ============================================================
   SONNENFINSTERNIS-ATMUNG
   In den Forum-Header einbinden.
   Erwartet BBCode-Ausgabe: <div class="sonnenfinsternisatmung">Technikname|Beschreibung</div>
   ============================================================ */
(function () {

  var SHARDS = [
    { dx: -380, dy: -40,  dr: 70  },
    { dx: -260, dy: 60,   dr: -50 },
    { dx: -140, dy: -90,  dr: 110 },
    { dx: -60,  dy: 90,   dr: -90 },
    { dx: 60,   dy: -100, dr: 130 },
    { dx: 150,  dy: 80,   dr: -110 },
    { dx: 280,  dy: -30,  dr: 60  },
    { dx: 390,  dy: 70,   dr: 80  }
  ];

  var SPARKS = [
    { dx: -420, dy: -90,  delay: 0 },
    { dx: -320, dy: 100,  delay: 0.05 },
    { dx: -180, dy: -120, delay: 0.1 },
    { dx: -20,  dy: 130,  delay: 0.15 },
    { dx: 180,  dy: -110, delay: 0.08 },
    { dx: 340,  dy: 100,  delay: 0.12 },
    { dx: 430,  dy: -60,  delay: 0.18 },
    { dx: -440, dy: 20,   delay: 0.22 }
  ];

  function buildEffectLayer() {
    var wrap = document.createElement('div');
    wrap.className = 'sfEffectLayer';

    var flash = document.createElement('div');
    flash.className = 'sfFlash';
    wrap.appendChild(flash);

    var core = document.createElement('div');
    core.className = 'sfCore';
    wrap.appendChild(core);

    SHARDS.forEach(function (s) {
      var el = document.createElement('div');
      el.className = 'sfShard';
      el.style.setProperty('--dx', s.dx + 'px');
      el.style.setProperty('--dy', s.dy + 'px');
      el.style.setProperty('--dr', s.dr + 'deg');
      wrap.appendChild(el);
    });

    SPARKS.forEach(function (s) {
      var el = document.createElement('div');
      el.className = 'sfSpark';
      el.style.setProperty('--dx', s.dx + 'px');
      el.style.setProperty('--dy', s.dy + 'px');
      el.style.animationDelay = s.delay + 's';
      wrap.appendChild(el);
    });

    return wrap;
  }

  function typewriter(el, text, speed) {
    var i = 0;
    el.textContent = '';
    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else {
        el.classList.add('sfShineOn');
      }
    }
    step();
  }

  function init() {
    var boxes = document.querySelectorAll('.sonnenfinsternisatmung');

    boxes.forEach(function (box) {
      var raw = box.textContent.trim();
      var parts = raw.split('|');
      var titleText = (parts[0] || '').trim();
      var descText = (parts.slice(1).join('|') || '').trim();

      box.innerHTML = '';
      box.appendChild(buildEffectLayer());

      var label = document.createElement('div');
      label.className = 'sfLabel';
      label.textContent = 'Sonnenfinsternis-Atmung';
      box.appendChild(label);

      var title = document.createElement('div');
      title.className = 'sfTitle';
      box.appendChild(title);

      var divider = document.createElement('div');
      divider.className = 'sfDivider';
      box.appendChild(divider);

      var desc = document.createElement('div');
      desc.className = 'sfDesc';
      desc.textContent = descText;
      box.appendChild(desc);

      typewriter(title, titleText, 45);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
