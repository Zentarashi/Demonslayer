/* ================================================
   BLUMENATMUNG — JS
   BBCode: [Blumenatmung]Name|Beschreibung[/Blumenatmung]
   Font: Dancing Script (Google Fonts)
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".blumenatmung").forEach(function (el) {

    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";
    var uid   = Math.floor(Math.random() * 999999);

    el.innerHTML =
      '<canvas class="ba-canvas" id="baCanvas_' + uid + '"></canvas>' +
      '<div class="ba-inner">' +
        '<span class="ba-lbl">Blumenatmung</span>' +
        '<div class="ba-ttl" id="baTtl_' + uid + '"></div>' +
        '<div class="ba-divider"></div>' +
        '<p class="ba-dsc">' + desc + '</p>' +
      '</div>';

    var cv      = document.getElementById('baCanvas_' + uid);
    var titleEl = document.getElementById('baTtl_' + uid);
    var ctx     = cv.getContext('2d');

    function resize() {
      cv.width  = el.offsetWidth  || 800;
      cv.height = el.offsetHeight || 210;
    }
    resize();
    window.addEventListener('resize', resize);

    var t = 0;

    var flowerTypes = [
      { type:'rose',      hue:345, hue2:360 },
      { type:'daisy',     hue:55,  hue2:65  },
      { type:'tulip',     hue:15,  hue2:25  },
      { type:'violet',    hue:270, hue2:290 },
      { type:'lily',      hue:180, hue2:200 },
      { type:'sunflower', hue:45,  hue2:55  },
      { type:'lavender',  hue:250, hue2:270 },
      { type:'poppy',     hue:5,   hue2:15  },
    ];

    var positions = [
      {x:0.72,y:0.45,s:1.0}, {x:0.85,y:0.55,s:0.8},  {x:0.60,y:0.60,s:0.65},
      {x:0.92,y:0.32,s:0.6}, {x:0.76,y:0.75,s:0.55}, {x:0.96,y:0.68,s:0.5},
      {x:0.65,y:0.30,s:0.5}, {x:0.88,y:0.82,s:0.45}, {x:0.58,y:0.80,s:0.4},
      {x:0.78,y:0.18,s:0.45},
      {x:0.08,y:0.82,s:0.55}, {x:0.22,y:0.88,s:0.45}, {x:0.36,y:0.80,s:0.5},
      {x:0.14,y:0.70,s:0.4},  {x:0.30,y:0.75,s:0.45}, {x:0.46,y:0.85,s:0.4},
      {x:0.52,y:0.72,s:0.38}, {x:0.04,y:0.60,s:0.35}, {x:0.42,y:0.65,s:0.35}
    ];

    var staticFlowers = positions.map(function(p, i) {
      var ft = flowerTypes[i % flowerTypes.length];
      return {
        x: p.x, y: p.y, scale: p.s,
        type: ft.type, hue: ft.hue, hue2: ft.hue2,
        phase: Math.random() * Math.PI * 2,
        openPhase: Math.random() * Math.PI * 2
      };
    });

    var fallingPetals = [];
    for (var i = 0; i < 22; i++) {
      var ft2 = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
      fallingPetals.push({
        x: Math.random() * 800, y: Math.random() * 210,
        size: 3 + Math.random() * 7,
        angle: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 0.3 + Math.random() * 0.5,
        va: (Math.random() - 0.5) * 0.04,
        hue: ft2.hue + Math.random() * (ft2.hue2 - ft2.hue),
        alpha: 0.3 + Math.random() * 0.45,
        wobble: Math.random() * Math.PI * 2
      });
    }

    function drawFlower(x, y, scale, type, hue, hue2, phase, openPhase) {
      var breathe = 0.88 + 0.12 * Math.sin(t * 0.6 + openPhase);
      var r = 32 * scale * breathe;
      ctx.save();
      ctx.translate(x, y);

      if (type === 'rose') {
        [5,7,9].forEach(function(petals, li) {
          var lr = r*(0.5+li*0.25), pw = r*(0.38-li*0.05);
          var rot = t*(0.08-li*0.02)+phase;
          for (var i=0;i<petals;i++) {
            var a=(i/petals)*Math.PI*2+rot;
            ctx.save(); ctx.rotate(a);
            ctx.beginPath();
            ctx.ellipse(lr*0.55,0,pw*0.55,pw*0.32,0,0,Math.PI*2);
            ctx.fillStyle='hsla('+(hue+li*5)+',80%,'+(45+li*8)+'%,'+(0.65+li*0.1)+')';
            ctx.shadowColor='hsla('+hue+',90%,50%,0.3)'; ctx.shadowBlur=8;
            ctx.fill(); ctx.restore();
          }
        });
        ctx.beginPath(); ctx.arc(0,0,r*0.14,0,Math.PI*2);
        ctx.fillStyle='hsla('+(hue+30)+',90%,75%,1)'; ctx.fill();

      } else if (type === 'daisy') {
        for (var i=0;i<14;i++) {
          var a=(i/14)*Math.PI*2+t*0.05+phase;
          ctx.save(); ctx.rotate(a);
          ctx.beginPath();
          ctx.ellipse(r*0.55,0,r*0.16,r*0.09,0,0,Math.PI*2);
          ctx.fillStyle='hsla('+hue+',85%,88%,0.85)';
          ctx.fill(); ctx.restore();
        }
        ctx.beginPath(); ctx.arc(0,0,r*0.22,0,Math.PI*2);
        ctx.fillStyle='hsla(50,95%,70%,1)'; ctx.fill();
        ctx.beginPath(); ctx.arc(0,0,r*0.12,0,Math.PI*2);
        ctx.fillStyle='hsla(45,100%,55%,1)'; ctx.fill();

      } else if (type === 'tulip') {
        ctx.beginPath();
        ctx.moveTo(0,r*0.6);
        ctx.bezierCurveTo(-r*0.55,r*0.5,-r*0.65,-r*0.3,0,-r*0.65);
        ctx.bezierCurveTo(r*0.65,-r*0.3,r*0.55,r*0.5,0,r*0.6);
        ctx.fillStyle='hsla('+hue+',85%,55%,0.8)';
        ctx.shadowColor='hsla('+hue+',90%,50%,0.4)'; ctx.shadowBlur=12;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0,r*0.4);
        ctx.bezierCurveTo(-r*0.3,r*0.2,-r*0.35,-r*0.15,0,-r*0.45);
        ctx.bezierCurveTo(r*0.35,-r*0.15,r*0.3,r*0.2,0,r*0.4);
        ctx.fillStyle='hsla('+hue2+',90%,68%,0.7)'; ctx.fill();

      } else if (type === 'violet') {
        var sizes=[1,1,0.85,0.85,0.7];
        var angles=[Math.PI*1.5,Math.PI*1.7,Math.PI*1.9,Math.PI*1.3,Math.PI*1.1];
        sizes.forEach(function(s,i) {
          ctx.save(); ctx.rotate(angles[i]+t*0.05+phase);
          ctx.beginPath();
          ctx.ellipse(r*0.45*s,0,r*0.35*s,r*0.22*s,0,0,Math.PI*2);
          ctx.fillStyle='hsla('+(hue+i*8)+',75%,'+(55+i*5)+'%,0.8)';
          ctx.shadowColor='hsla('+hue+',80%,50%,0.3)'; ctx.shadowBlur=8;
          ctx.fill(); ctx.restore();
        });
        ctx.beginPath(); ctx.arc(0,0,r*0.15,0,Math.PI*2);
        ctx.fillStyle='hsla(60,100%,80%,1)'; ctx.fill();

      } else if (type === 'lily') {
        for (var i=0;i<6;i++) {
          var a=(i/6)*Math.PI*2+t*0.06+phase;
          ctx.save(); ctx.rotate(a);
          ctx.beginPath();
          ctx.moveTo(0,0);
          ctx.bezierCurveTo(-r*0.2,-r*0.3,-r*0.15,-r*0.75,0,-r*0.9);
          ctx.bezierCurveTo(r*0.15,-r*0.75,r*0.2,-r*0.3,0,0);
          ctx.fillStyle='hsla('+(hue+i*5)+',70%,70%,0.75)';
          ctx.shadowColor='hsla('+hue+',80%,65%,0.3)'; ctx.shadowBlur=10;
          ctx.fill(); ctx.restore();
        }
        for (var s=0;s<6;s++) {
          var sa=(s/6)*Math.PI*2;
          ctx.beginPath(); ctx.moveTo(0,0);
          ctx.lineTo(Math.cos(sa)*r*0.35,Math.sin(sa)*r*0.35);
          ctx.strokeStyle='hsla(60,90%,75%,0.8)'; ctx.lineWidth=1.5; ctx.stroke();
          ctx.beginPath(); ctx.arc(Math.cos(sa)*r*0.38,Math.sin(sa)*r*0.38,2.5,0,Math.PI*2);
          ctx.fillStyle='hsla(55,100%,80%,1)'; ctx.fill();
        }

      } else if (type === 'sunflower') {
        for (var i=0;i<16;i++) {
          var a=(i/16)*Math.PI*2+t*0.04+phase;
          ctx.save(); ctx.rotate(a);
          ctx.beginPath();
          ctx.ellipse(r*0.62,0,r*0.2,r*0.1,0,0,Math.PI*2);
          ctx.fillStyle='hsla('+hue+',95%,62%,0.9)';
          ctx.shadowColor='hsla('+hue+',100%,55%,0.4)'; ctx.shadowBlur=6;
          ctx.fill(); ctx.restore();
        }
        ctx.beginPath(); ctx.arc(0,0,r*0.32,0,Math.PI*2);
        ctx.fillStyle='hsla(25,80%,30%,1)'; ctx.fill();
        ctx.beginPath(); ctx.arc(0,0,r*0.22,0,Math.PI*2);
        ctx.fillStyle='hsla(30,70%,22%,1)'; ctx.fill();

      } else if (type === 'lavender') {
        for (var i=0;i<8;i++) {
          var ly=-r*0.2-i*r*0.1;
          var lx=Math.sin(t*0.3+phase+i*0.4)*r*0.08;
          ctx.beginPath();
          ctx.ellipse(lx,ly,r*0.1,r*0.07,Math.PI*0.1,0,Math.PI*2);
          ctx.fillStyle='hsla('+(hue+i*4)+',70%,65%,'+(0.6+i*0.04)+')'; ctx.fill();
          ctx.beginPath();
          ctx.ellipse(-lx*1.5,ly+r*0.05,r*0.09,r*0.06,-Math.PI*0.1,0,Math.PI*2);
          ctx.fillStyle='hsla('+(hue+i*3)+',75%,70%,'+(0.5+i*0.04)+')'; ctx.fill();
        }
        ctx.beginPath(); ctx.moveTo(0,r*0.3); ctx.lineTo(0,-r*0.15);
        ctx.strokeStyle='rgba(60,100,40,0.6)'; ctx.lineWidth=2; ctx.stroke();

      } else if (type === 'poppy') {
        for (var i=0;i<4;i++) {
          var a=(i/4)*Math.PI*2+Math.PI/4+t*0.07+phase;
          ctx.save(); ctx.rotate(a);
          ctx.beginPath();
          ctx.ellipse(r*0.42,0,r*0.42,r*0.32,0,0,Math.PI*2);
          ctx.fillStyle='hsla('+(hue+i*5)+',90%,55%,'+(0.65+i*0.05)+')';
          ctx.shadowColor='hsla('+hue+',95%,50%,0.4)'; ctx.shadowBlur=10;
          ctx.fill(); ctx.restore();
        }
        ctx.beginPath(); ctx.arc(0,0,r*0.2,0,Math.PI*2);
        ctx.fillStyle='hsla(280,70%,25%,1)'; ctx.fill();
        ctx.beginPath(); ctx.arc(0,0,r*0.12,0,Math.PI*2);
        ctx.fillStyle='hsla(270,60%,40%,0.9)'; ctx.fill();
      }

      var gl=ctx.createRadialGradient(0,0,r*0.2,0,0,r*1.2);
      gl.addColorStop(0,'hsla('+hue+',80%,60%,0.08)');
      gl.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(0,0,r*1.2,0,Math.PI*2);
      ctx.fillStyle=gl; ctx.fill();
      ctx.restore();
    }

    function anim() {
      var W=cv.width, H=cv.height;
      ctx.clearRect(0,0,W,H);

      var bgG=ctx.createLinearGradient(0,0,W,H);
      bgG.addColorStop(0,'rgba(30,5,20,0.35)');
      bgG.addColorStop(0.3,'rgba(20,5,30,0.3)');
      bgG.addColorStop(0.6,'rgba(5,20,10,0.25)');
      bgG.addColorStop(1,'rgba(15,5,30,0.35)');
      ctx.fillStyle=bgG; ctx.fillRect(0,0,W,H);

      staticFlowers.forEach(function(f) {
        drawFlower(f.x*W, f.y*H, f.scale, f.type, f.hue, f.hue2, f.phase, f.openPhase);
      });

      fallingPetals.forEach(function(p) {
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0,0,p.size,p.size*0.5,0,0,Math.PI*2);
        ctx.fillStyle='hsla('+p.hue+',80%,72%,'+p.alpha+')';
        ctx.shadowColor='hsla('+p.hue+',90%,65%,0.3)'; ctx.shadowBlur=5;
        ctx.fill(); ctx.restore();
        p.x+=p.vx+Math.sin(t*0.5+p.wobble)*0.4;
        p.y+=p.vy; p.angle+=p.va; p.wobble+=0.02;
        if(p.y>H+15){p.y=-15;p.x=Math.random()*W;}
        if(p.x<-15)p.x=W+15;
        if(p.x>W+15)p.x=-15;
      });

      t+=0.016;
      requestAnimationFrame(anim);
    }
    anim();

    // Typewriter
    var idx=0;
    function typeNext(){
      if(idx<name.length){
        var sp=document.createElement('span');
        sp.textContent=name[idx]===' '?'\u00a0':name[idx];
        titleEl.appendChild(sp);
        idx++; setTimeout(typeNext,80+Math.random()*60);
      }
    }
    setTimeout(typeNext,400);
  });
});
