import { chromium } from 'playwright-core';
const AUS='/private/tmp/claude-501/-Users-karolgenczyk/4e97d310-bc18-4a6f-9523-ec741e538f06/scratchpad/ref';
const b = await chromium.launch({ channel: 'chrome' });
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
await p.goto('https://gynpraxisbonn.de/', { waitUntil:'networkidle', timeout:60000 });
await p.waitForTimeout(2500);
// Overlays wegklicken
for (const t of ['Nur essenzielle','Alle akzeptieren','Speichern']) {
  const l = p.getByText(t, {exact:false}).first();
  if (await l.count().catch(()=>0)) { await l.click({timeout:3000}).catch(()=>{}); await p.waitForTimeout(800); break; }
}
await p.evaluate(() => {
  for (const el of document.querySelectorAll('*')) {
    const s=getComputedStyle(el);
    if ((s.position==='fixed'||s.position==='absolute') && +s.zIndex>50 && el.getBoundingClientRect().width>300) el.style.display='none';
  }
});
await p.waitForTimeout(600);
await p.screenshot({ path:`${AUS}/bonn-clean.png` });
await p.evaluate(async () => { const h=document.documentElement.scrollHeight;
  for (let y=0;y<h;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,150));} window.scrollTo(0,0); });
await p.waitForTimeout(1000);
await p.screenshot({ path:`${AUS}/bonn-voll.png`, fullPage:true });
await b.close();
