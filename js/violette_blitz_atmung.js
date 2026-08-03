/* ================================================
   VIOLETTE BLITZ-ATMUNG — JS
   In den Header einfügen
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".violetteblitzatmung").forEach(function (el) {

    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";

    el.innerHTML =
      '<canvas class="vb-canvas"></canvas>' +
      '<div class="vb-inner">' +
        '<span class="vb-lbl">Violette Blitz-Atmung</span>' +
        '<div class="vb-ttl" id="vbTtl_' + Date.now() + '"></div>' +
        '<div class="vb-divider"></div>' +
        '<p class="vb-dsc">' + desc + '</p>' +
      '</div>';

    var cv      = el.querySelector('.vb-canvas');
    var titleEl = el.querySelector('.vb-ttl');
    var ctx     = cv.getContext('2d');
    var t=0, idx=0, lastBolt=0;
    var bolts=[], shockwaves=[], edgeSparks=[];

    function rnd(a,b){ return a+Math.random()*(b-a); }

    function makeBoltPath(x1,y1,x2,y2,roughness){
      var pts=[{x:x1,y:y1}];
      var steps=8+Math.floor(Math.random()*5);
      for(var i=1;i<steps;i++){
        var tt=i/steps;
        pts.push({x:x1+(x2-x1)*tt+(Math.random()-.5)*roughness, y:y1+(y2-y1)*tt+(Math.random()-.5)*roughness*.3});
      }
      pts.push({x:x2,y:y2});
      return pts;
    }

    function spawnBolt(){
      var W=cv.width, H=cv.height;
      var x=rnd(W*.1,W*.9);
      var endX=x+(Math.random()-.5)*60, endY=rnd(H*.25,H*.8);
      var pts=makeBoltPath(x,0,endX,endY,50);
      var branches=[];
      for(var b=0;b<3;b++){
        var bi=Math.floor(rnd(2,pts.length-2));
        var bp=pts[bi];
        branches.push(makeBoltPath(bp.x,bp.y,bp.x+(Math.random()-.5)*80,bp.y+rnd(15,50),20));
      }
      bolts.push({pts:pts,branches:branches,life:0,maxLife:rnd(18,28),color:Math.random()>.4?'180,80,255':'220,140,255'});
      shockwaves.push({x:endX,y:endY,r:0,alpha:.9,color:'180,80,255',speed:3});
      shockwaves.push({x:endX,y:endY,r:0,alpha:.5,color:'220,160,255',speed:5});
    }

    function spawnEdgeSpark(){
      var W=cv.width, H=cv.height;
      var side=Math.floor(Math.random()*4);
      var sx,sy,dx,dy;
      if(side===0){sx=rnd(0,W);sy=0;dx=(Math.random()-.5)*4;dy=rnd(1,4);}
      else if(side===1){sx=rnd(0,W);sy=H;dx=(Math.random()-.5)*4;dy=-rnd(1,4);}
      else if(side===2){sx=0;sy=rnd(0,H);dx=rnd(1,4);dy=(Math.random()-.5)*4;}
      else{sx=W;sy=rnd(0,H);dx=-rnd(1,4);dy=(Math.random()-.5)*4;}
      var pts=[{x:sx,y:sy}], cx2=sx, cy2=sy;
      for(var i=0;i<6;i++){
        cx2+=dx*8+(Math.random()-.5)*18;
        cy2+=dy*8+(Math.random()-.5)*18;
        pts.push({x:cx2,y:cy2});
      }
      edgeSparks.push({pts:pts,life:0,maxLife:rnd(10,20),color:Math.random()>.5?'160,60,255':'200,120,255'});
    }

    function drawEdgeGlow(W,H){
      var pulse=0.08+Math.sin(t*.05)*.05;
      var gt=ctx.createLinearGradient(0,0,0,35);
      gt.addColorStop(0,'rgba(160,60,255,'+(pulse+.12)+')'); gt.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=gt; ctx.fillRect(0,0,W,35);
      var gb=ctx.createLinearGradient(0,H-30,0,H);
      gb.addColorStop(0,'rgba(0,0,0,0)'); gb.addColorStop(1,'rgba(140,40,255,'+(pulse+.10)+')');
      ctx.fillStyle=gb; ctx.fillRect(0,H-30,W,30);
      var gl=ctx.createLinearGradient(0,0,30,0);
      gl.addColorStop(0,'rgba(180,80,255,'+(pulse+.14)+')'); gl.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=gl; ctx.fillRect(0,0,30,H);
      var gr=ctx.createLinearGradient(W-30,0,W,0);
      gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(180,80,255,'+(pulse+.14)+')');
      ctx.fillStyle=gr; ctx.fillRect(W-30,0,30,H);
    }

    function drawEdgeCrawlers(){
      if(Math.random()<.1) spawnEdgeSpark();
      edgeSparks.forEach(function(e){
        e.life++;
        var a=1-e.life/e.maxLife;
        ctx.beginPath(); e.pts.forEach(function(p,i){i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);});
        ctx.strokeStyle='rgba('+e.color+','+a+')'; ctx.lineWidth=1.5;
        ctx.shadowColor='rgba('+e.color+',.9)'; ctx.shadowBlur=10; ctx.stroke();
        ctx.beginPath(); e.pts.forEach(function(p,i){i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);});
        ctx.strokeStyle='rgba(240,200,255,'+(a*.6)+')'; ctx.lineWidth=.5; ctx.stroke();
        ctx.shadowBlur=0;
      });
      edgeSparks=edgeSparks.filter(function(e){return e.life<e.maxLife;});
    }

    function draw(ts){
      cv.width=el.offsetWidth||500; cv.height=el.offsetHeight||130;
      var W=cv.width, H=cv.height;
      ctx.clearRect(0,0,W,H); t++;

      var bg=ctx.createRadialGradient(W*.5,H*.3,0,W*.5,H*.3,W*.55);
      bg.addColorStop(0,'rgba(50,8,110,'+(0.12+Math.sin(t*.04)*.06)+')');
      bg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      drawEdgeGlow(W,H);
      drawEdgeCrawlers();

      if(!lastBolt||ts-lastBolt>rnd(400,1200)){
        var count=Math.floor(rnd(2,5));
        for(var k=0;k<count;k++) setTimeout(spawnBolt,k*100);
        lastBolt=ts;
      }

      bolts.forEach(function(b){
        b.life++;
        var a=1-b.life/b.maxLife;
        ctx.beginPath(); b.pts.forEach(function(p,i){i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);});
        ctx.strokeStyle='rgba('+b.color+','+(a*.35)+')'; ctx.lineWidth=7;
        ctx.shadowColor='rgba('+b.color+',.5)'; ctx.shadowBlur=18; ctx.stroke();
        ctx.beginPath(); b.pts.forEach(function(p,i){i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);});
        ctx.strokeStyle='rgba('+b.color+','+a+')'; ctx.lineWidth=1.5; ctx.stroke();
        ctx.beginPath(); b.pts.forEach(function(p,i){i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);});
        ctx.strokeStyle='rgba(240,210,255,'+(a*.9)+')'; ctx.lineWidth=.6; ctx.stroke();
        ctx.shadowBlur=0;
        b.branches.forEach(function(br){
          ctx.beginPath(); br.forEach(function(p,i){i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);});
          ctx.strokeStyle='rgba('+b.color+','+(a*.5)+')'; ctx.lineWidth=.8; ctx.stroke();
        });
      });
      bolts=bolts.filter(function(b){return b.life<b.maxLife;});

      shockwaves.forEach(function(s){
        s.r+=(s.speed||3); s.alpha-=.025;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.strokeStyle='rgba('+s.color+','+s.alpha+')'; ctx.lineWidth=1.5; ctx.stroke();
      });
      shockwaves=shockwaves.filter(function(s){return s.alpha>0;});

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    // Typewriter
    function typeNext(){
      if(idx<name.length){
        var sp=document.createElement('span');
        sp.className='vb-wc';
        sp.style.animationDelay='0s';
        sp.textContent=name[idx]===' '?'\u00a0':name[idx];
        sp.style.color='#dd99ff';
        titleEl.appendChild(sp);
        idx++;
        setTimeout(typeNext,80+Math.random()*60);
      }
    }
    setTimeout(typeNext,400);
  });
});
