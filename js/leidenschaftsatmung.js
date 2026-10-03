/* ================================================
   LEIDENSCHAFTS-ATMUNG — JS
   In den Header einfügen
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".leidenschaftsatmung").forEach(function (el) {

    var raw   = el.textContent.trim();
    var sep   = raw.indexOf("|");
    var name  = sep >= 0 ? raw.slice(0, sep).trim() : raw.trim();
    var desc  = sep >= 0 ? raw.slice(sep + 1).trim() : "";

    el.innerHTML =
      '<canvas class="la-canvas"></canvas>' +
      '<div class="la-vignette"></div>' +
      '<div class="la-heartglow"></div>' +
      '<div class="la-inner">' +
        '<div class="la-label">Leidenschafts-Atmung</div>' +
        '<div class="la-ttl" id="laTtl_' + Date.now() + Math.random().toString(36).slice(2) + '"></div>' +
        '<div class="la-divider"></div>' +
        '<div class="la-desc">' + desc + '</div>' +
      '</div>';

    var cv      = el.querySelector('.la-canvas');
    var titleEl = el.querySelector('.la-ttl');
    var ctx     = cv.getContext('2d');
    var t = 0;

    function rnd(a, b) { return a + Math.random() * (b - a); }

    /* ---- EMBERS ---- */
    var embers = [];
    for (var i = 0; i < 80; i++) {
      embers.push({
        x: rnd(0, 800), y: rnd(0, 200),
        vx: rnd(-0.4, 0.4), vy: rnd(-1.2, -0.2),
        size: rnd(1, 3.5),
        alpha: rnd(0.3, 0.9),
        life: rnd(0, 1), maxLife: rnd(60, 180),
        warm: Math.random() < 0.5
      });
    }

    /* ---- FLAME PARTICLES ---- */
    var flames = [];
    for (var j = 0; j < 45; j++) {
      flames.push({
        x: rnd(0, 800), y: rnd(100, 220),
        vx: rnd(-0.5, 0.5), vy: rnd(-1.8, -0.6),
        size: rnd(6, 22),
        alpha: rnd(0.06, 0.22),
        life: rnd(0, 1), maxLife: rnd(40, 90)
      });
    }

    /* ---- FLOATING HEARTS ---- */
    var hearts = [];
    for (var h = 0; h < 8; h++) {
      hearts.push({
        x: rnd(0, 800), y: rnd(0, 200),
        vy: rnd(-0.3, -0.08),
        size: rnd(3, 10),
        alpha: rnd(0.05, 0.25),
        life: rnd(0, 1), maxLife: rnd(120, 300)
      });
    }

    /* ---- EDGE FLAMES ---- */
    var edgeFlames = [];
    for (var e = 0; e < 30; e++) {
      edgeFlames.push({
        side: Math.random() < 0.5 ? 'left' : 'right',
        yBase: rnd(0, 220),
        phase: rnd(0, Math.PI * 2),
        height: rnd(20, 60),
        width: rnd(15, 35),
        speed: rnd(0.03, 0.07),
        alpha: rnd(0.1, 0.3)
      });
    }

    /* ---- HEART DRAW ---- */
    function drawHeart(cx, cy, size, alpha, glow) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.scale(size, size);
      ctx.beginPath();
      ctx.moveTo(0, -0.5);
      ctx.bezierCurveTo( 0.5, -1.1,  1.2, -0.6,  1.2,  0.1);
      ctx.bezierCurveTo( 1.2,  0.8,  0,    1.5,   0,    1.5);
      ctx.bezierCurveTo( 0,    1.5, -1.2,  0.8,  -1.2,  0.1);
      ctx.bezierCurveTo(-1.2, -0.6, -0.5, -1.1,   0,   -0.5);
      ctx.closePath();
      if (glow) {
        ctx.shadowColor = 'rgba(255,40,0,0.9)';
        ctx.shadowBlur  = 18;
      }
      var hg = ctx.createRadialGradient(0, 0.2, 0, 0, 0.2, 1.4);
      hg.addColorStop(0,   'rgba(255,120,60,1)');
      hg.addColorStop(0.5, 'rgba(200,20,10,0.9)');
      hg.addColorStop(1,   'rgba(100,0,0,0.3)');
      ctx.fillStyle = hg;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    /* ---- RESIZE ---- */
    function resize() {
      cv.width  = el.offsetWidth  || 820;
      cv.height = el.offsetHeight || 200;
    }
    resize();
    window.addEventListener('resize', resize);

    /* ---- TICK ---- */
    function tick() {
      cv.width  = el.offsetWidth  || 820;
      cv.height = el.offsetHeight || 200;
      var W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      t++;

      /* bottom glow */
      var btm = ctx.createLinearGradient(0, H * 0.5, 0, H);
      btm.addColorStop(0, 'rgba(0,0,0,0)');
      btm.addColorStop(0.6, 'rgba(80,5,0,0.12)');
      btm.addColorStop(1,   'rgba(140,15,0,0.22)');
      ctx.fillStyle = btm;
      ctx.fillRect(0, 0, W, H);

      /* edge flames */
      edgeFlames.forEach(function (ef) {
        ef.phase += ef.speed;
        var x = ef.side === 'left'
          ? ef.width * 0.5 + Math.sin(ef.phase) * 8
          : W - ef.width * 0.5 - Math.sin(ef.phase) * 8;
        var fg = ctx.createRadialGradient(x, ef.yBase, 0, x, ef.yBase, ef.width);
        fg.addColorStop(0,   'rgba(255,80,10,' + ef.alpha + ')');
        fg.addColorStop(0.5, 'rgba(180,20,0,' + (ef.alpha * 0.5) + ')');
        fg.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.ellipse(x, ef.yBase, ef.width, ef.height * (0.7 + Math.sin(ef.phase) * 0.3), 0, 0, Math.PI * 2);
        ctx.fill();
      });

      /* flame particles */
      flames.forEach(function (f) {
        f.life += 1 / f.maxLife;
        f.x += f.vx + Math.sin(t * 0.02 + f.y) * 0.3;
        f.y += f.vy;
        if (f.life >= 1) { f.life = 0; f.x = rnd(0, W); f.y = H; f.maxLife = rnd(40, 90); }
        var a = f.alpha * (1 - f.life) * (f.life < 0.5 ? f.life * 2 : 1);
        var fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * (1 - f.life * 0.5));
        fg.addColorStop(0,   'rgba(255,180,40,' + a + ')');
        fg.addColorStop(0.4, 'rgba(220,50,10,' + (a * 0.7) + ')');
        fg.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * (1 - f.life * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });

      /* embers */
      embers.forEach(function (em) {
        em.life += 1 / em.maxLife;
        em.x += em.vx + Math.sin(t * 0.015 + em.x) * 0.2;
        em.y += em.vy;
        if (em.life >= 1) { em.life = 0; em.x = rnd(0, W); em.y = H + 5; em.maxLife = rnd(60, 180); }
        var a = em.alpha * Math.sin(em.life * Math.PI);
        ctx.beginPath();
        ctx.arc(em.x, em.y, em.size * (0.5 + Math.sin(em.life * Math.PI) * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = em.warm
          ? 'rgba(255,80,20,' + a + ')'
          : 'rgba(255,200,40,' + a + ')';
        ctx.shadowColor = 'rgba(255,100,0,' + a + ')';
        ctx.shadowBlur  = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      /* floating hearts */
      hearts.forEach(function (h) {
        h.life += 1 / h.maxLife;
        h.y += h.vy;
        if (h.life >= 1) { h.life = 0; h.x = rnd(0, W); h.y = H + 20; h.maxLife = rnd(120, 300); }
        var a = h.alpha * Math.sin(h.life * Math.PI);
        drawHeart(h.x, h.y, h.size, a, false);
      });

      /* center heartbeat */
      var beat  = Math.abs(Math.sin(t * 0.055));
      var beat2 = Math.abs(Math.sin(t * 0.055 - 0.18));
      var dub   = Math.max(beat, beat2 * 0.7);
      drawHeart(W * 0.5, H * 0.52, 18 + dub * 12, 0.12 + dub * 0.25, true);

      requestAnimationFrame(tick);
    }
    tick();

    /* ---- TYPEWRITER ---- */
    var idx = 0;
    function typeNext() {
      if (idx < name.length) {
        var sp = document.createElement('span');
        sp.className   = 'la-wc';
        sp.textContent = name[idx] === ' ' ? ' ' : name[idx];
        titleEl.appendChild(sp);
        idx++;
        setTimeout(typeNext, 70 + Math.random() * 60);
      }
    }
    setTimeout(typeNext, 400);

  }); // end forEach

});
