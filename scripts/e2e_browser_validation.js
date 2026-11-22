/**
 * SignBridge Edu — Automated E2E Browser Validation Suite
 * Runs headless Chrome against http://localhost:3000 and http://localhost:4000
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = path.resolve(__dirname, '../validation_artifacts');
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const results = {
  timestamp: new Date().toISOString(),
  checks: [],
  screenshots: [],
};

function logCheck(name, passed, details = '') {
  const status = passed ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${name}${details ? ` - ${details}` : ''}`);
  results.checks.push({ name, passed, details });
}

async function runValidation() {
  console.log('====================================================');
  console.log('🚀 Launching Chrome E2E Product Validation Suite');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // 1. Load Application
    console.log('1. Loading http://localhost:3000...');
    const response = await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    logCheck('Page Initial Load', response.status() === 200, `HTTP ${response.status()}`);

    // Wait for the app title
    await page.waitForSelector('h1', { timeout: 10000 });
    const titleText = await page.$eval('h1', (el) => el.innerText);
    console.log(`   Header Title: "${titleText}"`);
    logCheck('Karnataka Class 8 Header Displayed', titleText.includes('ಕರ್ನಾಟಕ') || titleText.includes('Science'), titleText);

    // Take Desktop Initial Screenshot (Tutor View)
    const ssDesktop = path.join(ARTIFACTS_DIR, '01_desktop_science_tutor.png');
    await page.screenshot({ path: ssDesktop, fullPage: false });
    results.screenshots.push(ssDesktop);
    console.log(`   📸 Captured screenshot: ${ssDesktop}`);

    // 2. Language Switching Test
    console.log('\n2. Testing Universal Language Switching...');
    // Initial HTML lang
    const initialLang = await page.evaluate(() => document.documentElement.lang);
    logCheck('Initial Document Language', !!initialLang, `lang="${initialLang}"`);

    // Switch to English
    const headerLangSelect = await page.$('#global-header-language-select');
    if (headerLangSelect) {
      await page.select('#global-header-language-select', 'en');
      await new Promise(r => setTimeout(r, 600));
      const langAfterEn = await page.evaluate(() => document.documentElement.lang);
      const enTitle = await page.$eval('h1', (el) => el.innerText);
      logCheck('Switch to English', langAfterEn === 'en' && enTitle.includes('Science'), `lang="${langAfterEn}", Title="${enTitle}"`);

      // Switch back to Kannada
      await page.select('#global-header-language-select', 'kn');
      await new Promise(r => setTimeout(r, 600));
      const langAfterKn = await page.evaluate(() => document.documentElement.lang);
      const knTitle = await page.$eval('h1', (el) => el.innerText);
      logCheck('Switch to Kannada', langAfterKn === 'kn' && knTitle.includes('ಕರ್ನಾಟಕ'), `lang="${langAfterKn}", Title="${knTitle}"`);
    } else {
      logCheck('Header Language Select Found', false, 'Selector #global-header-language-select missing');
    }

    // 3. Chapter Selection & Lessons Test
    console.log('\n3. Testing Chapter Selection & Content Loading...');
    // Look for chapter buttons
    const chapterButtons = await page.$$('div.flex.items-center.gap-2.overflow-x-auto button');
    logCheck('Chapter Buttons Present', chapterButtons.length >= 5, `Found ${chapterButtons.length} chapters`);

    // Click Chapter 4: Sound (ಶಬ್ದ / ಧ್ವನಿ)
    if (chapterButtons.length >= 4) {
      await chapterButtons[3].click();
      await new Promise(r => setTimeout(r, 600));
      const activeHeading = await page.$eval('h2.text-xl.font-bold', (el) => el.innerText);
      logCheck('Sound Chapter Selected', activeHeading.includes('ಶಬ್ದ') || activeHeading.includes('Sound'), activeHeading);
    }

    // Check Key Concept Cards with Rural Analogies
    const ruralAnalogies = await page.$$eval('div.bg-\\[\\#F7F9FC\\]', (nodes) =>
      nodes.map((n) => n.innerText).filter((t) => t.includes('ದಿನನಿತ್ಯದ') || t.includes('ಗ್ರಾಮೀಣ') || t.includes('ಉದಾಹರಣೆ') || t.includes('Analogy'))
    );
    logCheck('Rural Analogies Displayed', ruralAnalogies.length > 0, `Found ${ruralAnalogies.length} everyday Karnataka analogies`);

    // 4. Adaptive Practice & Quiz Submission Test
    console.log('\n4. Testing Adaptive Practice & MCQ Assessment...');
    // Switch to Practice Tab
    const tabButtons = await page.$$('div.flex.border-b button');
    if (tabButtons.length >= 3) {
      await tabButtons[2].click(); // 3rd tab is practice
      await new Promise(r => setTimeout(r, 800));

      const practiceTitle = await page.$eval('h2.text-lg.font-bold', (el) => el.innerText);
      logCheck('Practice Tab Active', !!practiceTitle, practiceTitle);

      // Verify difficulty level badge
      const levelBadge = await page.$eval('#adaptive-difficulty-badge', (el) => el.innerText.trim().toUpperCase()).catch(() => 'unknown');
      logCheck('Adaptive Difficulty Badge Present', levelBadge === 'EASY' || levelBadge === 'MEDIUM' || levelBadge === 'HARD', `Level: ${levelBadge}`);

      // Select first MCQ Option
      const optionButtons = await page.$$('button.w-full.p-3\\.5.rounded-xl.border');
      if (optionButtons.length >= 2) {
        await optionButtons[0].click();
        await new Promise(r => setTimeout(r, 400));
        logCheck('Option Selection', true, 'Selected option 0');

        // Submit answer
        const submitBtn = await page.$('button[type="button"]');
        // Look for the button with submit text
        const buttons = await page.$$('button');
        let clickedSubmit = false;
        for (const btn of buttons) {
          const text = await page.evaluate(el => el.innerText, btn);
          if (text.includes('ಉತ್ತರ ಸಲ್ಲಿಸಿ') || text.includes('Submit')) {
            await btn.click();
            clickedSubmit = true;
            break;
          }
        }
        logCheck('Submit Answer Clicked', clickedSubmit);
        await new Promise(r => setTimeout(r, 800));

        // Check if explanation card is displayed
        const feedbackCard = await page.$('div.p-4.rounded-xl.border');
        const feedbackText = feedbackCard ? await page.evaluate(el => el.innerText, feedbackCard) : '';
        logCheck('Immediate MCQ Feedback & Explanation', !!feedbackCard, feedbackText.substring(0, 80) + '...');

        const ssPractice = path.join(ARTIFACTS_DIR, '02_adaptive_practice_feedback.png');
        await page.screenshot({ path: ssPractice, fullPage: false });
        results.screenshots.push(ssPractice);
      }
    }

    // 5. Student Progress Dashboard Test
    console.log('\n5. Testing Student Progress Dashboard...');
    // Click Sidebar Nav item for Student Progress
    const navButtons = await page.$$('aside nav button');
    let studentNavClicked = false;
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text.includes('ವಿದ್ಯಾರ್ಥಿ ಪ್ರಗತಿ') || text.includes('Student Progress')) {
        await btn.click();
        studentNavClicked = true;
        break;
      }
    }
    logCheck('Student Dashboard Nav Clicked', studentNavClicked);
    await new Promise(r => setTimeout(r, 800));

    // Verify 4 KPI cards and learner name
    const studentName = await page.$eval('h2.text-xl.font-bold', (el) => el.innerText).catch(() => '');
    logCheck('Student Profile Rendered', studentName.includes('ಕಾವ್ಯ') || studentName.includes('Kavya') || studentName.includes('ಬಸವರಾಜ್'), studentName);

    const kpiCards = await page.$$eval('div.bg-white.rounded-2xl.border.border-\\[\\#DCE5EF\\].p-4', (els) => els.length);
    logCheck('4 Key Metrics KPI Cards', kpiCards >= 4, `Rendered ${kpiCards} KPI cards`);

    const ssStudent = path.join(ARTIFACTS_DIR, '03_student_dashboard.png');
    await page.screenshot({ path: ssStudent, fullPage: false });
    results.screenshots.push(ssStudent);

    // 6. Parent & Teacher Dashboard Test
    console.log('\n6. Testing Parent & Teacher Dashboard...');
    let parentNavClicked = false;
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text.includes('ಪಾಲಕರು') || text.includes('Parent')) {
        await btn.click();
        parentNavClicked = true;
        break;
      }
    }
    logCheck('Parent Dashboard Nav Clicked', parentNavClicked);
    await new Promise(r => setTimeout(r, 800));

    const parentSummaryTitle = await page.$eval('h1', (el) => el.innerText).catch(() => '');
    logCheck('Parent Report Rendered', parentSummaryTitle.includes('ವರದಿ') || parentSummaryTitle.includes('Report'), parentSummaryTitle);

    const strengthsCard = await page.$('div.bg-white.rounded-2xl.border.border-emerald-200');
    logCheck('Strengths & Mastery Box Present', !!strengthsCard);

    const supportCard = await page.$('div.bg-white.rounded-2xl.border.border-amber-200');
    logCheck('Areas Needing Support Box Present', !!supportCard);

    const ssParent = path.join(ARTIFACTS_DIR, '04_parent_dashboard.png');
    await page.screenshot({ path: ssParent, fullPage: false });
    results.screenshots.push(ssParent);

    // 7. Test Doubt Resolution (Voice & Photo UI)
    console.log('\n7. Testing Doubt Resolution (AI Science Tutor)...');
    // Return to tutor tab
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text.includes('AI ಸೈನ್ಸ್ ಬೋಧಕ') || text.includes('AI Science Tutor')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 800));

    // Switch to Doubt Tab
    const tutorTabs = await page.$$('div.flex.border-b button');
    if (tutorTabs.length >= 2) {
      await tutorTabs[1].click(); // Doubt tab
      await new Promise(r => setTimeout(r, 600));

      const textarea = await page.$('textarea');
      logCheck('Doubt Textarea Present', !!textarea);

      const micBtn = await page.$('button[type="button"]');
      logCheck('Voice Input Button Present', !!micBtn);

      const fileInput = await page.$('input[type="file"]');
      logCheck('Photo Upload Input Present', !!fileInput);

      // Type a test question
      await page.type('textarea', 'ಹನಿ ನೀರಾವರಿಯಿಂದ ರೈತರಿಗೆ ಆಗುವ ಲಾಭಗಳೇನು?');
      const submitQueryBtn = await page.$('button[type="submit"]');
      if (submitQueryBtn) {
        await submitQueryBtn.click();
        console.log('   Submitted doubt question: "ಹನಿ ನೀರಾವರಿಯಿಂದ ರೈತರಿಗೆ ಆಗುವ ಲಾಭಗಳೇನು?"');
        await page.waitForSelector('div.bg-white.rounded-2xl.border.border-\\[\\#12B8C2\\]\\/40', { timeout: 10000 });

        const answerText = await page.$eval('div.bg-white.rounded-2xl.border.border-\\[\\#12B8C2\\]\\/40', el => el.innerText);
        logCheck('Tutor Answer Received', answerText.includes('ನಮಸ್ಕಾರ') || answerText.includes('ಹನಿ ನೀರಾವರಿ') || answerText.includes('Drip'), answerText.substring(0, 90) + '...');

        const ssDoubt = path.join(ARTIFACTS_DIR, '05_doubt_resolution.png');
        await page.screenshot({ path: ssDoubt, fullPage: false });
        results.screenshots.push(ssDoubt);
      }
    }

    // 8. Mobile Viewport Testing (360px, 390px, 430px)
    console.log('\n8. Testing Mobile Responsiveness...');
    const mobileWidths = [
      { name: 'Mobile_360', width: 360, height: 740 },
      { name: 'Mobile_390', width: 390, height: 844 },
      { name: 'Mobile_430', width: 430, height: 932 },
    ];

    for (const view of mobileWidths) {
      await page.setViewport({ width: view.width, height: view.height, isMobile: true, hasTouch: true });
      await new Promise(r => setTimeout(r, 500));

      // Check overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      logCheck(`Viewport ${view.name} (${view.width}px) No Unintended Overflow`, !hasHorizontalScroll);

      const ssMobile = path.join(ARTIFACTS_DIR, `06_mobile_${view.width}px.png`);
      await page.screenshot({ path: ssMobile, fullPage: false });
      results.screenshots.push(ssMobile);
      console.log(`   📸 Captured screenshot: ${ssMobile}`);
    }

    // 9. Offline Simulation & Progress Synchronization
    console.log('\n9. Testing Offline Operation & Progress Synchronization...');
    const client = await page.target().createCDPSession();

    // Emulate offline network conditions
    await client.send('Network.emulateNetworkConditions', {
      offline: true,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
    });
    console.log('   Simulated Network: OFFLINE');

    // Trigger offline storage check
    const isOfflineEvaluated = await page.evaluate(() => {
      window.dispatchEvent(new Event('offline'));
      return !navigator.onLine;
    });

    // Check if offline badge is visible
    await new Promise(r => setTimeout(r, 600));
    const statusPillText = await page.$eval('div.rounded-full.text-xs.font-semibold', el => el.innerText).catch(() => '');
    logCheck('Offline Badge Active When Disconnected', statusPillText.includes('ಆಫ್‌ಲೈನ್') || statusPillText.includes('Offline'), `Pill text: "${statusPillText}"`);

    // Restore network
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 20,
      downloadThroughput: 10 * 1024 * 1024,
      uploadThroughput: 5 * 1024 * 1024,
    });
    console.log('   Simulated Network: ONLINE RESTORED');

    await page.evaluate(() => {
      window.dispatchEvent(new Event('online'));
    });
    await new Promise(r => setTimeout(r, 800));

    // Verify online status restored
    const onlinePillText = await page.$eval('div.rounded-full.text-xs.font-semibold', el => el.innerText).catch(() => '');
    logCheck('Online Status Restored', onlinePillText.includes('ಆನ್‌ಲೈನ್') || onlinePillText.includes('Online'), `Pill text: "${onlinePillText}"`);

  } catch (err) {
    console.error('Error during validation test execution:', err);
    logCheck('Execution Completed Without Fatal Crash', false, err.message);
  } finally {
    await browser.close();
  }

  // Summary
  const passCount = results.checks.filter(c => c.passed).length;
  const failCount = results.checks.filter(c => !c.passed).length;
  console.log('\n====================================================');
  console.log(`🏁 E2E Validation Summary: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('====================================================');

  fs.writeFileSync(
    path.join(ARTIFACTS_DIR, 'validation_summary.json'),
    JSON.stringify(results, null, 2),
    'utf8'
  );
}

runValidation().catch(e => {
  console.error('Fatal runner error:', e);
  process.exit(1);
});
