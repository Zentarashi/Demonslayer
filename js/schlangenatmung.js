/* ================================================
   SCHLANGENATMUNG — JS
   Performance-optimierte Version
   ================================================ */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".schlangenatmung").forEach(function (el) {

    var raw = el.textContent.trim();
    var parts = raw.split("|");
    var name = parts[0] ? parts[0].trim() : "";
    var desc = parts[1] ? parts[1].trim() : "";

    el.innerHTML =
      '<canvas class="sa-scales" aria-hidden="true"></canvas>' +
      '<canvas class="sa-snake" aria-hidden="true"></canvas>' +
      '<div class="sa-inner">' +
        '<span class="sa-lbl">Schlangenatmung</span>' +
        '<div class="sa-ttl"></div>' +
        '<hr class="sa-hr">' +
        '<p class="sa-dsc"></p>' +
      '</div>';

    var scalesCv = el.querySelector(".sa-scales");
    var snakeCv = el.querySelector(".sa-snake");
    var titleEl = el.querySelector(".sa-ttl");
    var descEl = el.querySelector(".sa-dsc");

    descEl.textContent = desc;

    var sCtx = scalesCv.getContext("2d", { alpha: false });
    var nCtx = snakeCv.getContext("2d", { alpha: true });

    var lineT = 0;
    var waveT = 0;
    var idx = 0;
    var spans = [];

    var visible = true;
    var frameId = 0;
    var resizeQueued = false;
    var lastTime = 0;

    var width = 0;
    var height = 0;

    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    var scaleColors = [
      { base: "#2a3038", mid: "#3a4248", dark: "#1a2028" },
      { base: "#1e2830", mid: "#2e3840", dark: "#121820" },
      { base: "#323840", mid: "#424850", dark: "#222830" },
      { base: "#18202a", mid: "#283040", dark: "#101820" }
    ];

    /*
     * Canvas-Größen nur bei tatsächlicher Größenänderung setzen.
     */
    function resize() {
      var cssW = Math.max(1, Math.round(el.clientWidth));
      var cssH = Math.max(1, Math.round(el.clientHeight));

      if (cssW === width && cssH === height) {
        return false;
      }

      width = cssW;
      height = cssH;

      scalesCv.width = Math.round(cssW * dpr);
      scalesCv.height = Math.round(cssH * dpr);

      snakeCv.width = Math.round(cssW * dpr);
      snakeCv.height = Math.round(80 * dpr);

      scalesCv.style.width = cssW + "px";
      scalesCv.style.height = cssH + "px";

      snakeCv.style.width = cssW + "px";
      snakeCv.style.height = "80px";

      sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      return true;
    }


    /*
     * SCHUPPEN
     *
     * Werden NICHT mehr bei jedem Frame gezeichnet.
     * Nur bei Resize.
     */
    function drawScales() {
      var W = width;
      var H = height;

      sCtx.clearRect(0, 0, W, H);

      var sw = 20;
      var sh = 13;

      var cols = Math.ceil(W / sw) + 2;
      var rows = Math.ceil(H / (sh * 0.72)) + 2;

      for (var r = 0; r < rows; r++) {

        for (var c = 0; c < cols; c++) {

          var ox =
            c * sw +
            (r % 2 === 0 ? 0 : sw * 0.5) -
            sw;

          var oy =
            r * sh * 0.72 -
            sh;

          var isBlack =
            ((r * 2 + c) % 5 === 0) ||
            (((r + c) % 4 === 0) &&
             ((r + c) % 6 < 3));

          var col = isBlack
            ? {
                base: "#080a0c",
                mid: "#101416",
                dark: "#040506"
              }
            : scaleColors[(r * 2 + c) % scaleColors.length];

          var csw = sw * 0.52;
          var csh = sh * 0.66;


          /* Schuppe */
          sCtx.beginPath();

          sCtx.ellipse(
            ox,
            oy,
            csw,
            csh,
            0,
            0,
            Math.PI * 2
          );


          /* Gradient */
          var g = sCtx.createRadialGradient(
            ox - csw * 0.25,
            oy - csh * 0.3,
            csh * 0.05,
            ox,
            oy,
            csw * 0.9
          );

          g.addColorStop(0, col.mid);
          g.addColorStop(0.4, col.base);
          g.addColorStop(0.85, col.dark);
          g.addColorStop(1, "#000");

          sCtx.fillStyle = g;
          sCtx.fill();


          /* Rand */
          sCtx.strokeStyle =
            "rgba(" +
            (isBlack
              ? "30,35,40"
              : "70,90,110") +
            ",0.14)";

          sCtx.lineWidth = 0.7;
          sCtx.stroke();


          /* Kleiner Lichtreflex */
          sCtx.beginPath();

          sCtx.ellipse(
            ox - csw * 0.2,
            oy - csh * 0.25,
            csw * 0.15,
            csh * 0.1,
            -0.3,
            0,
            Math.PI * 2
          );

          sCtx.fillStyle =
            "rgba(180,200,220,0.075)";

          sCtx.fill();
        }
      }
    }


    /*
     * SCHLANGE
     *
     * Weniger Punkte als vorher.
     * Dadurch deutlich weniger Zeichenoperationen.
     */
    function drawSnake(dt) {

      var W = width;
      var H = 80;

      lineT += 0.022;

      nCtx.clearRect(0, 0, W, H);

      var step = 6;
      var baseY = H * 0.75;


      /*
       * Zeichnet die Schlangenlinie.
       */
      function drawPath() {

        nCtx.beginPath();

        var first = true;

        for (var x = 0; x <= W + 20; x += step) {

          var y =
            baseY +
            Math.sin(
              x * 0.02 + lineT
            ) * 15 +
            Math.sin(
              x * 0.01 - lineT * 0.6
            ) * 8;


          if (first) {
            nCtx.moveTo(x, y);
            first = false;
          } else {
            nCtx.lineTo(x, y);
          }
        }

        nCtx.stroke();
      }


      nCtx.lineCap = "round";
      nCtx.lineJoin = "round";


      /*
       * Schatten
       */
      nCtx.strokeStyle =
        "rgba(0,0,0,0.6)";

      nCtx.lineWidth = 26;

      drawPath();


      /*
       * Körper
       */
      nCtx.strokeStyle =
        "#1e2830";

      nCtx.lineWidth = 18;

      drawPath();


      /*
       * Innere Schicht
       */
      nCtx.strokeStyle =
        "#2e3a46";

      nCtx.lineWidth = 13;

      drawPath();


      /*
       * Weniger dekorative Elemente.
       */
      var i = 0;

      for (
        var x2 = 0;
        x2 <= W + 20;
        x2 += step, i++
      ) {

        if (i % 16 !== 4) {
          continue;
        }

        var y2 =
          baseY +
          Math.sin(
            x2 * 0.02 + lineT
          ) * 15 +
          Math.sin(
            x2 * 0.01 - lineT * 0.6
          ) * 8;


        var nextX = x2 + step;

        var nextY =
          baseY +
          Math.sin(
            nextX * 0.02 + lineT
          ) * 15 +
          Math.sin(
            nextX * 0.01 - lineT * 0.6
          ) * 8;


        nCtx.save();

        nCtx.translate(
          x2,
          y2
        );

        nCtx.rotate(
          Math.atan2(
            nextY - y2,
            nextX - x2
          )
        );


        nCtx.beginPath();

        nCtx.moveTo(0, -5);
        nCtx.lineTo(6, 0);
        nCtx.lineTo(0, 5);
        nCtx.lineTo(-6, 0);
        nCtx.closePath();


        nCtx.fillStyle =
          "rgba(5,8,10,0.75)";

        nCtx.fill();

        nCtx.restore();
      }


      /*
       * Lichtkante
       */
      nCtx.beginPath();

      var firstLight = true;

      for (
        var x3 = 0;
        x3 <= W + 20;
        x3 += step
      ) {

        var y3 =
          baseY +
          Math.sin(
            x3 * 0.02 + lineT
          ) * 15 +
          Math.sin(
            x3 * 0.01 - lineT * 0.6
          ) * 8;


        if (firstLight) {
          nCtx.moveTo(x3, y3);
          firstLight = false;
        } else {
          nCtx.lineTo(x3, y3);
        }
      }

      nCtx.strokeStyle =
        "rgba(100,140,180,0.12)";

      nCtx.lineWidth = 21;

      nCtx.stroke();
    }


    /*
     * BUCHSTABEN-ANIMATION
     *
     * Nur transformieren.
     * Farbe und text-shadow werden nicht mehr
     * in jedem Frame verändert.
     */
    function waveLoop(dt) {

      waveT += 0.002;

      for (var i = 0; i < spans.length; i++) {

        spans[i].style.transform =
          "translateY(" +
          (
            Math.sin(
              waveT + i * 0.4
            ) * 1.5
          ) +
          "px)";
      }
    }


    /*
     * TEXT TYPING
     */
    function typeNext() {

      if (idx >= name.length) {
        return;
      }

      var sp =
        document.createElement("span");


      sp.textContent =
        name[idx] === " "
          ? "\u00a0"
          : name[idx];


      sp.style.display =
        "inline-block";

      sp.style.color =
        "#ddff00";

      sp.style.textShadow =
        "0 0 12px #aadd00, 2px 2px 4px #000";

      sp.style.textDecoration =
        "none";

      sp.style.opacity =
        "0";

      sp.style.transform =
        "translateY(8px)";

      sp.style.transition =
        "opacity 0.3s ease, transform 0.35s ease";


      titleEl.appendChild(sp);

      spans.push(sp);


      requestAnimationFrame(function () {

        sp.style.opacity = "1";

        sp.style.transform =
          "translateY(0)";
      });


      idx++;

      setTimeout(
        typeNext,
        80 + Math.random() * 65
      );
    }


    /*
     * EINZIGER ANIMATION-LOOP
     */
    function animationFrame(now) {

      if (!visible) {

        frameId = 0;

        return;
      }


      var dt =
        Math.min(
          32,
          now - lastTime || 16
        );

      lastTime = now;


      waveLoop(dt);

      drawSnake(dt);


      frameId =
        requestAnimationFrame(
          animationFrame
        );
    }


    /*
     * Animation starten
     */
    function startAnimation() {

      if (frameId || !visible) {
        return;
      }

      lastTime =
        performance.now();

      frameId =
        requestAnimationFrame(
          animationFrame
        );
    }


    /*
     * Animation stoppen
     */
    function stopAnimation() {

      if (!frameId) {
        return;
      }

      cancelAnimationFrame(
        frameId
      );

      frameId = 0;
    }


    /*
     * RESIZE
     *
     * Nicht bei jedem Frame.
     */
    function handleResize() {

      if (resizeQueued) {
        return;
      }

      resizeQueued = true;


      requestAnimationFrame(
        function () {

          resizeQueued = false;


          if (resize()) {

            drawScales();

            if (visible) {
              startAnimation();
            }
          }
        }
      );
    }


    /*
     * INTERSECTION OBSERVER
     *
     * Animation läuft nur,
     * wenn die Schlangenbox sichtbar ist.
     */
    if (
      "IntersectionObserver" in window
    ) {

      var observer =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(
              function (entry) {

                visible =
                  entry.isIntersecting;


                if (visible) {

                  startAnimation();

                } else {

                  stopAnimation();
                }
              }
            );
          },
          {
            root: null,
            threshold: 0
          }
        );


      observer.observe(el);

    } else {

      visible = true;
    }


    /*
     * RESIZE OBSERVER
     */
    if (
      "ResizeObserver" in window
    ) {

      var resizeObserver =
        new ResizeObserver(
          handleResize
        );

      resizeObserver.observe(el);

    } else {

      window.addEventListener(
        "resize",
        handleResize,
        {
          passive: true
        }
      );
    }


    /*
     * INITIALISIERUNG
     */
    resize();

    drawScales();

    startAnimation();


    /*
     * Textanimation leicht verzögert starten.
     */
    setTimeout(
      typeNext,
      400
    );

  });

});
