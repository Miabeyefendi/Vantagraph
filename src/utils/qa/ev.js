// usage: node ev.js "<js expression>"
(async () => {
  const t = await (await fetch("http://127.0.0.1:9222/json")).json(); const p = t.find(t => t.type === "page" && t.url.includes("xpui"));
  const ws = new WebSocket(p.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r); let id = 0; const pend = {};
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; } };
  const send = (m, pa = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method: m, params: pa })); });
  const r = await send("Runtime.evaluate", { expression: process.argv[2], awaitPromise: true, returnByValue: true });
  const v = r.result?.result?.value; console.log(typeof v === "string" ? v : JSON.stringify(v, null, 1)); if (r.result?.exceptionDetails) console.log("EXC", r.result.exceptionDetails.exception?.description?.split("\n")[0]); ws.close();
})();
