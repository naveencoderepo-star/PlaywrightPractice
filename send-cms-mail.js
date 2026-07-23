import { chromium } from '@playwright/test';
import nodemailer from 'nodemailer';
import path from 'path';

const THRESHOLD_8_50 = 8 * 3600 + 50 * 60; // 8 hours 50 minutes
const THRESHOLD_9_00 = 9 * 3600;            // 9 hours
const POLL_INTERVAL = 5 * 60 * 1000;        // check every 5 minutes

// Use env vars (for Jenkins) or fallback to defaults (for local)
const CMS_USER = process.env.CMS_USER || '10215';
const CMS_PASS = process.env.CMS_PASS || 'Ariyan13!';
const GMAIL_USER = process.env.GMAIL_USER || 'naveencoderepo@gmail.com';
const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS || 'qefm kkqr uyjj bwnd';
const HEADLESS = process.env.CI === 'true' || process.env.HEADLESS === 'true';

function timeToSeconds(time) {
    const cleaned = time.trim().replace(/^[:\s]+/, '');
    const [h, m, s] = cleaned.split(':').map(Number);
    return h * 3600 + m * 60 + s;
}

(async () => {
    const browser = await chromium.launch({ headless: HEADLESS });
    const page = await browser.newPage();

    // Login to CMS
    await page.goto('https://cms.coherent.in/cms-angular/sign-in');
    await page.locator('#email').fill(CMS_USER);
    await page.locator('#password').fill(CMS_PASS);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('**/attendance/**', { timeout: 10_000 });
    console.log('✅ Logged in successfully');

    const getTimeValue = (label) =>
        page.locator(`xpath=//div[contains(normalize-space(.), '${label}')]/span`).first();

    let sent850 = false;
    let sent900 = false;

    while (!sent900) {
        // Refresh to get latest data
        if (sent850 || sent900) await page.reload({ waitUntil: 'domcontentloaded' });

        const checkInTimeLocator = getTimeValue('Check-In Time');
        const productiveHoursLocator = getTimeValue('Productive Hours');

        await checkInTimeLocator.waitFor({ state: 'visible', timeout: 5000 });
        await productiveHoursLocator.waitFor({ state: 'visible', timeout: 5000 });

        const checkInTime = ((await checkInTimeLocator.textContent()) ?? '').trim().replace(/^[:\s]+/, '');
        const productiveHours = ((await productiveHoursLocator.textContent()) ?? '').trim().replace(/^[:\s]+/, '');
        const seconds = timeToSeconds(productiveHours);

        console.log(`\n[${new Date().toLocaleTimeString()}] Check-In: ${checkInTime} | Productive: ${productiveHours}`);

        const screenshotPath = path.resolve('test-results', 'productive-hours.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_APP_PASS
            }
        });

        if (seconds >= THRESHOLD_9_00 && !sent900) {
            await transporter.sendMail({
                from: GMAIL_USER,
                to: GMAIL_USER,
                subject: `✅ CMS: 9 Productive Hours Completed!`,
                html: `
                    <h2>🎉 9 Productive Hours Completed!</h2>
                    <p><strong>Check-In Time:</strong> ${checkInTime}</p>
                    <p><strong>Productive Hours:</strong> ${productiveHours}</p>
                    <p>You have completed <strong>9 productive hours</strong>. Screenshot attached.</p>
                `,
                attachments: [{ filename: 'productive-hours.png', path: screenshotPath }]
            });
            console.log('📧 9h email sent!');
            sent900 = true;

        } else if (seconds >= THRESHOLD_8_50 && !sent850) {
            await transporter.sendMail({
                from: GMAIL_USER,
                to: GMAIL_USER,
                subject: `⏰ CMS: 8h 50m Reached – Almost 9 Hours!`,
                html: `
                    <h2>⏰ Almost There!</h2>
                    <p><strong>Check-In Time:</strong> ${checkInTime}</p>
                    <p><strong>Productive Hours:</strong> ${productiveHours}</p>
                    <p>You have reached <strong>8 hours 50 minutes</strong>. Just 10 more minutes! Screenshot attached.</p>
                `,
                attachments: [{ filename: 'productive-hours.png', path: screenshotPath }]
            });
            console.log('📧 8h50m email sent!');
            sent850 = true;

        } else {
            console.log('⏳ Waiting... next check in 5 minutes');
        }

        if (!sent900) {
            await page.reload({ waitUntil: 'domcontentloaded' });
            await new Promise(r => setTimeout(r, POLL_INTERVAL));
        }
    }

    console.log('✅ Done! Both emails sent.');
    await browser.close();
})();

