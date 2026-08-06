document.addEventListener('DOMContentLoaded', function(){
  var blocks = document.querySelectorAll('.nebelatmung');

  blocks.forEach(function(block){
    var raw = block.textContent.trim();
    var parts = raw.split('|');
    var titleText = (parts[0] || '').trim();
    var descText = (parts.slice(1).join('|') || '').trim();

    block.innerHTML =
      '<canvas class="na-canvas"></canvas>' +
      '<div class="na-silhouette"><svg viewBox="0 0 800 110" preserveAspectRatio="none">' +
      '<path d="M0,110 L0,80 L120,80 L140,40 L160,80 L260,80 L260,20 L266,20 L266,80 L340,80 L340,10 L346,10 L346,80 L420,80 L440,55 L460,80 L800,80 L800,110 Z"/>' +
      '</svg></div>' +
      '<div class="na-corner na-corner-tl"><svg viewBox="0 0 70 70"><path d="M2,30 Q2,2 30,2 M10,50 Q10,20 50,10"/></svg></div>' +
      '<div class="na-corner na-corner-br"><svg viewBox="0 0 70 70"><path d="M2,30 Q2,2 30,2 M10,50 Q10,20 50,10"/></svg></div>' +
      '<div class="na-content">' +
        '<div class="na-label">Nebelatmung</div>' +
        '<div class="na-title"><span class="na-title-text"></span><span class="na-caret"></span></div>' +
        '<div class="na-divider"></div>' +
        '<div class="na-desc">' + descText + '</div>' +
      '</div>' +
      '<div class="na-fog-bottom"></div>';

    // Typewriter
    var titleEl = block.querySelector('.na-title-text');
    var i = 0;
    (function typeChar(){
      if(i <= titleText.length){
        titleEl.textContent = titleText.slice(0, i);
        i++;
        setTimeout(typeChar, 45);
      }
    })();

    // Canvas-Animation (Nebelschichten, Wirbel, Sparks) — pro Block eigene Instanz
    var canvas = block.querySelector('.na-canvas');
    var ctx = canvas.getContext('2d');

    function resize(){
      canvas.width = block.clientWidth;
      canvas.height = block.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var layers = [
      {y:0.15, speed:0.10, alpha:0.10, h:90, dir:1},
      {y:0.35, speed:0.06, alpha:0.14, h:110, dir:-1},
      {y:0.55, speed:0.08, alpha:0.10, h:100, dir:1},
      {y:0.78, speed:0.05, alpha:0.16, h:120, dir:-1}
    ];
    var offsets = layers.map(function(){ return Math.random()*1000; });

    var vortex = [];
    for(var v=0; v<70; v++){
      vortex.push({
        angle: Math.random()*Math.PI*2,
        radius: 10 + Math.random()*120,
        speed: 0.0015 + Math.random()*0.0025,
        r: 1 + Math.random()*2.4,
        alpha: 0.05 + Math.random()*0.12,
        wobble: Math.random()*Math.PI*2
      });
    }

    var sparks = [];
    for(var s=0; s<14; s++){
      sparks.push({
        x:Math.random(), y:1+Math.random()*0.3,
        r:0.6+Math.random()*1.2,
        speed:0.0008+Math.random()*0.0012,
        phase:Math.random()*Math.PI*2
      });
    }

    function drawFogLayer(layer, offset){
      var w = canvas.width, h = canvas.height;
      var cy = layer.y*h;
      var grad = ctx.createLinearGradient(0, cy-layer.h/2, 0, cy+layer.h/2);
      grad.addColorStop(0,'rgba(184,222,216,0)');
      grad.addColorStop(0.5,'rgba(184,222,216,'+layer.alpha+')');
      grad.addColorStop(1,'rgba(184,222,216,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      var step = 24;
      ctx.moveTo(0, cy);
      for(var x=0;x<=w+step;x+=step){
        var yOff = Math.sin((x*0.01)+offset)*10 + Math.sin((x*0.004)+offset*1.7)*16;
        ctx.lineTo(x, cy+yOff);
      }
      ctx.lineTo(w, cy+layer.h);
      ctx.lineTo(0, cy+layer.h);
      ctx.closePath();
      ctx.fill();
    }

    function drawVortex(t){
      var cx = canvas.width*0.78, cy = canvas.height*0.32;
      vortex.forEach(function(p){
        p.angle += p.speed;
        var wob = Math.sin(t*0.0006 + p.wobble)*6;
        var x = cx + Math.cos(p.angle)*(p.radius+wob);
        var y = cy + Math.sin(p.angle)*(p.radius+wob)*0.55;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(184,222,216,'+p.alpha+')';
        ctx.filter = 'blur(1.5px)';
        ctx.arc(x, y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.filter = 'none';
    }

    function tick(t){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      layers.forEach(function(layer, idx){
        offsets[idx] += layer.speed*layer.dir*0.02;
        drawFogLayer(layer, offsets[idx]);
      });
      drawVortex(t);
      sparks.forEach(function(sp){
        sp.y -= sp.speed;
        if(sp.y < -0.05){ sp.y = 1+Math.random()*0.1; sp.x = Math.random(); }
        var flicker = 0.3 + 0.3*Math.sin(t*0.002 + sp.phase);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(184,222,216,'+flicker.toFixed(2)+')';
        ctx.shadowColor = 'rgba(184,222,216,0.8)';
        ctx.shadowBlur = 6;
        ctx.arc(sp.x*canvas.width, sp.y*canvas.height, sp.r, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
});
