/* ================================================
   FROSTMOND-ATMUNG — JS
   In den Header einfügen
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".frostmondatmung").forEach(function (el) {

    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";

    el.innerHTML =
      '<canvas class="fm-canvas"></canvas>' +
      '<div class="fm-inner">' +
        '<span class="fm-lbl">Frostmond-Atmung</span>' +
        '<div class="fm-ttl" id="fmTtl_' + Date.now() + '"></div>' +
        '<div class="fm-divider"></div>' +
        '<p class="fm-dsc">' + desc + '</p>' +
      '</div>';

    var cv      = el.querySelector('.fm-canvas');
    var titleEl = el.querySelector('.fm-ttl');
    var ctx     = cv.getContext('2d');
    var t=0, idx=0;

    function rnd(a,b){ return a+Math.random()*(b-a); }

    // Schneeflocken
    var flakes=[];
    for(var i=0;i<55;i++) flakes.push({
      x:rnd(0,600), y:rnd(-20,140),
      vy:rnd(0.2,0.8), vx:rnd(-0.2,0.2),
      size:rnd(1.5,4), alpha:rnd(0.15,0.55),
      rot:rnd(0,Math.PI*2), rotSpeed:rnd(-0.01,0.01)
    });

    // Eiskristalle
    var crystals=[];
    for(var j=0;j<18;j++) crystals.push({
      x:rnd(0,600), y:rnd(0,140),
      angle:rnd(0,Math.PI*2),
      length:rnd(8,28),
      grown:rnd(0,0.8),
      speed:rnd(0.004,0.009),
      alpha:rnd(0.25,0.65)
    });

    // Frost-Partikel
    var frostParts=[];
    for(var k=0;k<80;k++) frostParts.push({
      x:rnd(0,600), y:rnd(0,140),
      vx:rnd(-0.3,0.3), vy:rnd(-0.2,0.1),
      size:rnd(0.3,1.5), alpha:rnd(0.1,0.4)
    });

    function drawMoon(W,H){
      var mx=W-70, my=H*.42, moonR=55;
      var og=ctx.createRadialGradient(mx,my,0,mx,my,moonR*2.2);
      og.addColorStop(0,'rgba(80,160,255,0.18)');
      og.addColorStop(.4,'rgba(40,100,200,0.10)');
      og.addColorStop(.75,'rgba(20,60,150,0.05)');
      og.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=og; ctx.beginPath(); ctx.arc(mx,my,moonR*2.2,0,Math.PI*2); ctx.fill();
      var mg=ctx.createRadialGradient(mx-moonR*.25,my-moonR*.25,moonR*.1,mx,my,moonR);
      mg.addColorStop(0,'rgba(200,230,255,0.35)');
      mg.addColorStop(.35,'rgba(120,180,255,0.25)');
      mg.addColorStop(.7,'rgba(60,120,200,0.18)');
      mg.addColorStop(1,'rgba(20,60,140,0.1)');
      ctx.fillStyle=mg; ctx.beginPath(); ctx.arc(mx,my,moonR,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx,my,moonR,0,Math.PI*2);
      ctx.strokeStyle='rgba(150,200,255,'+(0.3+Math.sin(t*.03)*.1)+')';
      ctx.lineWidth=1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(mx+moonR*.35,my-moonR*.05,moonR*.88,0,Math.PI*2);
      ctx.fillStyle='rgba(2,8,20,0.92)'; ctx.fill();
      var sg=ctx.createLinearGradient(mx,my,0,H);
      sg.addColorStop(0,'rgba(80,160,255,0.08)'); sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg;
      ctx.beginPath(); ctx.moveTo(mx-moonR,my); ctx.lineTo(0,H); ctx.lineTo(mx+moonR,my); ctx.closePath(); ctx.fill();
    }

    function drawSnowflake(x,y,size,alpha,rot){
      ctx.save(); ctx.translate(x,y); ctx.rotate(rot);
      ctx.strokeStyle='rgba(180,220,255,'+alpha+')'; ctx.lineWidth=0.7;
      ctx.shadowColor='rgba(100,180,255,0.3)'; ctx.shadowBlur=2;
      for(var a=0;a<6;a++){
        ctx.save(); ctx.rotate(a*Math.PI/3);
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-size*2.5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,-size*.8); ctx.lineTo(-size*.5,-size*1.4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,-size*.8); ctx.lineTo(size*.5,-size*1.4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,-size*1.5); ctx.lineTo(-size*.4,-size*1.9); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,-size*1.5); ctx.lineTo(size*.4,-size*1.9); ctx.stroke();
        ctx.restore();
      }
      ctx.shadowBlur=0; ctx.restore();
    }

    function drawCrystal(c){
      ctx.save(); ctx.translate(c.x,c.y); ctx.rotate(c.angle);
      var len=c.length*c.grown;
      ctx.strokeStyle='rgba(100,200,255,'+c.alpha+')'; ctx.lineWidth=1.2;
      ctx.shadowColor='rgba(50,150,255,0.5)'; ctx.shadowBlur=5;
      ctx.beginPath(); ctx.moveTo(0,-len); ctx.lineTo(0,len); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-len*.45,-len*.3); ctx.lineTo(len*.45,len*.3); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-len*.45,len*.3); ctx.lineTo(len*.45,-len*.3); ctx.stroke();
      ctx.beginPath(); ctx.arc(0,-len,1.5,0,Math.PI*2);
      ctx.fillStyle='rgba(200,240,255,'+(c.alpha*.8)+')'; ctx.fill();
      ctx.shadowBlur=0; ctx.restore();
    }

    function draw(){
      cv.width=el.offsetWidth||500; cv.height=el.offsetHeight||130;
      var W=cv.width, H=cv.height;
      ctx.clearRect(0,0,W,H); t++;

      var bg=ctx.createRadialGradient(W*.6,H*.4,0,W*.6,H*.4,W*.7);
      bg.addColorStop(0,'rgba(20,50,120,'+(0.12+Math.sin(t*.03)*.05)+')');
      bg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      drawMoon(W,H);

      frostParts.forEach(function(p){
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle='rgba(150,220,255,'+p.alpha+')'; ctx.fill();
      });

      crystals.forEach(function(c){
        c.grown+=c.speed;
        if(c.grown>1){ c.grown=0; c.x=rnd(0,W); c.y=rnd(0,H); }
        drawCrystal(c);
      });

      flakes.forEach(function(f){
        f.y+=f.vy; f.x+=f.vx; f.rot+=f.rotSpeed;
        if(f.y>H+10){ f.y=-10; f.x=rnd(0,W); }
        drawSnowflake(f.x,f.y,f.size,f.alpha,f.rot);
      });

      var ft=ctx.createLinearGradient(0,0,0,30);
      ft.addColorStop(0,'rgba(100,180,255,'+(0.12+Math.sin(t*.04)*.05)+')');
      ft.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ft; ctx.fillRect(0,0,W,30);

      var fb=ctx.createLinearGradient(0,H-25,0,H);
      fb.addColorStop(0,'rgba(0,0,0,0)');
      fb.addColorStop(1,'rgba(60,130,200,'+(0.15+Math.sin(t*.05)*.05)+')');
      ctx.fillStyle=fb; ctx.fillRect(0,H-25,W,25);

      requestAnimationFrame(draw);
    }
    draw();

    // Typewriter
    function typeNext(){
      if(idx<name.length){
        var sp=document.createElement('span');
        sp.className='fm-wc'; sp.style.animationDelay='0s';
        sp.textContent=name[idx]===' '?'\u00a0':name[idx];
        sp.style.color='#aaddff';
        titleEl.appendChild(sp);
        idx++;
        setTimeout(typeNext,80+Math.random()*60);
      }
    }
    setTimeout(typeNext,400);
  });
});
