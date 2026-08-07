/* ================================================
   WASSERATMUNG — JS
   In den Header einfügen
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".wasseratmung").forEach(function (el) {

    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";

    el.innerHTML =
      '<div class="drops"></div>' +
      '<canvas class="wave-canvas"></canvas>' +
      '<div class="tech-label">Wasseratmung</div>' +
      '<div class="tech-title"><span class="cursor"></span></div>' +
      '<hr class="tech-line">' +
      '<div class="tech-desc">' + desc + '</div>';

    /* Tropfen */
    var dCont = el.querySelector('.drops');
    for(var i=0;i<22;i++){
      var d=document.createElement('div'); d.className='drop';
      d.style.height=(8+Math.random()*20)+'px';
      d.style.left=(Math.random()*100)+'%';
      d.style.animationDuration=(1.2+Math.random()*2.5)+'s';
      d.style.animationDelay=(Math.random()*4)+'s';
      if(Math.random()>.5) d.style.width='3px';
      dCont.appendChild(d);
    }

    /* Typewriter */
    var titleEl=el.querySelector('.tech-title');
    var idx=0;
    function typeNext(){
      if(idx<=name.length){
        titleEl.innerHTML=name.slice(0,idx)+'<span class="cursor"></span>';
        idx++; setTimeout(typeNext,70+Math.random()*60);
      }
    }
    setTimeout(typeNext,400);

    /* Wellen Canvas */
    var canvas=el.querySelector('.wave-canvas');
    var ctx=canvas.getContext('2d');
    var waves=[]; var splashParticles=[]; var t=0; var frameCount=0; var lastSpawnFrame=0;

    function spawnWave(offsetX){
      waves.push({
        x: offsetX!==undefined ? offsetX : -120,
        speed: 2.8+Math.random()*1.2,
        height: 7+Math.random()*6,
        width: 130+Math.random()*50,
        phase: Math.random()*Math.PI*2,
        alpha: 0, crashed: false
      });
    }

    spawnWave(-120);
    spawnWave(-350);

    function spawnSplash(x){
      for(var i=0;i<14;i++){
        var angle=-Math.PI*.85+Math.random()*Math.PI*.7;
        var speed=1.5+Math.random()*2.8;
        splashParticles.push({
          x:x, y:canvas.height-12,
          vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed-1,
          life:1, size:1+Math.random()*2, alpha:0.5+Math.random()*.5
        });
      }
    }

    function drawFrame(){
      canvas.width=el.offsetWidth; canvas.height=65;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      t+=0.022; frameCount++;
      var W=canvas.width, H=canvas.height, rockX=W-55;

      var notCrashed=waves.filter(function(w){return !w.crashed;});
      if(notCrashed.length<2&&frameCount-lastSpawnFrame>80){
        spawnWave(); lastSpawnFrame=frameCount;
      }

      // Fels
      ctx.beginPath();
      ctx.moveTo(rockX-10,H); ctx.lineTo(rockX-5,H-28);
      ctx.bezierCurveTo(rockX+5,H-38,rockX+15,H-42,rockX+22,H-35);
      ctx.bezierCurveTo(rockX+30,H-28,rockX+35,H-40,rockX+42,H-38);
      ctx.bezierCurveTo(rockX+50,H-36,rockX+55,H-30,rockX+58,H-20);
      ctx.lineTo(rockX+60,H); ctx.closePath();
      var rg=ctx.createLinearGradient(rockX,H-42,rockX+60,H);
      rg.addColorStop(0,'#1a2a2e'); rg.addColorStop(.3,'#0f1e22');
      rg.addColorStop(.7,'#0a1518'); rg.addColorStop(1,'#060e10');
      ctx.fillStyle=rg; ctx.fill();
      ctx.beginPath(); ctx.moveTo(rockX-3,H-26); ctx.bezierCurveTo(rockX+8,H-36,rockX+18,H-40,rockX+25,H-33);
      ctx.strokeStyle='rgba(0,180,220,0.18)'; ctx.lineWidth=2; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rockX+30,H-27); ctx.bezierCurveTo(rockX+38,H-38,rockX+44,H-37,rockX+50,H-30);
      ctx.strokeStyle='rgba(0,150,190,0.12)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rockX+5,H-18); ctx.lineTo(rockX+18,H-15); ctx.lineTo(rockX+30,H-18);
      ctx.strokeStyle='rgba(0,80,60,0.35)'; ctx.lineWidth=2; ctx.stroke();

      // Hintergrundwasser
      ctx.beginPath();
      for(var px=0;px<=rockX;px+=2){
        var by=H-10+Math.sin(px*.04+t*.7)*2+Math.sin(px*.02-t*.5)*1.2;
        if(px===0) ctx.moveTo(px,by); else ctx.lineTo(px,by);
      }
      ctx.lineTo(rockX,H); ctx.lineTo(0,H); ctx.closePath();
      var bg=ctx.createLinearGradient(0,H-20,0,H);
      bg.addColorStop(0,'rgba(0,170,204,0.15)'); bg.addColorStop(1,'rgba(0,80,120,0.40)');
      ctx.fillStyle=bg; ctx.fill();

      // Wellen
      for(var wi=waves.length-1;wi>=0;wi--){
        var w=waves[wi];
        w.x+=w.speed;
        if(w.alpha<1&&!w.crashed) w.alpha=Math.min(1,w.alpha+0.05);
        var dist=rockX-w.x;
        var hm=1;
        if(dist<80&&dist>0) hm=1+(1-dist/80)*.5;
        if(w.x>rockX-5&&!w.crashed){ w.crashed=true; spawnSplash(rockX-8); }
        if(w.crashed) w.alpha-=0.04;
        if(w.alpha<=0){ waves.splice(wi,1); continue; }

        var wH=w.height*hm;
        var startX=Math.max(0,w.x-w.width);
        var endX=Math.min(rockX,w.x+25);
        if(endX<=startX) continue;

        var pts=[];
        for(var px2=startX;px2<=endX;px2+=2){
          var progress=(px2-startX)/(endX-startX+0.001);
          var env;
          if(progress<0.6){ env=Math.sin((progress/0.6)*Math.PI*0.5); }
          else { var fp=(progress-0.6)/0.4; env=Math.cos(fp*Math.PI*0.5)*(1+Math.sin(fp*Math.PI)*0.35); }
          var ripple=Math.sin(progress*Math.PI*4+w.phase)*0.7;
          pts.push({x:px2, y:H-10-env*wH+ripple});
        }
        if(pts.length<2) continue;

        ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
        for(var pi2=1;pi2<pts.length-1;pi2++){
          var mx=(pts[pi2].x+pts[pi2+1].x)/2;
          var my=(pts[pi2].y+pts[pi2+1].y)/2;
          ctx.quadraticCurveTo(pts[pi2].x,pts[pi2].y,mx,my);
        }
        ctx.lineTo(pts[pts.length-1].x,pts[pts.length-1].y);
        ctx.lineTo(endX,H); ctx.lineTo(startX,H); ctx.closePath();

        var wg=ctx.createLinearGradient(startX,0,endX,0);
        wg.addColorStop(0,  'rgba(0,150,190,'+(.04*w.alpha)+')');
        wg.addColorStop(.5, 'rgba(0,190,230,'+(.28*w.alpha)+')');
        wg.addColorStop(.8, 'rgba(0,220,255,'+(.40*w.alpha)+')');
        wg.addColorStop(1,  'rgba(180,238,255,'+(.18*w.alpha)+')');
        ctx.fillStyle=wg; ctx.fill();
      }

      // Gischt
      for(var pi3=splashParticles.length-1;pi3>=0;pi3--){
        var p=splashParticles[pi3];
        p.x+=p.vx; p.y+=p.vy; p.vy+=0.10; p.life-=0.025;
        if(p.life<=0){splashParticles.splice(pi3,1);continue;}
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle='rgba(200,245,255,'+(p.alpha*p.life)+')'; ctx.fill();
      }

      requestAnimationFrame(drawFrame);
    }
    drawFrame();
  });
});
