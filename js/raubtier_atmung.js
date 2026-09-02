/* ================================================
   RAUBTIERATMUNG — JS
   BBCode: [RaubtierAtmung]Name|Beschreibung[/RaubtierAtmung]
   Tier-Bilder: schneeleo.png, Rag-Bear-hilts.svg, tiger-der-bruellt-ausmalbild.png
   (Pfade im Forum anpassen!)
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".raubtieratmung").forEach(function(rb) {
    var raw   = rb.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "Raubtieratmung";
    var desc  = parts[1] ? parts[1].trim() : "";
    var uid   = Math.floor(Math.random()*999999);

    rb.innerHTML =
      '<div class="rb-glow-overlay" id="rbGlow_'+uid+'"></div>'+
      '<canvas class="rb-edge-canvas" id="rbEdge_'+uid+'"></canvas>'+
      '<div class="rb-animal-wrap">'+
        '<img id="rbLeo_'+uid+'"  class="rb-animal" src="/path/to/schneeleo.png" />'+
        '<img id="rbBear_'+uid+'" class="rb-animal" src="/path/to/Rag-Bear-hilts.svg" />'+
        '<img id="rbTiger_'+uid+'" class="rb-animal" src="/path/to/tiger-der-bruellt-ausmalbild.png" />'+
      '</div>'+
      '<div class="rb-inner">'+
        '<span class="rb-lbl">Raubtieratmung</span>'+
        '<div class="rb-ttl" id="rbTitle_'+uid+'"></div>'+
        '<div class="rb-divider" id="rbDivider_'+uid+'"></div>'+
        '<p class="rb-dsc">'+desc+'</p>'+
      '</div>';

    var glowOverlay = rb.querySelector('#rbGlow_'+uid);
    var edgeCv      = rb.querySelector('#rbEdge_'+uid);
    var eCtx        = edgeCv.getContext('2d');
    var titleEl     = rb.querySelector('#rbTitle_'+uid);
    var dividerEl   = rb.querySelector('#rbDivider_'+uid);

    var animals = [
      {
        el: rb.querySelector('#rbLeo_'+uid),
        titleColor:'#ddeeff', titleShadow:'0 0 14px #aaccee,0 0 35px #8899bbaa,1px 1px 3px #000',
        dividerBg:'linear-gradient(90deg,transparent,#aacceecc,#ddeeffaa,#aacceecc,transparent)',
        dividerShadow:'0 0 10px #8899bbaa',
        boxShadow:'0 0 70px rgba(180,210,255,0.8),0 0 140px rgba(150,190,255,0.5)',
        filter:'brightness(2.2) contrast(1.3) grayscale(0.05) drop-shadow(0 0 35px rgba(200,220,255,1))',
        bg:'radial-gradient(ellipse at 15% 50%,rgba(180,210,255,0.28) 0%,rgba(120,160,220,0.10) 50%,transparent 75%)',
        edgeColor:[180,210,255]
      },
      {
        el: rb.querySelector('#rbBear_'+uid),
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
        el: rb.querySelector('#rbTiger_'+uid),
        titleColor:'#ff9944', titleShadow:'0 0 14px #dd6600,0 0 35px #aa4400aa,1px 1px 3px #000',
        dividerBg:'linear-gradient(90deg,transparent,#dd6600cc,#ff9944aa,#dd6600cc,transparent)',
        dividerShadow:'0 0 10px #aa440088',
        boxShadow:'0 0 70px rgba(220,110,0,0.8),0 0 140px rgba(180,80,0,0.4)',
        filter:'sepia(1) saturate(6) hue-rotate(345deg) brightness(1.0) contrast(1.4) drop-shadow(0 0 35px rgba(255,140,0,1))',
        bg:'radial-gradient(ellipse at 85% 50%,rgba(220,110,0,0.28) 0%,rgba(180,80,0,0.10) 50%,transparent 75%)',
        edgeColor:[220,110,0]
      }
    ];

    var current = 0;
    var edgeAlpha = 0;
    var activeColor = null;
    var defaultTitleColor  = '#ffaa33';
    var defaultTitleShadow = '0 0 10px #cc6600,1px 1px 3px #000';
    var defaultDividerBg   = 'linear-gradient(90deg,transparent,#cc6600cc,#ffaa33aa,#cc6600cc,transparent)';
    var defaultDividerShadow = '0 0 8px #aa440088';

    function setTitleColor(color, shadow) {
      titleEl.querySelectorAll('span').forEach(function(s){s.style.color=color;s.style.textShadow=shadow;});
    }

    // Edge-Canvas Zeichenschleife
    (function edgeLoop() {
      var W = rb.offsetWidth, H = rb.offsetHeight;
      edgeCv.width = W; edgeCv.height = H;
      if (activeColor && edgeAlpha > 0) {
        eCtx.clearRect(0,0,W,H);
        var r=activeColor[0],g=activeColor[1],b=activeColor[2];
        eCtx.strokeStyle='rgba('+r+','+g+','+b+','+edgeAlpha+')';
        eCtx.lineWidth=6;
        eCtx.shadowColor='rgba('+r+','+g+','+b+',0.8)';
        eCtx.shadowBlur=20;
        eCtx.strokeRect(3,3,W-6,H-6);
        edgeAlpha = Math.max(0, edgeAlpha - 0.012);
      } else {
        eCtx.clearRect(0,0,W,H);
      }
      requestAnimationFrame(edgeLoop);
    })();

    function showAnimal() {
      var a = animals[current];
      a.el.classList.add('attack');
      glowOverlay.style.opacity = '1';
      glowOverlay.style.background = a.bg;
      rb.style.boxShadow = a.boxShadow;
      a.el.style.filter = a.filter;
      setTitleColor(a.titleColor, a.titleShadow);
      dividerEl.style.background = a.dividerBg;
      dividerEl.style.boxShadow  = a.dividerShadow;
      activeColor = a.edgeColor;
      edgeAlpha = 0.9;

      rb.classList.add('shaking');

      setTimeout(function(){
        a.el.classList.remove('attack');
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
    }

    // Typewriter
    var idx=0;
    function typeNext(){
      if(idx<name.length){
        var sp=document.createElement('span');
        sp.style.cssText='display:inline-block;color:'+defaultTitleColor+';text-shadow:'+defaultTitleShadow+';opacity:0;transform:translateY(6px);transition:opacity 0.3s,transform 0.35s;';
        sp.textContent=name[idx]===' '?'\u00a0':name[idx];
        titleEl.appendChild(sp);
        setTimeout(function(){sp.style.opacity='1';sp.style.transform='translateY(0)';},20);
        idx++; setTimeout(typeNext,80+Math.random()*60);
      }
    }
    setTimeout(typeNext,400);
    setTimeout(showAnimal,1000);
  });
});
