/* ================================================
   SCHLANGENATMUNG — JS (neu, SVG-Schlange)
   In den Header einfügen
   Font: Savate (Google Fonts)
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".schlangenatmung").forEach(function (el) {

    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";
    var uid   = Date.now() + Math.floor(Math.random()*99999);

    el.innerHTML =
      '<svg class="sn-snake" viewBox="0 0 500 70" preserveAspectRatio="none">' +
        '<defs>' +
          '<linearGradient id="snGrad_'+uid+'" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0%"   stop-color="#1a1c1e" stop-opacity="0"/>' +
            '<stop offset="12%"  stop-color="#2a2e32" stop-opacity="1"/>' +
            '<stop offset="88%"  stop-color="#2a2e32" stop-opacity="1"/>' +
            '<stop offset="100%" stop-color="#1a1c1e" stop-opacity="0"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<path id="snShadow_'+uid+'" fill="none" stroke="rgba(0,0,0,0.6)"          stroke-width="24" stroke-linecap="round"/>' +
        '<path id="snBody_'+uid+'"   fill="none" stroke="url(#snGrad_'+uid+')"      stroke-width="16" stroke-linecap="round"/>' +
        '<path id="snBelly_'+uid+'"  fill="none" stroke="#383c40"                   stroke-width="8"  stroke-linecap="round"/>' +
        '<path id="snBack_'+uid+'"   fill="none" stroke="#0e1012"                   stroke-width="5"  stroke-linecap="round" stroke-dasharray="9 14"/>' +
        '<path id="snSheen_'+uid+'"  fill="none" stroke="rgba(200,210,220,0.10)"    stroke-width="4"  stroke-linecap="round"/>' +
        '<g id="snHead_'+uid+'">' +
          '<ellipse rx="14" ry="8.5" fill="#1c1e20"/>' +
          '<ellipse rx="12" ry="6.5" fill="#2c3034" transform="translate(-1,-1)"/>' +
          '<ellipse rx="8"  ry="4"   fill="#242828" transform="translate(-2,-1)"/>' +
          '<circle cx="6"   cy="-2.5" r="3"   fill="#ccdd00" opacity="0.9"/>' +
          '<circle cx="6.5" cy="-2.5" r="1.4" fill="#000"/>' +
          '<circle cx="5.4" cy="-3.2" r="0.6" fill="rgba(255,255,200,0.5)"/>' +
          '<g id="snTongue_'+uid+'" opacity="0">' +
            '<line x1="12" y1="0" x2="21" y2="-2.5" stroke="#bb0000" stroke-width="1.2" stroke-linecap="round"/>' +
            '<line x1="12" y1="0" x2="21" y2="2.5"  stroke="#bb0000" stroke-width="1.2" stroke-linecap="round"/>' +
          '</g>' +
        '</g>' +
      '</svg>' +
      '<div class="sn-inner">' +
        '<span class="sn-lbl">Schlangenatmung</span>' +
        '<div class="sn-ttl" id="snTtl_'+uid+'"></div>' +
        '<div class="sn-divider"></div>' +
        '<p class="sn-dsc">' + desc + '</p>' +
      '</div>';

    var snShadow = document.getElementById('snShadow_'+uid);
    var snBody   = document.getElementById('snBody_'+uid);
    var snBelly  = document.getElementById('snBelly_'+uid);
    var snBack   = document.getElementById('snBack_'+uid);
    var snSheen  = document.getElementById('snSheen_'+uid);
    var snHead   = document.getElementById('snHead_'+uid);
    var snTongue = document.getElementById('snTongue_'+uid);
    var titleEl  = document.getElementById('snTtl_'+uid);

    var t=0, idx=0;
    var tongueTimer=0, tongueOut=false, tonguePhase=0;

    function snakePath(t,W,H){
      var pts=[];
      for(var i=0;i<22;i++){
        var prog=i/21;
        var x=prog*W;
        var y=H*.6
          +Math.sin(x*.022-t*1.1)*15
          +Math.sin(x*.014-t*.7)*9
          +Math.sin(x*.038-t*1.7)*5;
        pts.push({x:x,y:y});
      }
      return pts;
    }

    function ptsToPath(pts){
      var d='M'+pts[0].x.toFixed(1)+','+pts[0].y.toFixed(1);
      for(var i=1;i<pts.length-1;i++){
        var mx=((pts[i].x+pts[i+1].x)/2).toFixed(1);
        var my=((pts[i].y+pts[i+1].y)/2).toFixed(1);
        d+=' Q'+pts[i].x.toFixed(1)+','+pts[i].y.toFixed(1)+' '+mx+','+my;
      }
      d+=' L'+pts[pts.length-1].x.toFixed(1)+','+pts[pts.length-1].y.toFixed(1);
      return d;
    }

    function animate(){
      t+=0.016;
      var W=500, H=70;
      var pts=snakePath(t,W,H);
      var d=ptsToPath(pts);
      snShadow.setAttribute('d',d);
      snBody.setAttribute('d',d);
      snBelly.setAttribute('d',d);
      snBack.setAttribute('d',d);
      snSheen.setAttribute('d',d);

      var head=pts[pts.length-1];
      var prev=pts[pts.length-4];
      var angle=Math.atan2(head.y-prev.y,head.x-prev.x)*180/Math.PI;
      snHead.setAttribute('transform',
        'translate('+head.x.toFixed(1)+','+head.y.toFixed(1)+') rotate('+angle.toFixed(1)+')'
      );

      tongueTimer+=0.016;
      if(tongueTimer>1.5+Math.random()*2.5){
        tongueTimer=0; tongueOut=!tongueOut; tonguePhase=0;
      }
      if(tongueOut){
        tonguePhase+=0.25;
        var flick=Math.sin(tonguePhase)*2;
        snTongue.setAttribute('opacity','0.9');
        snTongue.innerHTML=
          '<line x1="12" y1="0" x2="21" y2="'+(-2.5+flick).toFixed(1)+'" stroke="#bb0000" stroke-width="1.2" stroke-linecap="round"/>'+
          '<line x1="12" y1="0" x2="21" y2="'+(2.5+flick).toFixed(1)+'"  stroke="#bb0000" stroke-width="1.2" stroke-linecap="round"/>';
      } else {
        snTongue.setAttribute('opacity','0');
      }
      requestAnimationFrame(animate);
    }
    animate();

    // Typewriter
    function typeNext(){
      if(idx<name.length){
        var sp=document.createElement('span');
        sp.className='sn-wc'; sp.style.animationDelay='0s';
        sp.textContent=name[idx]===' '?'\u00a0':name[idx];
        sp.style.color='#ddff00';
        titleEl.appendChild(sp);
        idx++;
        setTimeout(typeNext,80+Math.random()*60);
      }
    }
    setTimeout(typeNext,400);
  });
});
