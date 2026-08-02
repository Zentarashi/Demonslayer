document.addEventListener('DOMContentLoaded', function(){
  var blocks = document.querySelectorAll('.windatmung');

  blocks.forEach(function(block){
    var raw = block.textContent.trim();
    var parts = raw.split('|');
    var titleText = (parts[0] || '').trim();
    var descText = (parts.slice(1).join('|') || '').trim();

    block.innerHTML =
      '<canvas class="wa-canvas"></canvas>' +
      '<div class="wa-corner wa-corner-tl"><svg viewBox="0 0 74 74"><path d="M4,40 Q4,4 40,4 M4,50 Q4,20 34,10 M4,60 Q4,34 24,20"/></svg></div>' +
      '<div class="wa-corner wa-corner-br"><svg viewBox="0 0 74 74"><path d="M4,40 Q4,4 40,4 M4,50 Q4,20 34,10 M4,60 Q4,34 24,20"/></svg></div>' +
      '<div class="wa-content">' +
        '<div class="wa-label">Windatmung</div>' +
        '<div class="wa-title"><span class="wa-title-text"></span><span class="wa-caret"></span></div>' +
        '<div class="wa-divider"></div>' +
        '<div class="wa-desc">' + descText + '</div>' +
      '</div>' +
      '<div class="wa-current"></div>';

    // Typewriter
    var titleEl = block.querySelector('.wa-title-text');
    var i = 0;
    (function typeChar(){
      if(i <= titleText.length){
        titleEl.textContent = titleText.slice(0, i);
        i++;
        setTimeout(typeChar, 45);
      }
    })();

    // Canvas-Animation: Wind-Streaks, Twister, Blätter
    var canvas = block.querySelector('.wa-canvas');
    var ctx = canvas.getContext('2d');

    function resize(){
      canvas.width = block.clientWidth;
      canvas.height = block.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var streaks = [];
    for(var i2=0; i2<26; i2++){
      streaks.push({
        x:Math.random(), y:Math.random(),
        len:40+Math.random()*90,
        speed:0.006+Math.random()*0.010,
        alpha:0.08+Math.random()*0.18,
        width:0.6+Math.random()*1.4
      });
    }

    function drawStreaks(){
      streaks.forEach(function(s){
        s.x += s.speed;
        if(s.x > 1.15){ s.x = -0.15; s.y = Math.random(); }
        var x = s.x*canvas.width;
        var y = s.y*canvas.height;
        var dx = s.len, dy = -s.len*0.28;
        var grad = ctx.createLinearGradient(x, y, x+dx, y+dy);
        grad.addColorStop(0, 'rgba(217,232,208,0)');
        grad.addColorStop(0.5, 'rgba(217,232,208,'+s.alpha+')');
        grad.addColorStop(1, 'rgba(217,232,208,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x+dx*0.5, y+dy*0.5-8, x+dx, y+dy);
        ctx.stroke();
      });
    }

    var twist = [];
    for(var t=0; t<50; t++){
      twist.push({
        angle:Math.random()*Math.PI*2,
        radius:4+Math.random()*70,
        heightOffset:Math.random(),
        speed:0.02+Math.random()*0.03,
        r:0.8+Math.random()*1.6
      });
    }

    function drawTwister(){
      var cx = canvas.width*0.22, cyBase = canvas.height*0.75;
      twist.forEach(function(p){
        p.angle += p.speed;
        p.heightOffset -= 0.0035;
        if(p.heightOffset < 0) p.heightOffset = 1;
        var h = p.heightOffset;
        var rad = p.radius * (1-h*0.6);
        var x = cx + Math.cos(p.angle)*rad;
        var y = cyBase - h*90;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(233,242,228,'+(0.15+0.25*(1-h))+')';
        ctx.arc(x, y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
    }

    var leaves = [];
    for(var l=0; l<8; l++){
      leaves.push({
        x:Math.random(), y:Math.random(),
        speed:0.0015+Math.random()*0.0018,
        rot:Math.random()*Math.PI*2,
        rotSpeed:(Math.random()-0.5)*0.05,
        size:6+Math.random()*6,
        alpha:0.35+Math.random()*0.35
      });
    }

    function drawLeaves(){
      leaves.forEach(function(lf){
        lf.x += lf.speed;
        lf.rot += lf.rotSpeed;
        if(lf.x > 1.1){ lf.x = -0.1; lf.y = Math.random(); }
        ctx.save();
        ctx.translate(lf.x*canvas.width, lf.y*canvas.height + Math.sin(lf.x*10)*10);
        ctx.rotate(lf.rot);
        ctx.fillStyle = 'rgba(159,191,174,'+lf.alpha+')';
        ctx.beginPath();
        ctx.ellipse(0,0, lf.size, lf.size*0.5, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
      });
    }

    function tick(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawStreaks();
      drawTwister();
      drawLeaves();
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
});