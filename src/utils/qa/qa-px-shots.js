const fs = require("fs"), path = require("path");
const { connect, sleep, DIR } = require("./qa-lib");
(async () => {
  const label = process.argv[2] || "px"; const c = await connect(); const { ev, go, click, send, pause } = c; c.park(); await pause();
  const D = `(window.VantagraphData || window.VantagraphCustomData)`;
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(path.join(DIR, `px-${label}-${name}.png`), Buffer.from(s.result.data, "base64")); };
  await go("/", 3500); await click('[data-testid="PanelHeader_CloseButton"] button', 900);
  await shot("1-no-right-panel");
  await click('[data-testid="cover-art-button"]', 1900); await shot("2-npv-open");
  await click('[data-testid="PanelHeader_CloseButton"] button', 900); await click('[data-testid="control-button-queue"]', 1900); await shot("3-queue-open"); await click('[data-testid="PanelHeader_CloseButton"] button', 900);
  await go("/collection/tracks", 3000); await shot("4-liked-songs");
  const png = await ev(`(() => { const c = document.createElement('canvas'); c.width = 256; c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 256, 256); gr.addColorStop(0, '#3a1c71'); gr.addColorStop(1, '#ffaf7b'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); return c.toDataURL('image/png'); })()`);
  await ev(`${D}.applySetting('bg-url', ${JSON.stringify(png)}); 1`); await sleep(1500); await shot("5-background-image");
  await ev(`${D}.applySetting('bg-url', ''); 1`); await sleep(900);
  await click('button[aria-label*="Expand Your Library"]', 1600); await shot("6-library-expanded"); await click('.YourLibraryX header button[aria-label="Minimize Your Library"]', 900);
  c.unpark(); c.ws.close();
})();
