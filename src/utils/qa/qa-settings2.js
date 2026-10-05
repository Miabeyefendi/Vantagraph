// Follow-up matrix: visual snippets in both directions, remaining hide snippets, dev tools, custom accent.
const fs = require("fs"), path = require("path");
const { connect, sleep, DIR } = require("./qa-lib");
const label = process.argv[2] || "run2";
(async () => {
  const c = await connect(); const { ev, go, sample, pause, issues } = c;
  console.log("park:", c.park()); await pause();
  const rows = []; const add = (group, name, s, problems = [], extra = "") => { rows.push({ group, name, s, problems, extra }); console.log(`${group.padEnd(8)} ${String(name).padEnd(40)} busy ${String(s?.busy ?? "-").padStart(3)}% fps ${String(s?.fps ?? "-").padStart(3)} long ${s?.long ?? "-"} worst ${String(s?.worst ?? "-").padStart(3)}ms loaf ${s?.loaf ?? "-"}/${s?.loafMax ?? "-"}ms ${extra}${problems.length ? " !! " + problems.join("; ") : ""}`); };
  const PFX = (await ev(`window.VantagraphData ? 'vantagraph:' : 'vantagraph-custom:'`)); const snap = await ev(`(() => { const o = {}; for (const k of Object.keys(localStorage)) if (k.startsWith('vantagraph')) o[k] = localStorage.getItem(k); return o; })()`);
  const D = (code) => ev(`(() => { const D = (window.VantagraphData || window.VantagraphCustomData); ${code} })()`);
  const set = (k, v) => D(`D.applySetting(${JSON.stringify(k)}, ${JSON.stringify(v)});`);
  const styleIds = () => ev(`[...document.querySelectorAll('style')].map(s => s.id).filter(Boolean)`);
  const step = async (group, name, on, off, check, ms = 1500) => {
    const i0 = issues.length; const before = await styleIds();
    await on(); await sleep(900); const ck = check ? await check(true, before) : { ok: true }; const s = await sample(ms);
    const problems = []; if (!ck.ok) problems.push(ck.why || "effect check failed"); if (issues.length > i0) problems.push(...issues.slice(i0));
    await off(); await sleep(700); const ck2 = check ? await check(false, before) : { ok: true }; if (!ck2.ok) problems.push("off: " + (ck2.why || "did not revert"));
    add(group, name, s, problems, ck.note || "");
  };
  await go("/", 3800);
  const base = await sample(3000); add("baseline", "idle home", base);

  // visual snippets: effect in both directions
  await step("visual", "rounded-images OFF (radius reverts)", () => set("snippet-rounded-images", "false"), () => set("snippet-rounded-images", snap[PFX + "snippet-rounded-images"] ?? "true"),
    async (on, before) => { const has = (await styleIds()).includes("vantagraph-snippet-rounded-images-off"); return { ok: on ? has : !has, why: on ? "off-style missing" : "off-style still present", note: "" }; });
  await step("visual", "modern-scrollbar OFF", () => set("snippet-modern-scrollbar", "false"), () => set("snippet-modern-scrollbar", snap[PFX + "snippet-modern-scrollbar"] ?? "true"),
    async (on) => { const has = (await styleIds()).includes("vantagraph-snippet-modern-scrollbar"); return { ok: on ? !has : has, why: "scrollbar style state wrong" }; });
  await step("visual", "vinyl-stop ON", () => set("snippet-vinyl-stop", "true"), () => set("snippet-vinyl-stop", snap[PFX + "snippet-vinyl-stop"] ?? "false"),
    async (on) => { const has = (await styleIds()).includes("vantagraph-snippet-vinyl-stop"); return { ok: on ? has : !has, why: "vinyl style state wrong" }; });
  // reduced motion: effect + steady state after the one-off recalc
  { const i0 = issues.length; await set("snippet-reduced-motion", "true"); await sleep(2500); const steady = await sample(3000);
    const fx = await ev(`(() => { const b = document.querySelector('.main-actionButtons button') || document.querySelector('button'); return { transition: getComputedStyle(b).transitionDuration, anim: getComputedStyle(document.querySelector('.vg-card, [data-encore-id="card"]') || b).animationDuration }; })()`);
    const problems = []; if (!/^0s(, 0s)*$/.test(fx.transition)) problems.push("transitions not disabled: " + fx.transition); if (issues.length > i0) problems.push(...issues.slice(i0));
    add("visual", "reduced-motion ON (steady state)", steady, problems, "transition=" + fx.transition);
    await set("snippet-reduced-motion", snap[PFX + "snippet-reduced-motion"] ?? "false"); await sleep(1200); }

  // remaining hide snippets with a valid frame counter, home shelves listed for the "matched 0" ones
  const labels = await ev(`[...document.querySelectorAll('[data-testid="home-page"] section')].map(s => s.getAttribute('aria-label') || '(none)')`);
  console.log("home shelves:", JSON.stringify(labels));
  const hide = ["hide-jump-back", "hide-top-mixes", "hide-recents", "hide-new-releases", "hide-rec-stations", "hide-rec-today", "hide-fav-artists", "hide-best-artists", "hide-mood-recs", "hide-made-for-you"];
  for (const h of hide) { const k = "snippet-" + h;
    const i0 = issues.length; const before = await styleIds(); await set(k, "true"); await sleep(800);
    const probe = await ev(`(() => { const css = [...document.querySelectorAll('style')].filter(s => s.id.includes(${JSON.stringify(h)})).map(s => s.textContent).join('\\n'); const sels = [...css.matchAll(/(?:^|\\})\\s*([^{}@]+)\\{/g)].map(m => m[1].trim()).flatMap(s => s.split(/,(?![^()]*\\))/)).map(s => s.trim()).filter(Boolean); let matched = 0, hidden = 0; for (const s of sels) { let els; try { els = document.querySelectorAll(s); } catch (e) { continue; } for (const e of els) { matched++; const r = e.getBoundingClientRect(); if (getComputedStyle(e).display === 'none' || (!r.width && !r.height)) hidden++; } } return { sels, matched, hidden }; })()`);
    const s = await sample(1500); const problems = []; if (probe.matched && probe.hidden < probe.matched) problems.push(`${probe.hidden}/${probe.matched} hidden`);
    if (!probe.matched) problems.push("matches nothing on today's home feed (selector: " + probe.sels.slice(0, 2).join(" | ").slice(0, 120) + ")");
    if (issues.length > i0) problems.push(...issues.slice(i0)); add("hide", `${h} [${probe.hidden}/${probe.matched}]`, s, problems);
    await set(k, snap[PFX + k] ?? "false"); await sleep(400); }
  for (const k of ["snippet-thin-library", "snippet-auto-hide-sidebar"]) await step("layout", k.replace("snippet-", ""), () => set(k, "true"), () => set(k, snap[PFX + k] ?? "false"), async (on) => { const has = (await styleIds()).some((i) => i.includes(k.replace("snippet-", ""))); return { ok: on ? has : !has, why: "style state wrong" }; });

  // custom accent: valid colour applies, hostile input is rejected
  await step("accent", "custom accent #ff00aa", () => set("snippet-custom-accent", "#ff00aa"), () => set("snippet-custom-accent", snap[PFX + "snippet-custom-accent"] ?? ""),
    async (on) => { const v = await ev(`getComputedStyle(document.documentElement).getPropertyValue('--spice-accent').trim().toLowerCase()`); return { ok: on ? v === "#ff00aa" : v !== "#ff00aa", why: "accent is " + v, note: v }; });
  { const before = await ev(`getComputedStyle(document.documentElement).getPropertyValue('--spice-accent').trim()`); await set("snippet-custom-accent", "red;} body{display:none"); await sleep(600);
    const bodyOk = await ev(`getComputedStyle(document.body).display !== 'none'`); const after = await ev(`getComputedStyle(document.documentElement).getPropertyValue('--spice-accent').trim()`);
    add("accent", "hostile accent value rejected", await sample(1000), bodyOk ? [] : ["INJECTION: body hidden"], `accent ${before} -> ${after}`); await set("snippet-custom-accent", snap[PFX + "snippet-custom-accent"] ?? ""); }

  // developer tools: toggle, measure, verify they clean up
  for (const dkey of ["snippet-dev-layout-grid", "snippet-dev-highlighter", "snippet-dev-spacing-viz", "snippet-dev-var-monitor", "snippet-dev-dom-logger"]) {
    await step("dev", dkey.replace("snippet-", ""), () => set(dkey, "true"), () => set(dkey, "false"),
      async (on) => { const n = await ev(`document.querySelectorAll('[id*="dev-"], #vg-var-monitor, [id^="vg-"][id*="tooltip"], [id*="spacing"]').length`); return { ok: true, note: "dev nodes " + n }; }, 2200);
  }
  await ev(`(() => { const snap = ${JSON.stringify(snap)}; for (const k of Object.keys(localStorage)) if (k.startsWith('vantagraph') && !(k in snap)) localStorage.removeItem(k); for (const [k, v] of Object.entries(snap)) localStorage.setItem(k, v); return 1; })()`);
  const left = await ev(`({ vmon: !!document.getElementById('vg-var-monitor'), styles: [...document.querySelectorAll('style')].map(s => s.id).filter(i => /dev|spacing|layout-grid|highlighter/.test(i)) })`);
  console.log("dev leftovers after OFF:", JSON.stringify(left));
  fs.writeFileSync(path.join(DIR, `qa-settings2-${label}.json`), JSON.stringify({ label, rows, left, issues: [...new Set(issues)].slice(0, 30) }, null, 1));
  console.log("console issues:", [...new Set(issues)].slice(0, 10)); console.log("unpark:", c.unpark()); c.ws.close();
})().catch((e) => { console.error("failed:", e.stack || e.message); process.exit(1); });
