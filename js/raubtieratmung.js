var rb          = document.getElementById('rb');
var glowOverlay = document.getElementById('glowOverlay');
var edgeCv      = document.getElementById('edgeCv');
var eCtx        = edgeCv.getContext('2d');
var titleEl     = document.getElementById('rbTitle');
var dividerEl   = document.getElementById('rbDivider');

var animals = [
  {
    el: document.getElementById('animalLeo'),
    titleColor:'#ddeeff', titleShadow:'0 0 14px #aaccee,0 0 35px #8899bbaa,1px 1px 3px #000',
    dividerBg:'linear-gradient(90deg,transparent,#aacceecc,#ddeeffaa,#aacceecc,transparent)',
    dividerShadow:'0 0 10px #8899bbaa',
    boxShadow:'0 0 70px rgba(180,210,255,0.8),0 0 140px rgba(150,190,255,0.5)',
    filter:'brightness(2.2) contrast(1.3) grayscale(0.05) drop-shadow(0 0 35px rgba(200,220,255,1))',
    bg:'radial-gradient(ellipse at 15% 50%,rgba(180,210,255,0.28) 0%,rgba(120,160,220,0.10) 50%,transparent 75%)',
    edgeColor:[180,210,255]
  },
  {
    el: document.getElementById('animalBear'),
    titleColor:'#ddaa55', titleShadow:'0 0 14px #aa7722,0 0 35px #885500aa,1px 1px 3px #000',
    dividerBg:'linear-gradient(90deg,transparent,#aa7722cc,#ddaa55aa,#aa7722cc,transparent)',
    dividerShadow:'0 0 10px #88550088',
    boxShadow:'0 0 70px rgba(160,90,20,0.8),0 0 140px rgba(120,60,10,0.4)',
    filter:'drop-shadow(0 0 35px rgba(180,100,20,1)) brightness(1.2)',
    pathFill:'#8B4513',
    bg:'radial-gradient(ellipse at 50% 50%,rgba(160,90,20,0.28) 0%,rgba(120,60,10,0.10) 50%,transparent 75%)',
    edgeColor:[160,90,20]
  },
  {
    el: document.getElementById('animalTiger'),
    titleColor:'#ff9944', titleShadow:'0 0 14px #dd6600,0 0 35px #aa4400aa,1px 1px 3px #000',
    dividerBg:'linear-gradient(90deg,transparent,#dd6600cc,#ff9944aa,#dd6600cc,transparent)',
    dividerShadow:'0 0 10px #aa440088',
    boxShadow:'0 0 70px rgba(220,110,0,0.8),0 0 140px rgba(180,80,0,0.4)',
    filter:'sepia(1) saturate(6) hue-rotate(345deg) brightness(1.0) contrast(1.4) drop-shadow(0 0 35px rgba(255,140,0,1))',
    bg:'radial-gradient(ellipse at 85% 50%,rgba(220,110,0,0.28) 0%,rgba(180,80,0,0.10) 50%,transparent 75%)',
    edgeColor:[220,110,0]
  }
];

var defaultTitleColor  = '#ffaa33';
var defaultTitleShadow = '0 0 10px #cc660088,1px 1px 3px #000';
var defaultDividerBg   = 'linear-gradient(90deg,transparent,#cc7700cc,#ffaa33aa,#cc7700cc,transparent)';
var defaultDividerShadow = '0 0 8px #884400aa';

