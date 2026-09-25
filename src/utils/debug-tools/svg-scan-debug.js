(function(){
  if(window.__vgDiag){window.__vgDiag.stop();delete window.__vgDiag;}

  var fpMap = {}; // fingerprint -> { locations: Set, info }
  var svgPathCache = new WeakMap(); // svg -> last seen d0
  var running = true;

  function getRegion(svg) {
    var el = svg;
    for (var i = 0; i < 15; i++) {
      el = el.parentElement;
      if (!el) return "UNKNOWN";
      var cl = (typeof el.className === "string") ? el.className : (el.className.baseVal || "");
      if (cl.includes("main-topBar-container")) return "TOPBAR";
      if (cl.includes("main-globalNav-search")) return "TOPBAR-SEARCH";
      if (cl.includes("topbarContentRight")) return "TOPBAR-RIGHT";
      if (cl.includes("main-yourLibraryX-header")) return "SIDEBAR-HEADER";
      if (cl.includes("main-yourLibraryX-collapse")) return "SIDEBAR-COLLAPSE";
      if (cl.includes("main-yourLibraryX-libraryRootlist")) return "SIDEBAR-LIST";
      if (cl.includes("main-yourLibraryX-libraryFilter")) return "SIDEBAR-FILTER";
      if (cl.includes("Root__right-sidebar")) return "RIGHT-SIDEBAR";
      if (cl.includes("vg-player-controls") || cl.includes("player-controls__buttons")) return "PLAYER-CONTROLS";
      if (cl.includes("vg-np-extra-controls")) return "PLAYER-EXTRA";
      if (cl.includes("vg-volume-bar")) return "PLAYER-VOLUME";
      if (cl.includes("main-contextMenu")) return "CONTEXT-MENU";
      if (el.hasAttribute && el.hasAttribute("data-tippy-root")) return "TIPPY-POPUP";
      if (el.getAttribute && el.getAttribute("role") === "menu") return "MENU-POPUP";
      if (cl.includes("Root__main-view")) return "MAIN-VIEW";
      if (cl.includes("main-nowPlayingBar") || cl.includes("now-playing-bar")) return "PLAYER-BAR";
    }
    return "OTHER";
  }

  function getContext(svg) {
    var el = svg;
    var ariaLabel = "", text = "", btnTag = "", testId = "";
    for (var i = 0; i < 10; i++) {
      el = el.parentElement;
      if (!el) break;
      if (!ariaLabel && el.getAttribute("aria-label")) ariaLabel = el.getAttribute("aria-label");
      if (!testId && el.getAttribute("data-testid")) testId = el.getAttribute("data-testid");
      if (!btnTag && (el.tagName === "BUTTON" || el.tagName === "A" || el.tagName === "LI")) {
        btnTag = el.tagName;
        var clone = el.cloneNode(true);
        clone.querySelectorAll("svg").forEach(function(s){s.remove()});
        var t = clone.textContent.trim();
        if (t) text = t.substring(0, 80);
      }
    }
    return { ariaLabel: ariaLabel, text: text, btnTag: btnTag, testId: testId };
  }

  function processSvg(svg) {
    var paths = svg.querySelectorAll("path");
    var circles = svg.querySelectorAll("circle");
    if (paths.length === 0 && circles.length === 0) return;

    var ds = [];
    paths.forEach(function(p) { ds.push((p.getAttribute("d")||"").substring(0,60)); });
    var d0 = ds[0] || "(circles-only:" + circles.length + ")";

    // Check if this SVG's path changed since last scan (state variant)
    var prevD = svgPathCache.get(svg);
    if (prevD === d0) return; // same as before, skip
    svgPathCache.set(svg, d0);

    var region = getRegion(svg);
    var ctx = getContext(svg);
    var vgIcon = svg.dataset.vgIcon || "";
    var viewBox = svg.getAttribute("viewBox") || "";

    // Build location key
    var locParts = [region];
    if (ctx.ariaLabel) locParts.push("label:" + ctx.ariaLabel);
    if (ctx.text) locParts.push("text:" + ctx.text);
    if (ctx.testId) locParts.push("testid:" + ctx.testId);
    var locationKey = locParts.join(" | ");

    // Visual highlight
    if (vgIcon) {
      svg.style.outline = "2px solid #00ff88";
      svg.style.outlineOffset = "2px";
    } else {
      svg.style.outline = "2px solid #ff3333";
      svg.style.outlineOffset = "2px";
    }

    // Store grouped by fingerprint
    if (!fpMap[d0]) {
      fpMap[d0] = {
        d0: d0,
        ds: ds,
        pathCount: paths.length,
        circleCount: circles.length,
        viewBox: viewBox,
        vgIcon: vgIcon,
        locations: {}
      };
    }
    // Update vgIcon if found
    if (vgIcon && !fpMap[d0].vgIcon) fpMap[d0].vgIcon = vgIcon;
    // Add location (dedupe via key)
    fpMap[d0].locations[locationKey] = {
      region: region,
      ariaLabel: ctx.ariaLabel,
      text: ctx.text,
      btnTag: ctx.btnTag,
      testId: ctx.testId
    };
  }

  function deepScan() {
    if (!running) return;
    document.querySelectorAll("svg").forEach(processSvg);
  }

  // Initial + periodic deep scan (catches state variants)
  deepScan();
  var interval = setInterval(deepScan, 1500);

  // Observer for new DOM nodes
  var observer = new MutationObserver(function(mutations) {
    for (var m = 0; m < mutations.length; m++) {
      for (var n = 0; n < mutations[m].addedNodes.length; n++) {
        var node = mutations[m].addedNodes[n];
        if (!(node instanceof HTMLElement)) continue;
        if (node.tagName === "svg" || node.tagName === "SVG") {
          processSvg(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll("svg").forEach(processSvg);
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  function buildReport() {
    var lines = [];
    lines.push("═══════════════════════════════════════════════════");
    lines.push("  VANTAGRAPH SVG SCAN REPORT");
    lines.push("  " + new Date().toLocaleString());
    lines.push("═══════════════════════════════════════════════════");
    lines.push("");

    var keys = Object.keys(fpMap).sort();
    var mapped = 0, unmapped = 0;

    // Group by region for overview
    var byRegion = {};
    keys.forEach(function(fp) {
      var entry = fpMap[fp];
      Object.keys(entry.locations).forEach(function(lk) {
        var loc = entry.locations[lk];
        if (!byRegion[loc.region]) byRegion[loc.region] = [];
        byRegion[loc.region].push({ fp: fp, entry: entry, loc: loc });
      });
      if (entry.vgIcon) mapped++; else unmapped++;
    });

    lines.push("SUMMARY:");
    lines.push("  Unique fingerprints: " + keys.length);
    lines.push("  Mapped (vgIcon):     " + mapped);
    lines.push("  Unmapped:            " + unmapped);
    lines.push("");

    // Per-region overview
    lines.push("BY REGION:");
    Object.keys(byRegion).sort().forEach(function(r) {
      var items = byRegion[r];
      var m = items.filter(function(i){return i.entry.vgIcon}).length;
      var u = items.filter(function(i){return !i.entry.vgIcon}).length;
      lines.push("  " + r + ": " + items.length + " (mapped:" + m + " unmapped:" + u + ")");
    });
    lines.push("");

    // Full detail per fingerprint
    lines.push("═══════════════════════════════════════════════════");
    lines.push("  ALL UNIQUE SVGS (grouped by fingerprint)");
    lines.push("═══════════════════════════════════════════════════");
    lines.push("");

    keys.forEach(function(fp, idx) {
      var e = fpMap[fp];
      var status = e.vgIcon ? "[MAPPED: " + e.vgIcon + "]" : "[UNMAPPED]";
      var locs = Object.keys(e.locations);

      lines.push("─── #" + (idx+1) + " " + status + " ───");
      lines.push("  d0: " + e.d0);
      if (e.ds && e.ds[1]) lines.push("  d1: " + e.ds[1]);
      lines.push("  paths:" + e.pathCount + " circles:" + e.circleCount + " viewBox:" + e.viewBox);
      lines.push("  Found in " + locs.length + " location(s):");

      locs.forEach(function(lk) {
        var loc = e.locations[lk];
        var parts = ["    → " + loc.region];
        if (loc.ariaLabel) parts.push("label:\"" + loc.ariaLabel + "\"");
        if (loc.text) parts.push("text:\"" + loc.text + "\"");
        if (loc.testId) parts.push("testid:" + loc.testId);
        if (loc.btnTag) parts.push("tag:" + loc.btnTag);
        lines.push(parts.join(" | "));
      });
      lines.push("");
    });

    return lines.join("\n");
  }

  function downloadReport() {
    var txt = buildReport();
    var blob = new Blob([txt], {type: "text/plain"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "vantagraph-svg-scan.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("%c[DIAG] Report downloaded: vantagraph-svg-scan.txt","color:#00ff88;font-weight:bold");
  }

  function stop() {
    running = false;
    observer.disconnect();
    clearInterval(interval);
    // Remove highlights
    document.querySelectorAll("svg").forEach(function(svg) {
      svg.style.removeProperty("outline");
      svg.style.removeProperty("outline-offset");
    });
    downloadReport();
    console.log("%c[DIAG] Stopped.","color:#ff9500;font-weight:bold");
  }

  window.__vgDiag = { stop: stop, download: downloadReport, data: fpMap };

  console.log("%c🔴 LIVE SCANNING - Dolaş, tıkla, toggle yap.","color:#ff3333;font-weight:bold;font-size:14px");
  console.log("%c   Kırmızı=unmapped  Yeşil=mapped","color:#ffcc00");
  console.log("%c   State değiştir: shuffle/smart, repeat/once, mute/unmute","color:#ffcc00");
  console.log("%c","color:#ffcc00");
  console.log("%c   window.__vgDiag.stop()     → Durdur + TXT indir","color:#00ff88;font-weight:bold");
  console.log("%c   window.__vgDiag.download()  → Sadece TXT indir","color:#00ff88;font-weight:bold");
})();
