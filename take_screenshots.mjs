import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const artifactDir = "C:\\Users\\vigne\\.gemini\\antigravity-ide\\brain\\f501ff88-c77b-487b-b6f3-fb94c79e7478";
  
  await page.setViewport({ width: 1440, height: 900 });

  // Clear sessionStorage so preloader runs fresh
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.clear());

  // Reload to capture preloader phase
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: `${artifactDir}\\preloader_kcut_intro.png` });

  // Wait for preloader unmount & hero landing (1.5s total)
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `${artifactDir}\\preloader_hero_landing.png` });

  await browser.close();
  console.log("Preloader QA screenshots completed successfully!");
})();
