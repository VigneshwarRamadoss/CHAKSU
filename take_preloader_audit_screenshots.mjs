import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const artifactDir = "C:\\Users\\vigne\\.gemini\\antigravity-ide\\brain\\f501ff88-c77b-487b-b6f3-fb94c79e7478";

  console.log("Starting Preloader Audit QA Matrix...");

  // 1. Timeline Capture at 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.clear());

  // Capture 0ms
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: `${artifactDir}\\audit_timeline_0ms.png` });

  // Capture 120ms
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 120));
  await page.screenshot({ path: `${artifactDir}\\audit_timeline_120ms.png` });

  // Capture 380ms
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 380));
  await page.screenshot({ path: `${artifactDir}\\audit_timeline_380ms.png` });

  // Capture 720ms
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 720));
  await page.screenshot({ path: `${artifactDir}\\audit_timeline_720ms.png` });

  // Capture 1050ms
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1050));
  await page.screenshot({ path: `${artifactDir}\\audit_timeline_1050ms.png` });

  // Capture Final Unmounted State (1600ms)
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${artifactDir}\\audit_timeline_unmounted.png` });

  // 2. Repeat Visit Capture (sessionStorage seen = true)
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: `${artifactDir}\\audit_repeat_visit.png` });

  // 3. Manual Skip Capture (Click Skip Intro)
  await page.evaluate(() => sessionStorage.clear());
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 100));
  const skipBtn = await page.$('button[aria-label="Skip Intro Preloader"]');
  if (skipBtn) {
    await skipBtn.click();
    await new Promise(r => setTimeout(r, 200));
  }
  await page.screenshot({ path: `${artifactDir}\\audit_manual_skip.png` });

  // 4. Reduced Motion Capture
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluate(() => sessionStorage.clear());
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 50));
  await page.screenshot({ path: `${artifactDir}\\audit_reduced_motion.png` });

  // Reset media features
  await page.emulateMediaFeatures([]);

  // 5. Responsive Viewport Matrix
  const viewports = [
    { width: 320, height: 568, name: 'vp_320x568' },
    { width: 375, height: 812, name: 'vp_375x812' },
    { width: 390, height: 844, name: 'vp_390x844' },
    { width: 768, height: 1024, name: 'vp_768x1024' },
    { width: 1280, height: 800, name: 'vp_1280x800' },
    { width: 1440, height: 900, name: 'vp_1440x900' },
    { width: 1920, height: 1080, name: 'vp_1920x1080' },
  ];

  for (const vp of viewports) {
    await page.setViewport(vp);
    await page.evaluate(() => sessionStorage.clear());
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 150));
    await page.screenshot({ path: `${artifactDir}\\audit_${vp.name}_intro.png` });
  }

  await browser.close();
  console.log("Preloader Audit QA Matrix completed successfully!");
})();
