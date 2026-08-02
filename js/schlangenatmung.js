/* ================================================
   SCHLANGENATMUNG — JS
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".schlangenatmung").forEach(function (el) {

    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";

    el.innerHTML =
      '<canvas class="sa-scales" id="saScales_' + Date.now() + '"></canvas>' +
      '<canvas class="sa-snake"  id="saSnake_'  + Date.now() + '"></canvas>' +
      '<div class="sa-inner">' +
        '<span class="sa-lbl">Schlangenatmung</span>' +
        '<div class="sa-ttl" id="saTitle_' + Date.now() + '"></div>' +
        '<hr class="sa-hr">' +
        '<p class="sa-dsc">' + desc + '</p>' +
      '</div>';

    var scalesCv = el.querySelector('.sa-scales');
    var snakeCv  = el.querySelector('.sa-snake');
    var titleEl  = el.querySelector('.sa-ttl');
    var sCtx     = scalesCv.getContext('2d');
    var nCtx     = snakeCv.getContext('2d');

    var breathe=0, lineT=0, waveT=0, idx=0, spans=[];

    var scaleColors=[
      {base:'#2a3038',mid:'#3a4248',dark:'#1a2028'},
      {base:'#1e2830',mid:'#2e3840',dark:'#121820'},
      {base:'#323840',mid:'#424850',dark:'#222830'},
      {base:'#18202a',mid:'#283040',dark:'#101820'},
    ];

    function resize(){
      scalesCv.width=el.offsetWidth; scalesCv.height=el.offsetHeight;
      snakeCv.width=el.offsetWidth;  snakeCv.height=80;
    }

    function drawScales(){
      var W=scalesCv.width,H=scalesCv.height;
      sCtx.clearRect(0,0,W,H); breathe+=0.012;
      var sw=20,sh=13,cols=Math.ceil(W/sw)+2,rows=Math.ceil(H/(sh*.72))+2;
      for(var r=0;r<rows;r++) for(var c=0;c<cols;c++){
        var ox=c*sw+(r%2===0?0:sw*.5)-sw,oy=r*sh*.72-sh;
        var rb=1+Math.sin(breathe+r*.3)*.022,csw=sw*.52*rb,csh=sh*.66*rb;
        var isBlack=((r*2+c)%5===0)||(((r+c)%4===0)&&((r+c)%6<3));
        var col=isBlack?{base:'#080a0c',mid:'#101416',dark:'#040506'}:scaleColors[(r*2+c)%scaleColors.length];
        sCtx.beginPath(); sCtx.ellipse(ox,oy,csw,csh,0,0,Math.PI*2);
        var g=sCtx.createRadialGradient(ox-csw*.25,oy-csh*.3,csh*.05,ox,oy,csw*.9);
        g.addColorStop(0,col.mid); g.addColorStop(.4,col.base); g.addColorStop(.85,col.dark); g.addColorStop(1,'#000');
        sCtx.fillStyle=g; sCtx.fill();
        sCtx.beginPath(); sCtx.ellipse(ox,oy,csw,csh,0,0,Math.PI*2);
        sCtx.strokeStyle='rgba('+(isBlack?'30,35,40':'70,90,110')+','+(0.10+Math.sin(breathe+r*.4+c*.3)*.05)+')';
        sCtx.lineWidth=0.7; sCtx.stroke();
        sCtx.beginPath(); sCtx.ellipse(ox-csw*.2,oy-csh*.25,csw*.15,csh*.1,-0.3,0,Math.PI*2);
        sCtx.fillStyle='rgba(180,200,220,'+(0.06+Math.sin(breathe*1.1+r*.5)*.03)+')'; sCtx.fill();
      }
    }

    function drawSnake(){
      var W=snakeCv.width,H=snakeCv.height;
      nCtx.clearRect(0,0,W,H); lineT+=0.022;
      var t=18,pts=[];
      for(var x=0;x<=W+20;x+=3) pts.push({x:x,y:H*.75+Math.sin(x*.02+lineT)*15+Math.sin(x*.01-lineT*.6)*8});
      nCtx.beginPath(); pts.forEach(function(p,i){if(i===0)nCtx.moveTo(p.x,p.y);else nCtx.lineTo(p.x,p.y);});
      nCtx.strokeStyle='rgba(0,0,0,0.6)'; nCtx.lineWidth=t+8; nCtx.lineCap='round'; nCtx.lineJoin='round'; nCtx.stroke();
      nCtx.beginPath(); pts.forEach(function(p,i){if(i===0)nCtx.moveTo(p.x,p.y);else nCtx.lineTo(p.x,p.y);});
      nCtx.strokeStyle='#1e2830'; nCtx.lineWidth=t; nCtx.stroke();
      nCtx.beginPath(); pts.forEach(function(p,i){if(i===0)nCtx.moveTo(p.x,p.y);else nCtx.lineTo(p.x,p.y);});
      nCtx.strokeStyle='#2e3a46'; nCtx.lineWidth=t-5; nCtx.stroke();
      for(var zi=4;zi<pts.length-4;zi+=10){
        var p=pts[zi],pn=pts[Math.min(zi+4,pts.length-1)];
        nCtx.save(); nCtx.translate(p.x,p.y); nCtx.rotate(Math.atan2(pn.y-p.y,pn.x-p.x));
        nCtx.beginPath(); nCtx.moveTo(0,-5); nCtx.lineTo(6,0); nCtx.lineTo(0,5); nCtx.lineTo(-6,0); nCtx.closePath();
        nCtx.fillStyle='rgba(5,8,10,0.75)'; nCtx.fill(); nCtx.restore();
      }
      for(var si=0;si<pts.length-2;si++){
        if(si%8!==0) continue;
        var sp=pts[si],spn=pts[Math.min(si+2,pts.length-1)];
        nCtx.save(); nCtx.translate(sp.x,sp.y); nCtx.rotate(Math.atan2(spn.y-sp.y,spn.x-sp.x));
        nCtx.beginPath(); nCtx.ellipse(0,0,10,7,0,Math.PI,Math.PI*2);
        nCtx.fillStyle=(si%20<8)?'#0c0e10':'#3a4a58'; nCtx.fill(); nCtx.restore();
      }
      nCtx.beginPath(); pts.forEach(function(p,i){if(i===0)nCtx.moveTo(p.x,p.y);else nCtx.lineTo(p.x,p.y);});
      nCtx.strokeStyle='rgba(100,140,180,0.12)'; nCtx.lineWidth=t+3; nCtx.stroke();
    }

    function waveLoop(){
      waveT+=0.04;
      spans.forEach(function(s,i){
        s.style.transform='translateY('+(Math.sin(waveT+i*.4)*2)+'px)';
        s.style.color='#ddff00';
        s.style.textShadow='0 0 '+(10+Math.sin(waveT+i*.3)*4)+'px #aadd00, 2px 2px 4px #000';
      });
      requestAnimationFrame(waveLoop);
    }

    function typeNext(){
      if(idx<name.length){
        var sp=document.createElement('span');
        sp.textContent=name[idx]===' '?'\u00a0':name[idx];
        sp.style.display='inline-block';
        sp.style.color='#ddff00';
        sp.style.textShadow='0 0 12px #aadd00, 2px 2px 4px #000';
        sp.style.textDecoration='none';
        sp.style.opacity='0';
        sp.style.transform='translateY(8px)';
        sp.style.transition='opacity 0.3s ease, transform 0.35s ease';
        titleEl.appendChild(sp);
        spans.push(sp);
        setTimeout(function(){ sp.style.opacity='1'; sp.style.transform='translateY(0)'; },20);
        idx++;
        setTimeout(typeNext,80+Math.random()*65);
      }
    }

    function loop(){ resize(); drawScales(); drawSnake(); requestAnimationFrame(loop); }
    loop();
    waveLoop();
    setTimeout(typeNext,400);
  });
});
