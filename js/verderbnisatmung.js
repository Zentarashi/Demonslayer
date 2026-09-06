/* ============================================================
   VERDERBNIS-ATMUNG
   In den Forum-Header einbinden.
   Erwartet BBCode-Ausgabe: <div class="verderbnisatmung">Technikname|Beschreibung</div>
   ============================================================ */
(function () {

  var SHARD_GLASS_ID = 'veShardGlass';
  var VEIN_GRAD_ID = 've VeinGrad'.replace(' ', '');

  var SHARDS = [
    { pts: "520,105 470,60 500,20 560,15 610,55",                     mx: 4,  my: -3, mr: 0.6,  op: 1 },
    { pts: "520,105 610,55 665,90 640,145 575,150",                   mx: -3, my: 4,  mr: -0.5, op: 1 },
    { pts: "520,105 575,150 545,205 480,200 460,155",                 mx: 3,  my: 5,  mr: 0.4,  op: 1 },
    { pts: "520,105 460,155 400,140 380,90 430,65",                   mx: -4, my: -3, mr: -0.6, op: 1 },
    { pts: "520,105 430,65 470,60 500,20 470,10 330,30 350,110 400,140", mx: 2,  my: -5, mr: 0.5,  op: 0.7 },
    { pts: "610,55 665,90 750,70 760,10 560,15",                      mx: 5,  my: 2,  mr: 0.6,  op: 0.7 },
    { pts: "665,90 640,145 700,190 780,160 750,70",                   mx: 4,  my: 6,  mr: -0.5, op: 0.7 },
    { pts: "575,150 640,145 700,190 620,225 545,205",                 mx: -2, my: 6,  mr: 0.4,  op: 0.7 },
    { pts: "480,200 545,205 620,225 480,230 420,220",                 mx: -5, my: 5,  mr: -0.4, op: 0.7 },
    { pts: "400,140 460,155 480,200 420,220 340,190 350,150",         mx: -6, my: 2,  mr: -0.5, op: 0.7 },
    { pts: "330,30 350,110 280,120 250,50 300,10",                    mx: -4, my: -4, mr: -0.4, op: 0.65 },
    { pts: "350,110 350,150 280,175 220,140 280,120",                 mx: -5, my: 3,  mr: -0.5, op: 0.65 },
    { pts: "340,190 280,175 220,140 140,160 170,215 320,225",         mx: -6, my: 5,  mr: -0.4, op: 0.6 },
    { pts: "250,50 280,120 220,140 100,110 90,30 200,10",             mx: -4, my: -6, mr: -0.5, op: 0.6 },
    { pts: "750,70 760,10 850,20 860,90 780,90",                      mx: 6,  my: -3, mr: 0.5,  op: 0.6 },
    { pts: "780,90 860,90 880,170 800,190 780,160",                   mx: 6,  my: 5,  mr: 0.5,  op: 0.6 },
    { pts: "700,190 800,190 880,170 850,225 620,225",                 mx: 5,  my: 6,  mr: 0.4,  op: 0.6 }
  ];

  var CRACKS = [
    { d: "M520,105 L610,55 L665,90 M520,105 L575,150 L640,145 M520,105 L400,140", width: 2.2, opacity: 1, delay: 0 },
    { d: "M610,55 L560,15 L500,20 M665,90 L750,70 L760,10 M575,150 L545,205 L480,200 M400,140 L380,90 L430,65 M400,140 L350,150 L340,190", width: 1.3, opacity: 0.8, delay: 0.1 }
  ];

  var EMBERS = [
    { top: 150, left: 150, dur: 4.2, delay: 0 },
    { top: 100, left: 280, dur: 3.8, delay: 0.8 },
    { top: 170, left: 420, dur: 4.6, delay: 1.6 },
    { top: 60,  left: 560, dur: 4.0, delay: 2.3 },
    { top: 190, left: 680, dur: 4.4, delay: 0.4 },
    { top: 120, left: 780, dur: 3.6, delay: 1.9 },
    { top: 40,  left: 350, dur: 4.8, delay: 2.8 },
    { top: 200, left: 220, dur: 3.9, delay: 1.1 }
  ];

  var svgNS = 'http://www.w3.org/2000/svg';

  function buildEffectLayer() {
    var wrap = document.createElement('div');
    wrap.className = 'veEffectLayer';

    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '900');
    svg.setAttribute('height', '230');
    svg.setAttribute('viewBox', '0 0 900 230');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';

    var defs = document.createElementNS(svgNS, 'defs');

    var shardGrad = document.createElementNS(svgNS, 'linearGradient');
    shardGrad.setAttribute('id', SHARD_GLASS_ID);
    shardGrad.setAttribute('x1', '0'); shardGrad.setAttribute('y1', '0');
    shardGrad.setAttribute('x2', '1'); shardGrad.setAttribute('y2', '1');
    [['0%', '#2a2a45', 0.5], ['45%', '#14142a', 0.35], ['100%', '#08081a', 0.5]].forEach(function (s) {
      var stop = document.createElementNS(svgNS, 'stop');
      stop.setAttribute('offset', s[0]);
      stop.setAttribute('stop-color', s[1]);
      stop.setAttribute('stop-opacity', s[2]);
      shardGrad.appendChild(stop);
    });
    defs.appendChild(shardGrad);

    var veinGrad = document.createElementNS(svgNS, 'linearGradient');
    veinGrad.setAttribute('id', VEIN_GRAD_ID);
    veinGrad.setAttribute('x1', '0'); veinGrad.setAttribute('y1', '0');
    veinGrad.setAttribute('x2', '1'); veinGrad.setAttribute('y2', '1');
    [['0%', '#8ee9df'], ['100%', '#a24fd6']].forEach(function (s) {
      var stop = document.createElementNS(svgNS, 'stop');
      stop.setAttribute('offset', s[0]);
      stop.setAttribute('stop-color', s[1]);
      veinGrad.appendChild(stop);
    });
    defs.appendChild(veinGrad);
    svg.appendChild(defs);

    SHARDS.forEach(function (s) {
      var poly = document.createElementNS(svgNS, 'polygon');
      poly.setAttribute('class', 'veShard');
      poly.setAttribute('points', s.pts);
      poly.setAttribute('fill', 'url(#' + SHARD_GLASS_ID + ')');
      poly.setAttribute('stroke', '#3a3a5c');
      poly.setAttribute('stroke-width', '0.6');
      poly.setAttribute('opacity', s.op);
      poly.style.setProperty('--ox', '520px');
      poly.style.setProperty('--oy', '105px');
      poly.style.setProperty('--mx', s.mx + 'px');
      poly.style.setProperty('--my', s.my + 'px');
      poly.style.setProperty('--mr', s.mr + 'deg');
      svg.appendChild(poly);
    });

    CRACKS.forEach(function (c) {
      var path = document.createElementNS(svgNS, 'path');
      path.setAttribute('class', 'veCrack');
      path.setAttribute('d', c.d);
      path.setAttribute('stroke', 'url(#' + VEIN_GRAD_ID + ')');
      path.setAttribute('stroke-width', c.width);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('opacity', c.opacity);
      path.style.animationDelay = c.delay + 's';
      svg.appendChild(path);
    });

    wrap.appendChild(svg);

    EMBERS.forEach(function (e) {
      var el = document.createElement('div');
      el.className = 'veEmber';
      el.style.top = e.top + 'px';
      el.style.left = e.left + 'px';
      el.style.animationDuration = e.dur + 's';
      el.style.animationDelay = e.delay + 's';
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
      }
    }
    step();
  }

  function init() {
    var boxes = document.querySelectorAll('.verderbnisatmung');

    boxes.forEach(function (box) {
      var raw = box.textContent.trim();
      var parts = raw.split('|');
      var titleText = (parts[0] || '').trim();
      var descText = (parts.slice(1).join('|') || '').trim();

      box.innerHTML = '';
      box.appendChild(buildEffectLayer());

      var label = document.createElement('div');
      label.className = 'veLabel';
      label.textContent = 'Verderbnis-Atmung';
      box.appendChild(label);

      var title = document.createElement('div');
      title.className = 'veTitle';
      box.appendChild(title);

      var divider = document.createElement('div');
      divider.className = 'veDivider';
      box.appendChild(divider);

      var desc = document.createElement('div');
      desc.className = 'veDesc';
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
