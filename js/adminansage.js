console.log("adminansage is loaded");
document.addEventListener("DOMContentLoaded", function () {
  var shardAngles = [8,38,70,100,130,160,190,220,250,280,310,340];

  document.querySelectorAll(".adminansage").forEach(function (el) {
    var raw = el.textContent.trim();
    var parts = raw.split("|");
    var titleText = (parts[0] || "").trim();
    var descText = (parts.slice(1).join("|") || "").trim();

    el.textContent = "";

    // Blitz + Nachglühen
    var flash = document.createElement("div");
    flash.className = "aa-flash";
    el.appendChild(flash);

    var glow = document.createElement("div");
    glow.className = "aa-afterglow";
    el.appendChild(glow);

    // Splitter
    shardAngles.forEach(function (angle) {
      var shard = document.createElement("div");
      shard.className = "aa-shard";
      shard.style.transform = "rotate(" + angle + "deg)";
      el.appendChild(shard);
    });

    // Inhalt
    var content = document.createElement("div");
    content.className = "aa-content";

    var label = document.createElement("div");
    label.className = "aa-label";
    label.textContent = "Admin-Ansage";
    content.appendChild(label);

    var title = document.createElement("div");
    title.className = "aa-title";
    var typed = document.createElement("span");
    typed.className = "aa-typed";
    var cursor = document.createElement("span");
    cursor.className = "aa-cursor";
    cursor.textContent = "|";
    title.appendChild(typed);
    title.appendChild(cursor);
    content.appendChild(title);

    var divider = document.createElement("div");
    divider.className = "aa-divider";
    content.appendChild(divider);

    var desc = document.createElement("div");
    desc.className = "aa-desc";
    desc.textContent = descText;
    content.appendChild(desc);

    el.appendChild(content);

    // Typewriter-Effekt für den Titel
    var i = 0;
    var speed = 55;
    function typeNext() {
      if (i <= titleText.length) {
        typed.textContent = titleText.slice(0, i);
        i++;
        setTimeout(typeNext, speed);
      }
    }
    typeNext();
  });
});
