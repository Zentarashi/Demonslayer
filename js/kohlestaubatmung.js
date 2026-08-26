document.addEventListener('DOMContentLoaded', function(){
  var blocks = document.querySelectorAll('.kohlestaubatmung');

  blocks.forEach(function(block){
    var raw = block.textContent.trim();
    var parts = raw.split('|');
    var titleText = (parts[0] || '').trim();
    var descText = (parts.slice(1).join('|') || '').trim();

    block.innerHTML =
      '<canvas class="ks-canvas"></canvas>' +
      '<div class="ks-content">' +
        '<div class="ks-label">Kohlestaubatmung</div>' +
        '<div class="ks-title"><span class="ks-title-text"></span><span class="ks-caret"></span></div>' +
        '<div class="ks-divider"></div>' +
        '<div class="ks-desc">' + descText + '</div>' +
      '</div>';

    // Typewriter
    var titleEl = block.querySelector('.ks-title-text');
    var i = 0;
    (function typeChar(){
      if(i <= titleText.length){
        titleEl.textContent = titleText.slice(0, i);
        i++;
        setTimeout(typeChar, 45);
      }
    })();

    // Canvas: Staubschichten, Funken, Glanzpunkte, Kohlebrocken, Metallfetzen
    var canvas = block.querySelector('.ks-canvas');
    var ctx = canvas.getContext('2d');

    function resize(){
      canvas.width = block.clientWidth;
      canvas.height = block.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Strömungslinien
    var currents=[];
    for(var c=0;c<8;c++){
      currents.push({y:0.68+c*0.034, offset:Math.random()*1000, speed:0.15+Math.random()*0.2, alpha:0.08+Math.random()*0.1});
    }
    function drawCurrents(){
      var w=canvas.width,h=canvas.height;
      currents.forEach(function(cu){
        cu.offset+=cu.speed*0.02;
        ctx.beginPath();
        var step=16;
        for(var x=0;x<=w+step;x+=step){
          var y=cu.y*h+Math.sin((x*0.02)+cu.offset)*6+Math.sin((x*0.006)+cu.offset*1.4)*10;
          x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.strokeStyle='rgba(120,140,155,'+cu.alpha+')';
        ctx.lineWidth=1.2; ctx.stroke();
      });
    }

    // Dreischichtiges Staubsystem über die gesamte Fläche
    var layerDefs=[
      {count:40, rMin:24, rMax:60, alpha:0.05, speed:0.0003, yRange:[0.05,0.95]},
      {count:35, rMin:14, rMax:34, alpha:0.09, speed:0.0006, yRange:[0.1,0.95]},
      {count:30, rMin:6, rMax:16, alpha:0.13, speed:0.0011, yRange:[0.15,0.98]}
    ];
    var layers = layerDefs.map(function(def){
      var arr=[];
      for(var i2=0;i2<def.count;i2++){
        arr.push({
          x:Math.random(),
          y:def.yRange[0]+Math.random()*(def.yRange[1]-def.yRange[0]),
          r:def.rMin+Math.random()*(def.rMax-def.rMin),
          speed:def.speed*(0.7+Math.random()*0.6),
          alpha:def.alpha*(0.7+Math.random()*0.6)
        });
      }
      return arr;
    });
    function drawLayers(){
      layers.forEach(function(layer){
        layer.forEach(function(p){
          p.x += p.speed;
          if(p.x>1.15) p.x=-0.15;
          var grad=ctx.createRadialGradient(p.x*canvas.width,p.y*canvas.height,0, p.x*canvas.width,p.y*canvas.height,p.r);
          grad.addColorStop(0,'rgba(40,44,50,'+p.alpha+')');
          grad.addColorStop(1,'rgba(40,44,50,0)');
          ctx.fillStyle=grad;
          ctx.beginPath();
          ctx.arc(p.x*canvas.width,p.y*canvas.height,p.r,0,Math.PI*2);
          ctx.fill();
        });
      });
    }

    // Kreisende Glutfunken-Bahnen
    var orbitEmbers=[];
    for(var oe=0; oe<26; oe++){
      orbitEmbers.push({
        cx:Math.random(), cy:0.25+Math.random()*0.6,
        r:0.02+Math.random()*0.08,
        angle:Math.random()*Math.PI*2,
        speed:0.008+Math.random()*0.014,
        size:0.8+Math.random()*1.6,
        alpha:0.35+Math.random()*0.35
      });
    }
    function drawOrbitEmbers(){
      orbitEmbers.forEach(function(e){
        e.angle+=e.speed;
        var x=(e.cx+Math.cos(e.angle)*e.r)*canvas.width;
        var y=(e.cy+Math.sin(e.angle)*e.r*0.6)*canvas.height;
        ctx.beginPath();
        ctx.fillStyle='rgba(190,140,105,'+e.alpha+')';
        ctx.shadowColor='rgba(210,160,120,0.8)'; ctx.shadowBlur=6;
        ctx.arc(x,y,e.size,0,Math.PI*2); ctx.fill();
        ctx.shadowBlur=0;
      });
    }

    // Zahlreiche Glutfunken, die permanent im Staub aufglühen
    var embers=[];
    for(var e2=0;e2<70;e2++){
      embers.push({
        x:Math.random(), y:0.6+Math.random()*0.38,
        vx:0.0007+Math.random()*0.0014,
        vy:-0.0003-Math.random()*0.0008,
        r:0.9+Math.random()*2.1,
        phase:Math.random()*Math.PI*2,
        speed:0.002+Math.random()*0.004
      });
    }
    function drawEmbers(t){
      embers.forEach(function(p){
        p.x+=p.vx; p.y+=p.vy;
        if(p.x>1.05 || p.y<0.35){ p.x=-0.02; p.y=0.6+Math.random()*0.38; }
        var flick=0.4+0.6*Math.max(0,Math.sin(t*p.speed+p.phase));
        ctx.beginPath();
        ctx.fillStyle='rgba(200,150,110,'+(0.6*flick)+')';
        ctx.shadowColor='rgba(220,170,130,0.9)'; ctx.shadowBlur=7;
        ctx.arc(p.x*canvas.width,p.y*canvas.height,p.r,0,Math.PI*2); ctx.fill();
        ctx.shadowBlur=0;
      });
    }

    // Glanzpunkte
    var glints=[];
    function spawnGlint(){
      glints.push({
        x:Math.random(), y:0.2+Math.random()*0.75,
        life:0, maxLife:14+Math.random()*10,
        r:0.8+Math.random()*1.6
      });
    }
    function drawGlints(){
      if(Math.random()<0.5) spawnGlint();
      glints.forEach(function(g){
        g.life++;
        var p = g.life/g.maxLife;
        var alpha = p<0.3 ? p/0.3 : 1-((p-0.3)/0.7);
        ctx.beginPath();
        ctx.fillStyle='rgba(210,220,228,'+(alpha*0.6)+')';
        ctx.shadowColor='rgba(220,230,238,0.9)'; ctx.shadowBlur=5;
        ctx.arc(g.x*canvas.width, g.y*canvas.height, g.r, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur=0;
      });
      glints = glints.filter(function(g){return g.life<g.maxLife;});
    }

    // Fliegende Kohlebrocken
    var chunks=[];
    function makeChunkShape(){
      var pts=[];
      var n=6+Math.floor(Math.random()*3);
      for(var i3=0;i3<n;i3++){
        var a=(i3/n)*Math.PI*2;
        var r=3+Math.random()*4;
        pts.push({x:Math.cos(a)*r, y:Math.sin(a)*r});
      }
      return pts;
    }
    function spawnChunk(){
      var fromLeft = Math.random()<0.5;
      chunks.push({
        x: fromLeft ? -0.06 : 1.06,
        y: 0.25+Math.random()*0.55,
        vx: (fromLeft?1:-1)*(0.0009+Math.random()*0.0013),
        vy:(Math.random()-0.5)*0.0006,
        rot:Math.random()*Math.PI*2,
        rotSpeed:(Math.random()-0.5)*0.08,
        scale:1.4+Math.random()*2.2,
        shape:makeChunkShape(),
        life:0, maxLife:260+Math.random()*160
      });
    }
    for(var ci=0;ci<5;ci++) spawnChunk();
    function drawChunks(){
      if(chunks.length<10 && Math.random()<0.02) spawnChunk();
      chunks.forEach(function(c){
        c.life++; c.x+=c.vx; c.y+=c.vy; c.rot+=c.rotSpeed;
        var px=c.x*canvas.width, py=c.y*canvas.height;
        ctx.save();
        ctx.translate(px,py);
        ctx.rotate(c.rot);
        ctx.scale(c.scale,c.scale);
        ctx.beginPath();
        c.shape.forEach(function(p,i4){ i4===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y); });
        ctx.closePath();
        ctx.fillStyle='rgba(18,17,16,0.92)';
        ctx.fill();
        ctx.strokeStyle='rgba(70,66,62,0.5)';
        ctx.lineWidth=0.5;
        ctx.stroke();
        ctx.restore();
      });
      chunks = chunks.filter(function(c){ return c.life<c.maxLife && c.x>-0.12 && c.x<1.12; });
    }

    // Fliegende Metallfetzen
    var shards=[];
    function spawnShard(){
      var fromLeft = Math.random()<0.5;
      shards.push({
        x: fromLeft ? -0.06 : 1.06,
        y: 0.28+Math.random()*0.5,
        vx: (fromLeft?1:-1)*(0.0013+Math.random()*0.0016),
        vy:(Math.random()-0.5)*0.0007,
        rot:Math.random()*Math.PI*2,
        rotSpeed:(Math.random()-0.5)*0.16,
        len:6+Math.random()*8,
        life:0, maxLife:180+Math.random()*120
      });
    }
    for(var si=0;si<4;si++) spawnShard();
    function drawShards(t){
      if(shards.length<8 && Math.random()<0.015) spawnShard();
      shards.forEach(function(s){
        s.life++; s.x+=s.vx; s.y+=s.vy; s.rot+=s.rotSpeed;
        var px=s.x*canvas.width, py=s.y*canvas.height;
        var glint = 0.4+0.6*Math.max(0,Math.sin(t*0.006+s.rot*3));
        ctx.save();
        ctx.translate(px,py);
        ctx.rotate(s.rot);
        ctx.beginPath();
        ctx.moveTo(-s.len*0.5,-1.2);
        ctx.lineTo(s.len*0.5,0);
        ctx.lineTo(-s.len*0.5,1.2);
        ctx.closePath();
        ctx.fillStyle='rgba('+Math.round(120+glint*100)+','+Math.round(128+glint*100)+','+Math.round(135+glint*100)+','+(0.55+glint*0.35)+')';
        ctx.shadowColor='rgba(220,230,238,0.9)';
        ctx.shadowBlur = glint*6;
        ctx.fill();
        ctx.shadowBlur=0;
        ctx.restore();
      });
      shards = shards.filter(function(s){ return s.life<s.maxLife && s.x>-0.12 && s.x<1.12; });
    }

    function tick(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      var t = performance.now();
      drawCurrents();
      drawLayers();
      drawOrbitEmbers();
      drawEmbers(t);
      drawGlints();
      drawChunks();
      drawShards(t);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
});
