document.addEventListener('DOMContentLoaded', function(){
  var blocks = document.querySelectorAll('.klangatmung');

  blocks.forEach(function(block){
    var raw = block.textContent.trim();
    var parts = raw.split('|');
    var titleText = (parts[0] || '').trim();
    var descText = (parts.slice(1).join('|') || '').trim();

    block.innerHTML =
      '<canvas class="ka-canvas"></canvas>' +
      '<div class="ka-rays"><svg viewBox="0 0 600 600"><g class="ka-ray-group"></g></svg></div>' +
      '<div class="ka-corner ka-corner-tl"><svg viewBox="0 0 78 78"><path d="M4,40 L4,20 Q4,4 20,4 L40,4 M4,40 L4,60 M20,4 L45,4 M4,52 L18,52 M4,60 L14,60"/></svg></div>' +
      '<div class="ka-corner ka-corner-br"><svg viewBox="0 0 78 78"><path d="M4,40 L4,20 Q4,4 20,4 L40,4 M4,40 L4,60 M20,4 L45,4 M4,52 L18,52 M4,60 L14,60"/></svg></div>' +
      '<div class="ka-content">' +
        '<div class="ka-label">Klangatmung</div>' +
        '<div class="ka-title"><span class="ka-title-text"></span><span class="ka-caret"></span></div>' +
        '<div class="ka-divider"></div>' +
        '<div class="ka-desc">' + descText + '</div>' +
      '</div>' +
      '<div class="ka-eq"></div>';

    // Equalizer-Balken erzeugen
    var eq = block.querySelector('.ka-eq');
    for(var e=0; e<28; e++){
      var bar = document.createElement('span');
      bar.style.animationDelay = (Math.random()*1.1).toFixed(2)+'s';
      bar.style.height = (30 + Math.random()*70)+'%';
      eq.appendChild(bar);
    }

    // Strahlenkranz erzeugen
    var rayGroup = block.querySelector('.ka-ray-group');
    var rayCount = 24;
    for(var r=0; r<rayCount; r++){
      var angle = (r/rayCount)*Math.PI*2;
      var x1 = 300 + Math.cos(angle)*120;
      var y1 = 300 + Math.sin(angle)*120;
      var x2 = 300 + Math.cos(angle)*290;
      var y2 = 300 + Math.sin(angle)*290;
      var line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1',x1); line.setAttribute('y1',y1);
      line.setAttribute('x2',x2); line.setAttribute('y2',y2);
      rayGroup.appendChild(line);
    }

    // Typewriter
    var titleEl = block.querySelector('.ka-title-text');
    var i = 0;
    (function typeChar(){
      if(i <= titleText.length){
        titleEl.textContent = titleText.slice(0, i);
        i++;
        setTimeout(typeChar, 45);
      }
    })();

    // Canvas-Animation: Schockwellen-Ringe + Musiknoten
    var canvas = block.querySelector('.ka-canvas');
    var ctx = canvas.getContext('2d');

    function resize(){
      canvas.width = block.clientWidth;
      canvas.height = block.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var rings = [];
    var ringTimer = 0;
    function spawnRing(){ rings.push({r:0, alpha:0.5}); }
    spawnRing();

    function drawRings(){
      var cx = canvas.width*0.5, cy = canvas.height*0.42;
      rings.forEach(function(ring){
        ring.r += 1.6;
        ring.alpha -= 0.0055;
        if(ring.alpha > 0){
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(244,197,66,'+Math.max(ring.alpha,0)+')';
          ctx.lineWidth = 1.5;
          ctx.arc(cx, cy, ring.r, 0, Math.PI*2);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(195,65,217,'+Math.max(ring.alpha*0.7,0)+')';
          ctx.lineWidth = 1;
          ctx.arc(cx, cy, ring.r*0.85, 0, Math.PI*2);
          ctx.stroke();
        }
      });
      rings = rings.filter(function(ring){ return ring.alpha > 0; });
    }

    var notes = ['♪','♫','♬'];
    var particles = [];
    for(var n=0; n<10; n++){
      particles.push({
        x:Math.random(), y:1+Math.random()*0.4,
        speed:0.0009+Math.random()*0.0011,
        drift:(Math.random()-0.5)*0.0006,
        char:notes[Math.floor(Math.random()*notes.length)],
        size:14+Math.random()*10,
        rot:Math.random()*Math.PI*2,
        rotSpeed:(Math.random()-0.5)*0.02,
        alpha:0.5+Math.random()*0.4
      });
    }

    function drawNotes(){
      particles.forEach(function(p){
        p.y -= p.speed;
        p.x += p.drift;
        p.rot += p.rotSpeed;
        if(p.y < -0.05){
          p.y = 1+Math.random()*0.1;
          p.x = Math.random();
          p.char = notes[Math.floor(Math.random()*notes.length)];
        }
        ctx.save();
        ctx.translate(p.x*canvas.width, p.y*canvas.height);
        ctx.rotate(p.rot);
        ctx.font = p.size+'px sans-serif';
        ctx.fillStyle = 'rgba(244,197,66,'+p.alpha+')';
        ctx.textAlign = 'center';
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });
    }

    function tick(t){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ringTimer++;
      if(ringTimer > 130){ spawnRing(); ringTimer = 0; }
      drawRings();
      drawNotes();
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
});