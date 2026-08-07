/* ================================================
   MONDATMUNG — JS
   In den Header einfügen
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".mondatmung").forEach(function (el) {

    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";

    el.innerHTML =
      '<div class="moonwave"></div>' +
      '<div class="stars"></div>' +
      '<canvas class="light-cone"></canvas>' +

      /* Staubpartikel */
      '<div class="dust" style="width:3px;height:3px;top:5%;left:2%;--dx:35px;--dy:25px;animation-duration:4s;animation-delay:0s;"></div>' +
      '<div class="dust" style="width:2px;height:2px;top:12%;left:4%;--dx:50px;--dy:18px;animation-duration:5.5s;animation-delay:0.8s;"></div>' +
      '<div class="dust" style="width:2px;height:2px;top:3%;left:6%;--dx:20px;--dy:40px;animation-duration:6s;animation-delay:1.5s;"></div>' +
      '<div class="dust" style="width:3px;height:3px;top:20%;left:1%;--dx:70px;--dy:15px;animation-duration:4.5s;animation-delay:2.2s;"></div>' +
      '<div class="dust" style="width:1px;height:1px;top:8%;left:10%;--dx:25px;--dy:45px;animation-duration:7s;animation-delay:0.5s;"></div>' +
      '<div class="dust" style="width:2px;height:2px;top:30%;left:2%;--dx:80px;--dy:10px;animation-duration:5s;animation-delay:3s;"></div>' +

      /* Eclipse */
      '<div class="eclipse-wrap">' +
        '<div class="corona"></div>' +
        '<div class="corona2"></div>' +
        '<div class="moon-body"></div>' +
        '<div class="eclipse-shadow"></div>' +
        '<div class="corona-eclipse"></div>' +
        '<div class="ray-line"></div><div class="ray-line"></div><div class="ray-line"></div><div class="ray-line"></div>' +
        '<div class="ray-line"></div><div class="ray-line"></div><div class="ray-line"></div><div class="ray-line"></div>' +
      '</div>' +

      '<div class="mist"><div class="mist-layer"></div><div class="mist-layer"></div></div>' +
      '<div class="tech-label">Mondatmung</div>' +
      '<div class="tech-title"><span class="cursor"></span></div>' +
      '<hr class="tech-line">' +
      '<div class="tech-desc">' + desc + '</div>';

    /* Sterne */
    var starsEl = el.querySelector('.stars');
    for (var i = 0; i < 30; i++) {
      var s = document.createElement('div');
      s.className = 'star';
      var sz = Math.random() > .6 ? 2 : 1;
      s.style.width  = sz + 'px';
      s.style.height = sz + 'px';
      s.style.left   = (Math.random() * 100) + '%';
      s.style.top    = (Math.random() * 100) + '%';
      s.style.animationDuration = (1.5 + Math.random() * 3.5) + 's';
      s.style.animationDelay   = (Math.random() * 5) + 's';
      starsEl.appendChild(s);
    }

    /* Canvas Lichtkegel */
    var canvas = el.querySelector('.light-cone');
    var t = 0;
    function drawBeam(alpha) {
      canvas.width  = el.offsetWidth;
      canvas.height = el.offsetHeight;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var W = canvas.width, H = canvas.height;

      var g1 = ctx.createLinearGradient(0, 0, W * .6, H);
      g1.addColorStop(0,   'rgba(176,232,226,' + (.22 * alpha) + ')');
      g1.addColorStop(.4,  'rgba(123,200,192,' + (.08 * alpha) + ')');
      g1.addColorStop(1,   'rgba(123,200,192,0)');
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(W*.7,0); ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath();
      ctx.fillStyle = g1; ctx.fill();

      var g2 = ctx.createLinearGradient(0, 0, W * .4, H);
      g2.addColorStop(0,   'rgba(208,245,240,' + (.18 * alpha) + ')');
      g2.addColorStop(.3,  'rgba(123,200,192,' + (.07 * alpha) + ')');
      g2.addColorStop(1,   'rgba(123,200,192,0)');
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(W*.42,0); ctx.lineTo(W*.72,H); ctx.lineTo(0,H); ctx.closePath();
      ctx.fillStyle = g2; ctx.fill();

      var g3 = ctx.createLinearGradient(0, 0, W * .2, H);
      g3.addColorStop(0,   'rgba(240,255,252,' + (.14 * alpha) + ')');
      g3.addColorStop(.2,  'rgba(176,232,226,' + (.06 * alpha) + ')');
      g3.addColorStop(1,   'rgba(123,200,192,0)');
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(W*.18,0); ctx.lineTo(W*.42,H); ctx.lineTo(0,H); ctx.closePath();
      ctx.fillStyle = g3; ctx.fill();
    }

    (function animateBeam() {
      t += 0.012;
      drawBeam(0.7 + 0.3 * Math.sin(t));
      requestAnimationFrame(animateBeam);
    })();

    /* Typewriter */
    var titleEl = el.querySelector('.tech-title');
    var idx = 0;
    function typeNext() {
      if (idx <= name.length) {
        titleEl.innerHTML = name.slice(0, idx) + '<span class="cursor"></span>';
        idx++;
        setTimeout(typeNext, 65 + Math.random() * 55);
      }
    }
    setTimeout(typeNext, 500);
  });

});
