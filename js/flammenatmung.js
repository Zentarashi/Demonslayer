document.addEventListener('DOMContentLoaded', function(){
  var blocks = document.querySelectorAll('.flammenatmung');

  blocks.forEach(function(block){
    var raw = block.textContent.trim();
    var parts = raw.split('|');
    var titleText = (parts[0] || '').trim();
    var descText = (parts.slice(1).join('|') || '').trim();

    block.innerHTML =
      '<canvas class="fa-canvas"></canvas>' +
      '<div class="fa-corner fa-corner-tl"><svg viewBox="0 0 76 76"><path d="M4,40 Q4,4 40,4 M10,50 Q10,26 30,14 M16,58 Q16,40 28,28"/></svg></div>' +
      '<div class="fa-corner fa-corner-br"><svg viewBox="0 0 76 76"><path d="M4,40 Q4,4 40,4 M10,50 Q10,26 30,14 M16,58 Q16,40 28,28"/></svg></div>' +
      '<div class="fa-content">' +
        '<div class="fa-label">Flammenatmung</div>' +
        '<div class="fa-title"><span class="fa-title-text"></span><span class="fa-caret"></span></div>' +
        '<div class="fa-divider"></div>' +
        '<div class="fa-desc">' + descText + '</div>' +
      '</div>';

    // Typewriter
    var titleEl = block.querySelector('.fa-title-text');
    var i = 0;
    (function typeChar(){
      if(i <= titleText.length){
        titleEl.textContent = titleText.slice(0, i);
        i++;
        setTimeout(typeChar, 45);
      }
    })();

    // Canvas: Partikel-Flamme + Glutfunken
    var canvas = block.querySelector('.fa-canvas');
    var ctx = canvas.getContext('2d');

    function resize(){
      canvas.width = block.clientWidth;
      canvas.height = block.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var flames = [];
    var maxFlames = 420;

    function spawnFlame(burst){
      var w = canvas.width, h = canvas.height;
      flames.push({
        x: w*0.5 + (Math.random()-0.5)*w*0.85,
        y: h + Math.random()*10,
        vy: (burst ? 1.8+Math.random()*1.5 : 0.8+Math.random()*0.8),
        drift: (Math.random()-0.5)*0.7,
        life: 0,
        maxLife: burst ? 60+Math.random()*30 : 45+Math.random()*35,
        size: burst ? 30+Math.random()*24 : 16+Math.random()*22,
        wobble: Math.random()*Math.PI*2
      });
    }

    for(var f0=0; f0<260; f0++) spawnFlame(false);

    var burstTimer = 0;

    function drawFlames(t){
      burstTimer++;
      if(burstTimer > 90){
        for(var b=0; b<50; b++) spawnFlame(true);
        burstTimer = 0;
      }
      for(var sp=0; sp<6; sp++){
        if(flames.length < maxFlames) spawnFlame(false);
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      flames.forEach(function(p){
        p.life++;
        p.y -= p.vy;
        p.x += p.drift + Math.sin(t*0.002 + p.wobble)*0.6;

        var progress = p.life / p.maxLife;
        if(progress >= 1) return;

        var size = p.size * (1 - progress*0.75);
        var alpha = (1-progress) * 0.5;

        var r, g, bch;
        if(progress < 0.35){
          r = 217; g = Math.round(40 + progress/0.35*80); bch = 10;
        } else if(progress < 0.7){
          var pp = (progress-0.35)/0.35;
          r = Math.round(217 + pp*38); g = Math.round(120 + pp*80); bch = Math.round(10 + pp*20);
        } else {
          var pp2 = (progress-0.7)/0.3;
          r = 255; g = Math.round(200 + pp2*40); bch = Math.round(30 + pp2*140);
        }

        var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        grad.addColorStop(0, 'rgba('+r+','+g+','+bch+','+alpha+')');
        grad.addColorStop(1, 'rgba('+r+','+g+','+bch+',0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI*2);
        ctx.fill();
      });

      flames = flames.filter(function(p){ return p.life < p.maxLife && p.y > -30; });
      ctx.restore();
    }

    var embers = [];
    for(var e=0; e<48; e++){
      embers.push({
        x:Math.random(), y:1+Math.random()*0.2,
        speed:0.001+Math.random()*0.0015,
        drift:(Math.random()-0.5)*0.0008,
        r:0.8+Math.random()*1.8,
        alpha:0.4+Math.random()*0.5,
        flick:Math.random()*Math.PI*2
      });
    }

    function drawEmbers(t){
      embers.forEach(function(p){
        p.y -= p.speed;
        p.x += p.drift + Math.sin(t*0.0015+p.flick)*0.0004;
        if(p.y < -0.05){ p.y = 1+Math.random()*0.1; p.x = Math.random(); }
        var flicker = 0.5 + 0.5*Math.sin(t*0.005+p.flick);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,'+Math.round(140+80*flicker)+',30,'+(p.alpha*flicker)+')';
        ctx.shadowColor = 'rgba(255,140,26,0.8)';
        ctx.shadowBlur = 5;
        ctx.arc(p.x*canvas.width, p.y*canvas.height, p.r, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    function tick(t){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawFlames(t);
      drawEmbers(t);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
});