// Rand-Effekte
var edgeT=0, activeColor=null, edgeAlpha=0;
function drawEdge(){
  edgeCv.width=rb.offsetWidth||800; edgeCv.height=rb.offsetHeight||160;
  var W=edgeCv.width,H=edgeCv.height;
  eCtx.clearRect(0,0,W,H);
  if(activeColor&&edgeAlpha>0){
    edgeT+=0.04;
    var r=activeColor[0],g=activeColor[1],b=activeColor[2];
    var p=edgeAlpha*(0.8+Math.sin(edgeT*3)*0.2);
    var th=22;
    var gt=eCtx.createLinearGradient(0,0,0,th);
    gt.addColorStop(0,'rgba('+r+','+g+','+b+','+p+')'); gt.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
    eCtx.fillStyle=gt; eCtx.fillRect(0,0,W,th);
    var gb=eCtx.createLinearGradient(0,H-th,0,H);
    gb.addColorStop(0,'rgba('+r+','+g+','+b+',0)'); gb.addColorStop(1,'rgba('+r+','+g+','+b+','+p+')');
    eCtx.fillStyle=gb; eCtx.fillRect(0,H-th,W,th);
    var gl=eCtx.createLinearGradient(0,0,th,0);
    gl.addColorStop(0,'rgba('+r+','+g+','+b+','+p+')'); gl.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
    eCtx.fillStyle=gl; eCtx.fillRect(0,0,th,H);
    var grr=eCtx.createLinearGradient(W-th,0,W,0);
    grr.addColorStop(0,'rgba('+r+','+g+','+b+',0)'); grr.addColorStop(1,'rgba('+r+','+g+','+b+','+p+')');
    eCtx.fillStyle=grr; eCtx.fillRect(W-th,0,th,H);
    // Ecken
    [[0,0],[W,0],[0,H],[W,H]].forEach(function(c){
      var cg=eCtx.createRadialGradient(c[0],c[1],0,c[0],c[1],55);
      cg.addColorStop(0,'rgba('+r+','+g+','+b+','+(p*1.5)+')');
      cg.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
      eCtx.fillStyle=cg; eCtx.beginPath(); eCtx.arc(c[0],c[1],55,0,Math.PI*2); eCtx.fill();
    });
    // Kriech-Blitze
    if(Math.random()<0.1){
      var side=Math.floor(Math.random()*4);
      var sx,sy,ex,ey;
      if(side===0){sx=Math.random()*W;sy=0;ex=sx+(Math.random()-.5)*80;ey=8+Math.random()*18;}
      else if(side===1){sx=Math.random()*W;sy=H;ex=sx+(Math.random()-.5)*80;ey=H-8-Math.random()*18;}
      else if(side===2){sx=0;sy=Math.random()*H;ex=8+Math.random()*18;ey=sy+(Math.random()-.5)*60;}
      else{sx=W;sy=Math.random()*H;ex=W-8-Math.random()*18;ey=sy+(Math.random()-.5)*60;}
      eCtx.beginPath(); eCtx.moveTo(sx,sy); eCtx.lineTo(ex,ey);
      eCtx.strokeStyle='rgba('+r+','+g+','+b+','+(p*1.2)+')';
      eCtx.lineWidth=1.5; eCtx.stroke();
    }
  }
  requestAnimationFrame(drawEdge);
}
drawEdge();

function setTitleColor(color,shadow){
  titleEl.style.color=color; titleEl.style.textShadow=shadow;
  titleEl.querySelectorAll('span').forEach(function(s){s.style.color=color;s.style.textShadow=shadow;});
}

var current=0;
function showAnimal(){
  var a=animals[current];
  animals.forEach(function(x){
    x.el.classList.remove('attack');
    x.el.style.opacity='0';
    x.el.style.animation='none';
  });
  glowOverlay.style.opacity='0';
  rb.style.boxShadow='none';
  edgeAlpha=0; activeColor=null;

  setTimeout(function(){
    if(a.pathFill) a.el.querySelectorAll('path').forEach(function(p){p.setAttribute('fill',a.pathFill);});
    a.el.style.filter=a.filter;
    a.el.style.animation='none'; a.el.offsetHeight;
    a.el.classList.add('attack'); a.el.style.opacity='1';

    glowOverlay.style.background=a.bg; glowOverlay.style.opacity='1';
    rb.style.transition='box-shadow 0.3s'; rb.style.boxShadow=a.boxShadow;
    rb.classList.remove('shaking'); rb.offsetHeight; rb.classList.add('shaking');

    activeColor=a.edgeColor; edgeAlpha=0.6;
    setTitleColor(a.titleColor,a.titleShadow);
    dividerEl.style.background=a.dividerBg; dividerEl.style.boxShadow=a.dividerShadow;

    setTimeout(function(){
      glowOverlay.style.opacity='0'; rb.style.boxShadow='none';
      edgeAlpha=0; activeColor=null;
      setTitleColor(defaultTitleColor,defaultTitleShadow);
      dividerEl.style.background=defaultDividerBg; dividerEl.style.boxShadow=defaultDividerShadow;
    },1900);

    setTimeout(function(){
      rb.classList.remove('shaking');
      current=(current+1)%animals.length;
      showAnimal();
    },3800);
  },100);
}

// Typewriter
var text='Erste Form: Schneeleopard';
var idx=0;
function typeNext(){
  if(idx<text.length){
    var sp=document.createElement('span');
    sp.style.cssText='display:inline-block;color:#ffaa33;text-shadow:0 0 10px #cc6600,1px 1px 3px #000;opacity:0;transform:translateY(6px);transition:opacity 0.3s,transform 0.35s;';
    sp.textContent=text[idx]===' '?'\u00a0':text[idx];
    titleEl.appendChild(sp);
    setTimeout(function(){sp.style.opacity='1';sp.style.transform='translateY(0)';},20);
    idx++; setTimeout(typeNext,80+Math.random()*60);
  }
}
setTimeout(typeNext,400);
setTimeout(showAnimal,1000);