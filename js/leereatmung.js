/* ============================================================
   LEERE-ATMUNG
   In den Forum-Header einbinden.
   Erwartet BBCode-Ausgabe: <div class="leereatmung">Technikname|Beschreibung</div>
   ============================================================ */
(function () {

  var DEBRIS = [
    { r: 140, dur: 3.2, delay: 0 },
    { r: 110, dur: 2.6, delay: -0.8 },
    { r: 170, dur: 3.8, delay: -1.6 },
    { r: 90,  dur: 2.2, delay: -0.4 },
    { r: 150, dur: 3.4, delay: -2.2 },
    { r: 120, dur: 2.9, delay: -1.1 },
    { r: 200, dur: 4.2, delay: -0.2 },
    { r: 60,  dur: 1.8, delay: -1.4 },
    { r: 185, dur: 3.9, delay: -2.8 },
    { r: 75,  dur: 2.0, delay: -0.6 }
  ];

  var SHARDS = [
    { r: 160, dur: 3.6, delay: -0.5 },
    { r: 130, dur: 3.0, delay: -1.8 },
    { r: 190, dur: 4.0, delay: -2.5 },
    { r: 100, dur: 2.5, delay: -1.0 }
  ];

  var STREAMS = [
    { top: 30,  tx: 450, ty: 70,   dur: 2.6, delay: 0 },
    { top: 180, tx: 450, ty: -80,  dur: 3.1, delay: 0.7 },
    { top: 60,  tx: 450, ty: 40,   dur: 2.3, delay: 1.4 },
    { top: 210, tx: 450, ty: -110, dur: 2.9, delay: 2.1 }
  ];

  var STREAM_TRAILS = [
    { top: 100, tx: 450, ty: 0,   dur: 2.7, delay: 0.3 },
    { top: 150, tx: 450, ty: -50, dur: 2.4, delay: 1.8 }
  ];

  function buildEffectLayer() {
    var wrap = document.createElement('div');
    wrap.className = 'leEffectLayer';

    var haze = document.createElement('div');
    haze.className = 'lePullHaze';
    wrap.appendChild(haze);

    STREAMS.forEach(function (s) {
      var el = document.createElement('div');
      el.className = 'leStream';
      el.style.top = s.top + 'px';
      el.style.setProperty('--tx', s.tx + 'px');
      el.style.setProperty('--ty', s.ty + 'px');
      el.style.animationDuration = s.dur + 's';
      el.style.animationDelay = s.delay + 's';
      wrap.appendChild(el);
    });

    STREAM_TRAILS.forEach(function (s) {
      var el = document.createElement('div');
      el.className = 'leStreamTrail';
      el.style.top = s.top + 'px';
      el.style.setProperty('--tx', s.tx + 'px');
      el.style.setProperty('--ty', s.ty + 'px');
      el.style.animationDuration = s.dur + 's';
      el.style.animationDelay = s.delay + 's';
      wrap.appendChild(el);
    });

    DEBRIS.forEach(function (d) {
      var el = document.createElement('div');
      el.className = 'leDebris';
      el.style.setProperty('--r', d.r + 'px');
      el.style.animationDuration = d.dur + 's';
      el.style.animationDelay = d.delay + 's';
      wrap.appendChild(el);
    });

    SHARDS.forEach(function (s) {
      var el = document.createElement('div');
      el.className = 'leShard';
      el.style.setProperty('--r', s.r + 'px');
      el.style.animationDuration = s.dur + 's';
      el.style.animationDelay = s.delay + 's';
      wrap.appendChild(el);
    });

    var hole = document.createElement('div');
    hole.className = 'leHole';
    wrap.appendChild(hole);

    var outerRing = document.createElement('div');
    outerRing.className = 'leOuterRing';
    wrap.appendChild(outerRing);

    var vortexRing = document.createElement('div');
    vortexRing.className = 'leVortexRing';
    wrap.appendChild(vortexRing);

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
      }
    }
    step();
  }

  function init() {
    var boxes = document.querySelectorAll('.leereatmung');

    boxes.forEach(function (box) {
      var raw = box.textContent.trim();
      var parts = raw.split('|');
      var titleText = (parts[0] || '').trim();
      var descText = (parts.slice(1).join('|') || '').trim();

      box.innerHTML = '';
      box.appendChild(buildEffectLayer());

      var label = document.createElement('div');
      label.className = 'leLabel';
      label.textContent = 'Leere-Atmung';
      box.appendChild(label);

      var title = document.createElement('div');
      title.className = 'leTitle';
      box.appendChild(title);

      var divider = document.createElement('div');
      divider.className = 'leDivider';
      box.appendChild(divider);

      var desc = document.createElement('div');
      desc.className = 'leDesc';
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
