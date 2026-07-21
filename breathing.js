console.log("breathing.js is loaded");
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.messageinformation tr').forEach(tr => {
        const tdText = tr.querySelector('td:last-child').textContent.trim(); 

        switch(tdText) {
            case 'Mondsäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#AFEEEE';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #AFEEEE';
                });
                break;

            case 'Wassersäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#0000cd';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #0000cd';
                });
                break;

            case 'Schlangensäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#ffd39b';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #ffd39b';
                });
                break;

            case 'Nebelsäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#bcd2ee';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #bcd2ee';
                });
                break; 

            case 'Insektensäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#bdb76b';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #bdb76b';
                });
                break;

            case 'Windsäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#8fbc8f';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #8fbc8f';
                });
                break;  

            case 'Flammensäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#a52a2a';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #a52a2a';
                });
                break;  

            case 'Klangsäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#c1cdc1';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #c1cdc1';
                });
                break;
            case 'Liebessäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#ffb6c1';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #ffb6c1';
                });
                break;  
            case 'Felssäule':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#ff7f24';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #ff7f24';
                });
                break;

            case 'Mizunoto':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#bcee68';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #bcee68';
                });
                break;

            case 'Mizunoe':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#548b54';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #548b54';
                });
                break;

            case 'Kanoto':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#008b45';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #008b45';
                });
                break;

            case 'Kanoe':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#ee6aa7';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #ee6aa7';
                });
                break;

            case 'Tsuchinoto':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#cd6090';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #cd6090';
                });
                break;

            case 'Tsuchinoe':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#8b0a50';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #8b0a50';
                });
                break;

            case 'Hinoto':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#8968cd';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #8968cd';
                });
                break;

            case 'Hinoe':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#7a378b';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #7a378b';
                });
                break;

            case 'Zephyrael':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#483d8b';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #483d8b';
                });
                break;  
                
            case 'Meisterin':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#b4cdcd';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #b4cdcd';
                });
                break;
                
            case 'Dämon':
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#ff4040';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #ff4040';
                });
                break;

            case '1. Abnehmender Dämonenmond':
            case '2. Abnehmender Dämonenmond':
            case '3. Abnehmender Dämonenmond':
            case '4. Abnehmender Dämonenmond':
            case '5. Abnehmender Dämonenmond':
            case '6. Abnehmender Dämonenmond':
            case '7. Abnehmender Dämonenmond':
            case '8. Abnehmender Dämonenmond':
            case '9. Abnehmender Dämonenmond':
            case '10. Abnehmender Dämonenmond':
            case '11. Abnehmender Dämonenmond':
            case '12. Abnehmender Dämonenmond':                   
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#8b0000';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #8b0000';
                });
                break;
                
            case '1. Zunehmender Dämonenmond':
            case '2. Zunehmender Dämonenmond':
            case '3. Zunehmender Dämonenmond':
            case '4. Zunehmender Dämonenmond':
            case '5. Zunehmender Dämonenmond':
            case '6. Zunehmender Dämonenmond':
            case '7. Zunehmender Dämonenmond':
            case '8. Zunehmender Dämonenmond':
            case '9. Zunehmender Dämonenmond':
            case '10. Zunehmender Dämonenmond':
            case '11. Zunehmender Dämonenmond':
            case '12. Zunehmender Dämonenmond':
            case '13. Zunehmender Dämonenmond':
            case '14. Zunehmender Dämonenmond':
            case '15. Zunehmender Dämonenmond': 
                tr.querySelectorAll('td').forEach(td => {
                    td.style.color = '#00868b';
                    td.style.fontWeight = 'bold';
                    td.style.textShadow = '1px 1px 2px #000, 0 0 6px #00868b';
                });
                break;                 
            // weitere Ränge hier ergänzen
        }
    })
});
// Liebesatmung
document.addEventListener("DOMContentLoaded", function() {

    const targetSpan = document.querySelector("span.Liebesatmung");
    if (!targetSpan) return;

    // Herz-Container direkt über dem Text positionieren
    const heartContainer = document.createElement("div");
    heartContainer.style.position = "absolute";
    heartContainer.style.pointerEvents = "none";
    heartContainer.style.overflow = "visible";
    heartContainer.style.top = targetSpan.offsetTop + "px";
    heartContainer.style.left = targetSpan.offsetLeft + "px";
    heartContainer.style.width = targetSpan.offsetWidth + "px";
    heartContainer.style.height = targetSpan.offsetHeight + "px";
    targetSpan.parentElement.appendChild(heartContainer);

    const heartTypes = ["&#10084;", "&#128150;", "&#128151;", "&#128149;", "&#128152;"];

    function createHeart() {
        const heart = document.createElement("span");
        heart.classList.add("heart-particle");
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];

        const size = Math.random() * 10 + 5;
        heart.style.fontSize = size + "px";
        heart.style.opacity = (Math.random() * 0.2 + 0.2).toFixed(2); // 0.2–0.4
        // Startposition unten im Container
        heart.style.left = Math.random() * heartContainer.offsetWidth + "px";
        heart.style.top = heartContainer.offsetHeight + "px";


        const duration = Math.random() * 2 + 2; // 2–4 Sekunden
        heart.style.animationDuration = duration + "s";

        // zufällige Aufwärtsbewegung
        const rise = Math.random() * 50 + 30; // 30–80px hoch
        heart.style.transform = `translateY(0)`;
        heart.style.animationName = "floatUp";

        heartContainer.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    // Herzregen Intervall: viele gleichzeitig
    const interval = setInterval(() => {
        const count = Math.floor(Math.random() * 4) + 1; // 2–5 Herzen pro Intervall
        for (let i = 0; i < count; i++) createHeart();
    }, 1000);

    // Stoppen, falls das Span entfernt wird
    const observer = new MutationObserver(() => {
        if (!document.body.contains(targetSpan)) {
            clearInterval(interval);
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});

// blutigedaemonenkunst
document.addEventListener("DOMContentLoaded", function () {
 
  var kanjiPool = [
    '上','弦','壱','弐','参','肆','伍','陸',
    '下','弦','壱','弐','参','肆','伍','陸'
  ];
 
  document.querySelectorAll(".blutigedaemonenkunst").forEach(function (el) {
 
    // Inhalt auslesen und aufteilen (Trenner: |)
    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";
 
    // Grundstruktur aufbauen
    el.innerHTML =
      '<div class="drip-bar">' +
        '<div class="drip"></div>' +
        '<div class="drip"></div>' +
        '<div class="drip"></div>' +
        '<div class="drip"></div>' +
        '<div class="drip"></div>' +
        '<div class="drip"></div>' +
      '</div>' +
      '<div class="kanji-bg"></div>' +
      '<div class="mist">' +
        '<div class="mist-layer"></div>' +
        '<div class="mist-layer"></div>' +
        '<div class="mist-layer"></div>' +
      '</div>' +
      '<div class="corner tl"></div>' +
      '<div class="corner tr"></div>' +
      '<div class="corner bl"></div>' +
      '<div class="corner br"></div>' +
      '<div class="tech-label">Blutige Dämonenkunst</div>' +
      '<div class="tech-title"><span class="cursor"></span></div>' +
      '<hr class="tech-line">' +
      '<div class="tech-desc">' + desc + '</div>';
 
    // Kanji zufällig spawnen
    var kanjiBg = el.querySelector(".kanji-bg");
 
    function spawnKanji() {
      var k    = document.createElement("span");
      k.className = "kanji-float";
      k.textContent = kanjiPool[Math.floor(Math.random() * kanjiPool.length)];
      var size  = 24 + Math.floor(Math.random() * 48);
      var dur   = 4 + Math.random() * 5;
      var delay = Math.random() * 3;
      k.style.fontSize          = size + "px";
      k.style.left              = (5 + Math.random() * 88) + "%";
      k.style.top               = (5 + Math.random() * 80) + "%";
      k.style.animationDuration = dur + "s";
      k.style.animationDelay    = delay + "s";
      kanjiBg.appendChild(k);
      setTimeout(function () { k.remove(); }, (dur + delay) * 1000);
    }
 
    for (var i = 0; i < 6; i++) {
      setTimeout(spawnKanji, i * 600);
    }
    setInterval(spawnKanji, 1200);
 
    // Typewriter-Effekt für den Technik-Namen
    var titleEl = el.querySelector(".tech-title");
    var idx     = 0;
 
    function typeNext() {
      if (idx <= name.length) {
        titleEl.innerHTML = name.slice(0, idx) + '<span class="cursor"></span>';
        idx++;
        setTimeout(typeNext, 60 + Math.random() * 80);
      }
    }
 
    setTimeout(typeNext, 600);
  });
 
});
// kirschbluetenatmung
document.addEventListener("DOMContentLoaded", function () {
 
  document.querySelectorAll(".kirschbluetenatmung").forEach(function (el) {
 
    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";
 
    el.innerHTML =
 
      /* Blüte 1 — groß links */
      '<div class="bloom-wrap bloom-1"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><radialGradient id="kbpg1" cx="50%" cy="65%" r="55%"><stop offset="0%" stop-color="#ffd6e0" stop-opacity="1"/><stop offset="50%" stop-color="#ff9eb5" stop-opacity="0.9"/><stop offset="100%" stop-color="#c2185b" stop-opacity="0.3"/></radialGradient></defs>' +
        '<g class="bloom-petal" style="--rot:0deg;transform-origin:50px 50px;transform:rotate(0deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg1)"/></g>' +
        '<g class="bloom-petal" style="--rot:72deg;transform-origin:50px 50px;transform:rotate(72deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg1)"/></g>' +
        '<g class="bloom-petal" style="--rot:144deg;transform-origin:50px 50px;transform:rotate(144deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg1)"/></g>' +
        '<g class="bloom-petal" style="--rot:216deg;transform-origin:50px 50px;transform:rotate(216deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg1)"/></g>' +
        '<g class="bloom-petal" style="--rot:288deg;transform-origin:50px 50px;transform:rotate(288deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg1)"/></g>' +
        '<g class="bloom-center">' +
          '<circle cx="50" cy="50" r="10" fill="#fff0f5" opacity="0.9"/>' +
          '<circle cx="50" cy="37" r="2.5" fill="#ffe0e8"/><circle cx="61" cy="44" r="2.5" fill="#ffe0e8"/><circle cx="57" cy="57" r="2.5" fill="#ffe0e8"/><circle cx="43" cy="57" r="2.5" fill="#ffe0e8"/><circle cx="39" cy="44" r="2.5" fill="#ffe0e8"/>' +
          '<line x1="50" y1="50" x2="50" y2="37" stroke="#ffb7c5" stroke-width="0.8" opacity="0.7"/><line x1="50" y1="50" x2="61" y2="44" stroke="#ffb7c5" stroke-width="0.8" opacity="0.7"/><line x1="50" y1="50" x2="57" y2="57" stroke="#ffb7c5" stroke-width="0.8" opacity="0.7"/><line x1="50" y1="50" x2="43" y2="57" stroke="#ffb7c5" stroke-width="0.8" opacity="0.7"/><line x1="50" y1="50" x2="39" y2="44" stroke="#ffb7c5" stroke-width="0.8" opacity="0.7"/>' +
        '</g></svg></div>' +
 
      /* Blüte 2 — Mitte */
      '<div class="bloom-wrap bloom-2"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><radialGradient id="kbpg2" cx="50%" cy="65%" r="55%"><stop offset="0%" stop-color="#ffc8d5" stop-opacity="1"/><stop offset="55%" stop-color="#ff85a1" stop-opacity="0.85"/><stop offset="100%" stop-color="#ad1457" stop-opacity="0.3"/></radialGradient></defs>' +
        '<g class="bloom-petal" style="--rot:0deg;transform-origin:50px 50px;transform:rotate(0deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg2)"/></g>' +
        '<g class="bloom-petal" style="--rot:72deg;transform-origin:50px 50px;transform:rotate(72deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg2)"/></g>' +
        '<g class="bloom-petal" style="--rot:144deg;transform-origin:50px 50px;transform:rotate(144deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg2)"/></g>' +
        '<g class="bloom-petal" style="--rot:216deg;transform-origin:50px 50px;transform:rotate(216deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg2)"/></g>' +
        '<g class="bloom-petal" style="--rot:288deg;transform-origin:50px 50px;transform:rotate(288deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg2)"/></g>' +
        '<g class="bloom-center"><circle cx="50" cy="50" r="9" fill="#fff0f5" opacity="0.85"/><circle cx="50" cy="38" r="2" fill="#ffe0e8"/><circle cx="60" cy="45" r="2" fill="#ffe0e8"/><circle cx="56" cy="57" r="2" fill="#ffe0e8"/><circle cx="44" cy="57" r="2" fill="#ffe0e8"/><circle cx="40" cy="45" r="2" fill="#ffe0e8"/><line x1="50" y1="50" x2="50" y2="38" stroke="#ffb7c5" stroke-width="0.8" opacity="0.6"/><line x1="50" y1="50" x2="60" y2="45" stroke="#ffb7c5" stroke-width="0.8" opacity="0.6"/><line x1="50" y1="50" x2="56" y2="57" stroke="#ffb7c5" stroke-width="0.8" opacity="0.6"/><line x1="50" y1="50" x2="44" y2="57" stroke="#ffb7c5" stroke-width="0.8" opacity="0.6"/><line x1="50" y1="50" x2="40" y2="45" stroke="#ffb7c5" stroke-width="0.8" opacity="0.6"/></g>' +
      '</svg></div>' +
 
      /* Blüte 3 — klein rechts */
      '<div class="bloom-wrap bloom-3"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><radialGradient id="kbpg3" cx="50%" cy="65%" r="55%"><stop offset="0%" stop-color="#ffe0e8" stop-opacity="1"/><stop offset="55%" stop-color="#ffb7c5" stop-opacity="0.8"/><stop offset="100%" stop-color="#c2185b" stop-opacity="0.2"/></radialGradient></defs>' +
        '<g class="bloom-petal" style="--rot:0deg;transform-origin:50px 50px;transform:rotate(0deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg3)"/></g>' +
        '<g class="bloom-petal" style="--rot:72deg;transform-origin:50px 50px;transform:rotate(72deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg3)"/></g>' +
        '<g class="bloom-petal" style="--rot:144deg;transform-origin:50px 50px;transform:rotate(144deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg3)"/></g>' +
        '<g class="bloom-petal" style="--rot:216deg;transform-origin:50px 50px;transform:rotate(216deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg3)"/></g>' +
        '<g class="bloom-petal" style="--rot:288deg;transform-origin:50px 50px;transform:rotate(288deg)"><ellipse cx="50" cy="22" rx="14" ry="28" fill="url(#kbpg3)"/></g>' +
        '<g class="bloom-center"><circle cx="50" cy="50" r="8" fill="#fff0f5" opacity="0.8"/></g>' +
      '</svg></div>' +
 
      '<div class="petals-container" id="kbPetals_' + Date.now() + '"></div>' +
      '<div class="mist"><div class="mist-layer"></div><div class="mist-layer"></div><div class="mist-layer"></div></div>' +
      '<div class="tech-label">Kirschblüten-Atmung</div>' +
      '<div class="tech-title"><span class="cursor"></span></div>' +
      '<hr class="tech-line">' +
      '<div class="tech-desc">' + desc + '</div>';
 
    /* Fallende Blütenblätter */
    var petalContainer = el.querySelector('.petals-container');
    var colors = ['#ffb7c5','#ff9eb5','#ffc8d5','#ff85a1','#ffe0e8','#ffccd5','#ffd6e0'];
 
    function createPetal() {
      var p     = document.createElement('div');
      p.className = 'petal';
      var size  = 6 + Math.random() * 11;
      var color = colors[Math.floor(Math.random() * colors.length)];
      var left  = Math.random() * 100;
      var dur   = 3.5 + Math.random() * 4;
      var delay = Math.random() * 5;
      var drift = (Math.random() * 40 - 20);
      p.innerHTML =
        '<svg width="' + size + '" height="' + (size * 1.4) + '" viewBox="0 0 10 14">' +
          '<path d="M5 0 C8.5 1.5,10 6,7.5 10.5 C6.5 12.5,5 14,5 14 C5 14,3.5 12.5,2.5 10.5 C0 6,1.5 1.5,5 0Z" fill="' + color + '" opacity="0.88"/>' +
          '<path d="M5 0.5 C6 2,7 5,6.8 9" stroke="#fff8" stroke-width="0.6" fill="none"/>' +
          '<path d="M5 0.5 C4 2,3.5 5,3.8 8.5" stroke="#fff4" stroke-width="0.4" fill="none"/>' +
        '</svg>';
      p.style.left = left + '%';
      p.style.animationDuration = dur + 's';
      p.style.animationDelay = delay + 's';
      p.style.marginLeft = drift + 'px';
      petalContainer.appendChild(p);
      setTimeout(function () { p.remove(); }, (dur + delay) * 1000 + 500);
    }
 
    for (var i = 0; i < 16; i++) setTimeout(createPetal, i * 160);
    setInterval(createPetal, 360);
 
    /* Typewriter */
    var titleEl = el.querySelector('.tech-title');
    var idx = 0;
    function typeNext() {
      if (idx <= name.length) {
        titleEl.innerHTML = name.slice(0, idx) + '<span class="cursor"></span>';
        idx++;
        setTimeout(typeNext, 70 + Math.random() * 60);
      }
    }
    setTimeout(typeNext, 500);
  });
});

// mondatmung
document.addEventListener("DOMContentLoaded", function () {
 
  document.querySelectorAll(".mondatmung").forEach(function (el) {
 
    var raw   = el.textContent.trim();
    var parts = raw.split("|");
    var name  = parts[0] ? parts[0].trim() : "";
    var desc  = parts[1] ? parts[1].trim() : "";
 
    el.innerHTML =
      '<div class="moonwave"></div>' +
      '<div class="stars"></div>' +
      '<canvas class="light-cone"></canvas>' +
 
      /* Staubpartikel */
      '<div class="dust" style="width:3px;height:3px;top:5%;left:2%;--dx:35px;--dy:25px;animation-duration:4s;animation-delay:0s;"></div>' +
      '<div class="dust" style="width:2px;height:2px;top:12%;left:4%;--dx:50px;--dy:18px;animation-duration:5.5s;animation-delay:0.8s;"></div>' +
      '<div class="dust" style="width:2px;height:2px;top:3%;left:6%;--dx:20px;--dy:40px;animation-duration:6s;animation-delay:1.5s;"></div>' +
      '<div class="dust" style="width:3px;height:3px;top:20%;left:1%;--dx:70px;--dy:15px;animation-duration:4.5s;animation-delay:2.2s;"></div>' +
      '<div class="dust" style="width:1px;height:1px;top:8%;left:10%;--dx:25px;--dy:45px;animation-duration:7s;animation-delay:0.5s;"></div>' +
      '<div class="dust" style="width:2px;height:2px;top:30%;left:2%;--dx:80px;--dy:10px;animation-duration:5s;animation-delay:3s;"></div>' +
 
      /* Eclipse */
      '<div class="eclipse-wrap">' +
        '<div class="corona"></div>' +
        '<div class="corona2"></div>' +
        '<div class="moon-body"></div>' +
        '<div class="eclipse-shadow"></div>' +
        '<div class="corona-eclipse"></div>' +
        '<div class="ray-line"></div><div class="ray-line"></div><div class="ray-line"></div><div class="ray-line"></div>' +
        '<div class="ray-line"></div><div class="ray-line"></div><div class="ray-line"></div><div class="ray-line"></div>' +
      '</div>' +
 
      '<div class="mist"><div class="mist-layer"></div><div class="mist-layer"></div></div>' +
      '<div class="tech-label">Mondatmung</div>' +
      '<div class="tech-title"><span class="cursor"></span></div>' +
      '<hr class="tech-line">' +
      '<div class="tech-desc">' + desc + '</div>';
 
    /* Sterne */
    var starsEl = el.querySelector('.stars');
    for (var i = 0; i < 30; i++) {
      var s = document.createElement('div');
      s.className = 'star';
      var sz = Math.random() > .6 ? 2 : 1;
      s.style.width  = sz + 'px';
      s.style.height = sz + 'px';
      s.style.left   = (Math.random() * 100) + '%';
      s.style.top    = (Math.random() * 100) + '%';
      s.style.animationDuration = (1.5 + Math.random() * 3.5) + 's';
      s.style.animationDelay   = (Math.random() * 5) + 's';
      starsEl.appendChild(s);
    }
 
    /* Canvas Lichtkegel */
    var canvas = el.querySelector('.light-cone');
    var t = 0;
    function drawBeam(alpha) {
      canvas.width  = el.offsetWidth;
      canvas.height = el.offsetHeight;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var W = canvas.width, H = canvas.height;
 
      var g1 = ctx.createLinearGradient(0, 0, W * .6, H);
      g1.addColorStop(0,   'rgba(176,232,226,' + (.22 * alpha) + ')');
      g1.addColorStop(.4,  'rgba(123,200,192,' + (.08 * alpha) + ')');
      g1.addColorStop(1,   'rgba(123,200,192,0)');
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(W*.7,0); ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath();
      ctx.fillStyle = g1; ctx.fill();
 
      var g2 = ctx.createLinearGradient(0, 0, W * .4, H);
      g2.addColorStop(0,   'rgba(208,245,240,' + (.18 * alpha) + ')');
      g2.addColorStop(.3,  'rgba(123,200,192,' + (.07 * alpha) + ')');
      g2.addColorStop(1,   'rgba(123,200,192,0)');
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(W*.42,0); ctx.lineTo(W*.72,H); ctx.lineTo(0,H); ctx.closePath();
      ctx.fillStyle = g2; ctx.fill();
 
      var g3 = ctx.createLinearGradient(0, 0, W * .2, H);
      g3.addColorStop(0,   'rgba(240,255,252,' + (.14 * alpha) + ')');
      g3.addColorStop(.2,  'rgba(176,232,226,' + (.06 * alpha) + ')');
      g3.addColorStop(1,   'rgba(123,200,192,0)');
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(W*.18,0); ctx.lineTo(W*.42,H); ctx.lineTo(0,H); ctx.closePath();
      ctx.fillStyle = g3; ctx.fill();
    }
 
    (function animateBeam() {
      t += 0.012;
      drawBeam(0.7 + 0.3 * Math.sin(t));
      requestAnimationFrame(animateBeam);
    })();
 
    /* Typewriter */
    var titleEl = el.querySelector('.tech-title');
    var idx = 0;
    function typeNext() {
      if (idx <= name.length) {
        titleEl.innerHTML = name.slice(0, idx) + '<span class="cursor"></span>';
        idx++;
        setTimeout(typeNext, 65 + Math.random() * 55);
      }
    }
    setTimeout(typeNext, 500);
  });
 
});

// WASSERATMUNG
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

// ENGELSATMUNG
document.querySelectorAll('.engelsatmung').forEach(function (el, index) {
  if (el.dataset.esInit) return;
  el.dataset.esInit = '1';
 
  var raw = el.textContent.trim();
  var parts = raw.split('|');
  var technikname = (parts[0] || '').trim();
  var beschreibung = (parts.slice(1).join('|') || '').trim();
 
  // Eindeutige IDs pro Instanz, falls mehrere Engelsatmung-Blöcke
  // auf derselben Seite stehen (sonst kollidieren SVG-IDs)
  var uid = 'es' + index + '-' + Math.random().toString(36).slice(2, 7);
  var featherId = 'feather-' + uid;
  var gradId = 'grad-' + uid;
 
  // 5 Federn pro Flügel: große innen (nah am Körper), kleine außen
  var featherSpecs = [
    { open: -14,  scale: 2.8, delay: '.5s'  },
    { open: -40,  scale: 2.4, delay: '.38s' },
    { open: -68,  scale: 2.0, delay: '.26s' },
    { open: -96,  scale: 1.7, delay: '.13s' },
    { open: -124, scale: 1.4, delay: '0s'   }
  ];
 
  function makeFeatherGroups() {
    return featherSpecs.map(function (f) {
      return '<g class="es-fgroup" style="animation-delay:' + f.delay + ';--open:' + f.open + 'deg;">' +
               '<use href="#' + featherId + '" fill="url(#' + gradId + ')" transform="scale(' + f.scale + ')"/>' +
             '</g>';
    }).join('');
  }
 
  var wingDefs =
    '<defs>' +
      '<path id="' + featherId + '" d="M0,0 C-10,-14 -14,-40 -9,-72 C-5,-95 -2,-108 0,-116 C2,-108 5,-95 9,-72 C14,-40 10,-14 0,0 Z"/>' +
      '<linearGradient id="' + gradId + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#fff"/>' +
        '<stop offset="55%" stop-color="#f0e2c4"/>' +
        '<stop offset="100%" stop-color="rgba(255,255,255,.15)"/>' +
      '</linearGradient>' +
    '</defs>';
 
  var wingLeft =
    '<svg class="es-wings" width="1" height="1" style="overflow:visible;left:50%;bottom:20px;">' +
      wingDefs + makeFeatherGroups() +
    '</svg>';
 
  var wingRight =
    '<svg class="es-wings" width="1" height="1" style="overflow:visible;left:50%;bottom:20px;transform:scaleX(-1);">' +
      makeFeatherGroups() +
    '</svg>';
 
  el.innerHTML =
    '<div class="es-fx">' +
      '<div class="es-rim es-rim-l"></div>' +
      '<div class="es-rim es-rim-r"></div>' +
      '<div class="es-rays"></div>' +
      '<div class="es-glow"></div>' +
      '<div class="es-halo"></div>' +
    '</div>' +
    '<div class="es-spark" style="width:3px;height:3px;top:14%;left:75%;animation-delay:.5s;"></div>' +
    '<div class="es-spark" style="width:4px;height:4px;top:24%;left:85%;animation-delay:1.8s;"></div>' +
    '<div class="es-spark" style="width:3px;height:3px;top:9%;left:60%;animation-delay:3.3s;"></div>' +
    '<div class="es-spark" style="width:4px;height:4px;top:20%;left:15%;animation-delay:4.8s;"></div>' +
    wingLeft + wingRight +
    '<div class="es-content">' +
      '<div class="es-label">Engelsatmung</div>' +
      '<div class="es-title"><span class="es-typewriter"></span></div>' +
      '<div class="es-divider"></div>' +
      '<div class="es-desc"></div>' +
    '</div>';
 
  var titleEl = el.querySelector('.es-typewriter');
  var descEl = el.querySelector('.es-desc');
  descEl.textContent = beschreibung;
 
  // Typewriter startet, sobald die Flügel ihre volle Öffnung
  // erreicht haben (48% von 12s Zyklus)
  var i = 0;
  function type() {
    if (i <= technikname.length) {
      titleEl.textContent = technikname.slice(0, i);
      i++;
      setTimeout(type, 90);
    }
  }
  setTimeout(type, 5760);
});

// PHOENIXATMUNG
document.querySelectorAll('.phoenixatmung').forEach(function (el) {
  if (el.dataset.pxInit) return;
  el.dataset.pxInit = '1';

  var raw = el.textContent.trim();
  var parts = raw.split('|');
  var technikname = (parts[0] || '').trim();
  var beschreibung = (parts.slice(1).join('|') || '').trim();

  el.innerHTML =
    '<div class="px-glow"></div>' +
    '<div class="px-fire px-fire-bottom"></div>' +
    '<div class="px-fire px-fire-top"></div>' +
    '<div class="px-phoenix"></div>' +
    '<div class="px-content">' +
      '<div class="px-label">Phoenixatmung</div>' +
      '<div class="px-title"><span class="px-typewriter"></span></div>' +
      '<div class="px-divider"></div>' +
      '<div class="px-desc"></div>' +
    '</div>';

  var titleEl = el.querySelector('.px-typewriter');
  var descEl = el.querySelector('.px-desc');
  descEl.textContent = beschreibung;

  // Typewriter startet, sobald der Phönix seine volle
  // Sichtbarkeit erreicht hat (38% von 12s Zyklus)
  var i = 0;
  function type() {
    if (i <= technikname.length) {
      titleEl.textContent = technikname.slice(0, i);
      i++;
      setTimeout(type, 90);
    }
  }
  setTimeout(type, 4560);
});
