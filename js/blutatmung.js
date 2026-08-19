/* ================================================
   BLUT-ATMUNG — JS
   In den Header einfügen
   Font benötigt: Nosifer (Google Fonts)
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".blutatmung").forEach(function (el) {

    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";

    var uid = Date.now() + Math.floor(Math.random()*9999);
    el.innerHTML =
      '<canvas class="ba-canvas" id="baCv_'+uid+'"></canvas>' +
      '<div class="ba-inner">' +
        '<span class="ba-lbl">Blut-Atmung</span>' +
        '<div class="ba-ttl" id="baTtl_'+uid+'"></div>' +
        '<div class="ba-divider" id="baDiv_'+uid+'"></div>' +
        '<p class="ba-dsc">' + desc + '</p>' +
      '</div>';

    var cv      = document.getElementById('baCv_'+uid);
    var titleEl = document.getElementById('baTtl_'+uid);
    var divEl   = document.getElementById('baDiv_'+uid);
    var ctx     = cv.getContext('2d');

    function rnd(a,b){ return a+Math.random()*(b-a); }

    // States: 0=Ruhepuls, 1=Aktivierung+Beschleunigung
    var state=0, t=0, activationTime=0;
    var BPM_REST=58, BPM_MAX=165, ACCEL_DURATION=10;
    var currentBPM=BPM_REST, lastBeat=0, beatPhase=0, beatStrength=0, irregTimer=0;

    // Fallende Tropfen
    var drops=[];
    for(var i=0;i<35;i++) drops.push({
      x:rnd(0,600),y:rnd(-20,150),
      vy:rnd(0.5,1.8),vx:rnd(-0.15,0.15),
      size:rnd(1.5,4),alpha:0,targetAlpha:rnd(0.3,0.8)
    });

    // Rand-Spritzer
    var splats=[];
    function spawnSplats(strength){
      var W=cv.width,H=cv.height;
      var count=Math.floor(10+strength*22);
      for(var i=0;i<count;i++){
        var side=Math.floor(Math.random()*4);
        var sx,sy,vx,vy,spd=1.5+strength*6;
        if(side===0){sx=rnd(0,W);sy=0;     vx=rnd(-2,2);       vy=rnd(spd*.5,spd);}
        else if(side===1){sx=rnd(0,W);sy=H;vx=rnd(-2,2);       vy=-rnd(spd*.5,spd);}
        else if(side===2){sx=0;sy=rnd(0,H);vx=rnd(spd*.5,spd); vy=rnd(-2,2);}
        else            {sx=W;sy=rnd(0,H); vx=-rnd(spd*.5,spd);vy=rnd(-2,2);}
        splats.push({x:sx,y:sy,vx:vx,vy:vy,size:rnd(2,5+strength*3),alpha:.95,life:0,maxLife:rnd(18,45)});
      }
      [[0,0],[W,0],[0,H],[W,H]].forEach(function(c){
        for(var j=0;j<4;j++){
          var a=Math.atan2(H/2-c[1],W/2-c[0])+rnd(-.7,.7);
          var sp=rnd(2,6+strength*4);
          splats.push({x:c[0],y:c[1],vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,size:rnd(1.5,4),alpha:.9,life:0,maxLife:rnd(15,35)});
        }
      });
    }

    function doBeat(){
      var strength=state===0?0.15:Math.min(1,(currentBPM-BPM_REST)/(BPM_MAX-BPM_REST));
      beatPhase=1.0; beatStrength=state===0?0.2:0.55+strength*.45; lastBeat=t;
      if(state===1) spawnSplats(strength);
      var intensity=state===0?0.008:0.035+strength*.03;
      var tx=rnd(-4,4)*intensity*60, ty=rnd(-3,3)*intensity*60, sc=1+intensity*.8;
      el.style.transition='none';
      el.style.transform='scale('+sc+') translate('+tx+'px,'+ty+'px)';
      el.style.boxShadow='0 0 '+(state===0?15:50*strength)+'px rgba(180,0,0,'+(state===0?.12:.65*strength)+')';
      if(state===1){
        setTimeout(function(){
          el.style.transform='scale('+(1+intensity*.3)+') translate('+rnd(-2,2)*intensity*30+'px,'+rnd(-1,1)*intensity*30+'px)';
        },80);
      }
      setTimeout(function(){
        el.style.transform='scale(1) translate(0,0)';
        el.style.boxShadow='none';
      },state===0?200:150+rnd(0,50));
    }

    function draw(){
      cv.width=el.offsetWidth||500; cv.height=el.offsetHeight||130;
      var W=cv.width,H=cv.height;
      ctx.clearRect(0,0,W,H); t+=0.016; irregTimer+=0.016;

      if(state===0){
        currentBPM=BPM_REST;
      } else {
        var elapsed=t-activationTime;
        var progress=Math.min(1,elapsed/ACCEL_DURATION);
        var eased=progress*progress*(3-2*progress);
        var irregular=1+Math.sin(irregTimer*6.8)*(0.03+eased*.08)+Math.sin(irregTimer*13.2)*(0.02+eased*.05);
        currentBPM=(BPM_REST+(BPM_MAX-BPM_REST)*eased)*irregular;
      }

      var interval=60/currentBPM;
      if(t-lastBeat>interval) doBeat();

      var decaySpeed=state===0?0.025:0.03+(currentBPM-BPM_REST)/(BPM_MAX-BPM_REST)*.05;
      beatPhase=Math.max(0,beatPhase-decaySpeed);
      var pulse=beatPhase*beatStrength;
      var intensity=state===0?0:Math.min(1,(currentBPM-BPM_REST)/(BPM_MAX-BPM_REST));

      // Hintergrund
      var bg=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.65);
      bg.addColorStop(0,'rgba(80,0,0,'+(0.04+pulse*.25+intensity*.08)+')');
      bg.addColorStop(.5,'rgba(30,0,0,'+(0.02+pulse*.10)+')');
      bg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      // Rand-Glow
      var rp=0.04+pulse*.35+intensity*.05;
      var gt=ctx.createLinearGradient(0,0,0,28);
      gt.addColorStop(0,'rgba(180,0,0,'+rp+')'); gt.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=gt; ctx.fillRect(0,0,W,28);
      var gb=ctx.createLinearGradient(0,H-28,0,H);
      gb.addColorStop(0,'rgba(0,0,0,0)'); gb.addColorStop(1,'rgba(180,0,0,'+rp+')');
      ctx.fillStyle=gb; ctx.fillRect(0,H-28,W,28);
      var gl=ctx.createLinearGradient(0,0,28,0);
      gl.addColorStop(0,'rgba(180,0,0,'+rp+')'); gl.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=gl; ctx.fillRect(0,0,28,H);
      var gr=ctx.createLinearGradient(W-28,0,W,0);
      gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(180,0,0,'+rp+')');
      ctx.fillStyle=gr; ctx.fillRect(W-28,0,28,H);

      // Ecken
      if(pulse>0.1&&state===1){
        [[0,0],[W,0],[0,H],[W,H]].forEach(function(c){
          var cg=ctx.createRadialGradient(c[0],c[1],0,c[0],c[1],65);
          cg.addColorStop(0,'rgba(220,0,0,'+(pulse*.5)+')');
          cg.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(c[0],c[1],65,0,Math.PI*2); ctx.fill();
        });
      }

      // Fallende Tropfen
      drops.forEach(function(d){
        var targetA=state===0?0:d.targetAlpha;
        d.alpha+=(targetA-d.alpha)*0.02;
        if(d.alpha<0.01) return;
        d.y+=d.vy*(1+pulse*.8+intensity*.4); d.x+=d.vx;
        if(d.y>H+10){d.y=rnd(-10,-2);d.x=rnd(0,W);}
        ctx.beginPath(); ctx.moveTo(d.x,d.y-d.vy*4); ctx.lineTo(d.x,d.y+d.size);
        ctx.strokeStyle='rgba(140,0,0,'+(d.alpha*.3)+')'; ctx.lineWidth=d.size*.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(d.x,d.y,d.size*(1+pulse*.15),0,Math.PI*2);
        ctx.fillStyle='rgba(200,0,0,'+d.alpha+')';
        ctx.shadowColor='rgba(180,0,0,.4)'; ctx.shadowBlur=3+pulse*5; ctx.fill(); ctx.shadowBlur=0;
      });

      // Rand-Spritzer
      splats.forEach(function(s){
        s.life++; s.x+=s.vx; s.y+=s.vy; s.vy+=0.12;
        var a=s.alpha*(1-s.life/s.maxLife);
        ctx.beginPath(); ctx.moveTo(s.x-s.vx*2,s.y-s.vy*2); ctx.lineTo(s.x,s.y);
        ctx.strokeStyle='rgba(180,0,0,'+(a*.5)+')'; ctx.lineWidth=s.size*.6; ctx.stroke();
        ctx.beginPath(); ctx.arc(s.x,s.y,s.size*(1-s.life/s.maxLife*.3),0,Math.PI*2);
        ctx.fillStyle='rgba(220,0,0,'+a+')';
        ctx.shadowColor='rgba(200,0,0,.3)'; ctx.shadowBlur=2; ctx.fill(); ctx.shadowBlur=0;
      });
      splats=splats.filter(function(s){return s.life<s.maxLife;});

      // Titel pulsiert
      var spans=titleEl.querySelectorAll('span');
      var baseR=state===0?90:150;
      var tc=Math.floor(baseR+pulse*(state===0?30:90));
      spans.forEach(function(s){
        s.style.color='rgb('+tc+',0,0)';
        s.style.textShadow='0 0 '+(state===0?(4+pulse*6):(9+pulse*22))+'px rgba('+(state===0?80:220)+',0,0,'+(state===0?(.2+pulse*.2):(.5+pulse*.5))+'),1px 1px 3px #000';
      });
      var dGlow=state===0?(2+pulse*4):(5+pulse*22);
      var dAlpha=state===0?(0.2+pulse*.15):(0.4+pulse*.6);
      divEl.style.boxShadow='0 0 '+dGlow+'px rgba(200,0,0,'+dAlpha+')';
      if(state===1){
        divEl.style.background='linear-gradient(90deg,transparent,rgba(180,0,0,'+(0.6+intensity*.4)+'),rgba(220,0,0,'+(0.5+intensity*.4)+'),rgba(180,0,0,'+(0.6+intensity*.4)+'),transparent)';
      }

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    // Typewriter — langsam im Ruhezustand
    var idx=0;
    function typeNext(){
      if(idx<name.length){
        var sp=document.createElement('span');
        sp.className='ba-wc'; sp.style.animationDelay='0s';
        sp.textContent=name[idx]===' '?'\u00a0':name[idx];
        sp.style.color='#660000';
        sp.style.textShadow='0 0 4px rgba(80,0,0,.3),1px 1px 3px #000';
        titleEl.appendChild(sp);
        idx++;
        if(idx===name.length){
          // Titel fertig → Aktivierung nach kurzer Pause
          setTimeout(function(){
            state=1; activationTime=t;
            setTimeout(function(){ spawnSplats(0.25); },300);
          },500);
        }
        setTimeout(typeNext,110+rnd(-20,40));
      }
    }
    setTimeout(typeNext,800);
  });
});
