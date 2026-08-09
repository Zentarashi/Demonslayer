/* ============================================================
   TODESHAUCH-ATMUNG
   In den Forum-Header einbinden.
   Erwartet BBCode-Ausgabe: <div class="todeshauchatmung">Technikname|Beschreibung</div>

   WICHTIG: Trage unten bei DRAGON_HEAD_URL und WING_URL die
   direkten Bild-Links ein (Bild hochladen z.B. ins Forum-Anhang-
   system oder einen Hoster, dann den Link hier einsetzen).
   ============================================================ */
(function () {
   
var DRAGON_HEAD_URL = 'https://cdn.jsdelivr.net/gh/Zentarashi/Demonslayer@main/images/todeshauch-drache.png';
var WING_URL = 'https://cdn.jsdelivr.net/gh/Zentarashi/Demonslayer@main/images/Flügel.webp';

  var FOG_BANKS = [
    { top: '-15%', duration: '12s', delay: '0s' },
    { top: '15%',  duration: '17s', delay: '2s',   height: '60%' },
    { top: '40%',  duration: '14s', delay: '5s',   height: '70%' },
    { top: '-8%',  duration: '20s', delay: '8s',   width: '55%' },
    { top: '30%',  duration: '10s', delay: '3.5s', width: '48%', height: '50%' },
    { top: '5%',   duration: '15s', delay: '6.5s', width: '60%', height: '55%' },
    { top: '55%',  duration: '18s', delay: '1s',   width: '50%', height: '45%' }
  ];

  function buildFogLayer() {
    var wrap = document.createElement('div');
    wrap.className = 'taFogLayer';

    var veil = document.createElement('div');
    veil.className = 'taFogVeil';
    wrap.appendChild(veil);

    FOG_BANKS.forEach(function (b) {
      var el = document.createElement('div');
      el.className = 'taFogBank';
      el.style.top = b.top;
      el.style.animationDuration = b.duration;
      el.style.animationDelay = b.delay;
      if (b.width) el.style.width = b.width;
      if (b.height) el.style.height = b.height;
      wrap.appendChild(el);
    });

    return wrap;
  }

  function buildScaleLayer() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'taScaleLayer');
    svg.setAttribute('viewBox', '0 0 900 230');
    svg.setAttribute('preserveAspectRatio', 'none');

    var defs = document.createElementNS(ns, 'defs');
    var grad = document.createElementNS(ns, 'linearGradient');
    grad.setAttribute('id', 'taScaleFill');
    grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0'); grad.setAttribute('y2', '1');
    var stop1 = document.createElementNS(ns, 'stop');
    stop1.setAttribute('offset', '0%'); stop1.setAttribute('stop-color', '#24371a');
    var stop2 = document.createElementNS(ns, 'stop');
    stop2.setAttribute('offset', '100%'); stop2.setAttribute('stop-color', '#0a0f08');
    grad.appendChild(stop1); grad.appendChild(stop2);
    defs.appendChild(grad);

    var scaleShape = document.createElementNS(ns, 'path');
    scaleShape.setAttribute('id', 'taScaleShape');
    scaleShape.setAttribute('d', 'M0 26 C0 12 7 0 15 0 C23 0 30 12 30 26 C23 20 7 20 0 26 Z');
    scaleShape.setAttribute('fill', 'url(#taScaleFill)');
    scaleShape.setAttribute('stroke', '#8ee000');
    scaleShape.setAttribute('stroke-width', '1');
    scaleShape.setAttribute('opacity', '0.9');
    defs.appendChild(scaleShape);
    svg.appendChild(defs);

    var left = document.createElementNS(ns, 'g');
    left.setAttribute('id', 'taScalesLeft');

    var colAYs = [-34, -12, 10, 32, 54, 76, 98, 120, 142, 164, 186, 208, 230];
    var colBYs = [-23, -1, 21, 43, 65, 87, 109, 131, 153, 175, 197, 219];

    colAYs.forEach(function (y) {
      var use = document.createElementNS(ns, 'use');
      use.setAttribute('href', '#taScaleShape');
      use.setAttribute('x', '0');
      use.setAttribute('y', y);
      left.appendChild(use);
    });
    colBYs.forEach(function (y) {
      var use = document.createElementNS(ns, 'use');
      use.setAttribute('href', '#taScaleShape');
      use.setAttribute('x', '17');
      use.setAttribute('y', y);
      left.appendChild(use);
    });

    svg.appendChild(left);

    var mirror = document.createElementNS(ns, 'g');
    mirror.setAttribute('transform', 'translate(900,0) scale(-1,1)');
    var useLeft = document.createElementNS(ns, 'use');
    useLeft.setAttribute('href', '#taScalesLeft');
    mirror.appendChild(useLeft);
    svg.appendChild(mirror);

    return svg;
  }

  function buildBreathGust() {
    var wrap = document.createElement('div');
    wrap.className = 'breathGust';
    wrap.style.top = '87px';
    wrap.style.left = '177px';
    wrap.style.width = '420px';
    wrap.style.height = '120px';

    wrap.innerHTML =
      '<svg width="420" height="120" viewBox="0 0 420 120">' +
        '<defs><linearGradient id="gDragon" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#d8ffb0" stop-opacity="0.9"/>' +
          '<stop offset="35%" stop-color="#9ee000" stop-opacity="0.55"/>' +
          '<stop offset="75%" stop-color="#7a3fa8" stop-opacity="0.22"/>' +
          '<stop offset="100%" stop-color="#7a3fa8" stop-opacity="0"/>' +
        '</linearGradient></defs>' +
        '<path d="M0 60 C 30 35, 80 25, 140 32 C 200 39, 250 22, 300 18 C 345 15, 385 35, 415 60 ' +
              'C 390 82, 340 100, 280 102 C 210 105, 150 96, 95 95 C 50 94, 18 78, 0 60 Z" fill="url(#gDragon)"/>' +
      '</svg>';

    return wrap;
  }

  function buildDragonHead() {
    var wrap = document.createElement('div');
    wrap.className = 'taDragonHead';
    var img = document.createElement('img');
    img.src = DRAGON_HEAD_URL;
    img.alt = 'Drachenkopf';
    wrap.appendChild(img);
    return wrap;
  }

  function buildWing() {
    var wrap = document.createElement('div');
    wrap.className = 'taWing';
    var img = document.createElement('img');
    img.src = WING_URL;
    img.alt = 'Fluegel';
    wrap.appendChild(img);
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
    var boxes = document.querySelectorAll('.todeshauchatmung');

    boxes.forEach(function (box) {
      var raw = box.textContent.trim();
      var parts = raw.split('|');
      var titleText = (parts[0] || '').trim();
      var descText = (parts.slice(1).join('|') || '').trim();

      box.innerHTML = '';
      box.appendChild(buildFogLayer());
      box.appendChild(buildScaleLayer());
      box.appendChild(buildDragonHead());
      box.appendChild(buildWing());
      box.appendChild(buildBreathGust());

      var label = document.createElement('div');
      label.className = 'taLabel';
      label.textContent = 'Todeshauch-Atmung';
      box.appendChild(label);

      var title = document.createElement('div');
      title.className = 'taTitle';
      box.appendChild(title);

      var divider = document.createElement('div');
      divider.className = 'taDivider';
      box.appendChild(divider);

      var desc = document.createElement('div');
      desc.className = 'taDesc';
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
