import { test, expect } from '@playwright/test';
import nodemailer from 'nodemailer';
import path from 'path';

const REQUIRED_PRODUCTIVE_SECONDS = 9 * 60 * 60;
const ALERT_THRESHOLD_SECONDS = 7 * 3600 + 50 * 60; // 7 hours 50 minutes

function timeToSeconds(time) {
    // Strip any leading colons and spaces (e.g., ": 07:52:02" → "07:52:02")
    const cleaned = time.trim().replace(/^[:\s]+/, '');
    const [hours, minutes, seconds] = cleaned.split(':').map(Number);

    if ([hours, minutes, seconds].some(Number.isNaN)) {
        throw new Error(`Invalid time format: ${time}`);
    }

    return hours * 3600 + minutes * 60 + seconds;
}

function secondsToTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map(value => String(value).padStart(2, '0'))
        .join(':');
}

async function maximizeBrowserWindow(page) {
    const cdpSession = await page.context().newCDPSession(page);

    const { windowId } = await cdpSession.send(
        'Browser.getWindowForTarget'
    );

    await cdpSession.send('Browser.setWindowBounds', {
        windowId,
        bounds: {
            windowState: 'maximized'
        }
    });
}

function getTimeValue(page, label) {
    return page.locator(
        `xpath=//div[contains(normalize-space(.), '${label}')]/span`
    ).first();
}

async function sendEmail({ to, subject, body, screenshotPath }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'naveencoderepo@gmail.com',
            pass: 'qefm kkqr uyjj bwnd'
        }
    });

    await transporter.sendMail({
        from: 'naveencoderepo@gmail.com',
        to,
        subject,
        html: body,
        attachments: [
            {
                filename: 'productive-hours.png',
                path: screenshotPath
            }
        ]
    });

    console.log(`📧 Email sent to ${to}`);
}

const POLL_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test('Check productive hours in CMS', async ({ page }) => {

    // Increase test timeout to 12 hours for long polling
    test.setTimeout(12 * 60 * 60 * 1000);

    await page.goto('https://cms.coherent.in/cms-angular/sign-in');

    await page.locator('#email')
        .fill('10215');

    await page.locator('#password')
        .fill('Ariyan13!');

    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('**/attendance/**', {
        timeout: 10_000
    });

    await expect(page).not.toHaveURL(/sign-in/);

    // Maximize the browser after successful login
    await maximizeBrowserWindow(page);

    let alertSent = false; // track if 7h50m email was already sent
    let checkCount = 0;

    while (true) {
        checkCount++;
        console.log(`\n--- Check #${checkCount} at ${new Date().toLocaleTimeString()} ---`);

        // Refresh page to get latest data
        if (checkCount > 1) {
            await page.reload({ waitUntil: 'domcontentloaded' });
        }

        const checkInTimeLocator = getTimeValue(page, 'Check-In Time');
        const productiveHoursLocator = getTimeValue(
            page,
            'Productive Hours'
        );

        await expect(checkInTimeLocator).toBeVisible();
        await expect(productiveHoursLocator).toBeVisible();

        const checkInTime =
            (await checkInTimeLocator.textContent())?.trim() ?? '';

        const productiveHours =
            (await productiveHoursLocator.textContent())?.trim() ?? '';

        console.log(`Check-In Time    : ${checkInTime}`);
        console.log(`Productive Hours : ${productiveHours}`);

        const productiveSeconds = timeToSeconds(productiveHours);

        // Take a screenshot of the attendance page
        const screenshotPath = path.resolve('test-results', 'productive-hours.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`📸 Screenshot saved: ${screenshotPath}`);

        if (productiveSeconds >= REQUIRED_PRODUCTIVE_SECONDS) {
            const extraTime =
                productiveSeconds - REQUIRED_PRODUCTIVE_SECONDS;

            console.log('✅ You have completed 9 productive hours.');
            console.log(`Extra productive time: ${secondsToTime(extraTime)}`);

            // Send email notification with screenshot
            await sendEmail({
                to: 'naveencoderepo@gmail.com',
                subject: '✅ CMS Alert: 9 Productive Hours Completed!',
                body: `
                    <h2>🎉 Productive Hours Target Reached!</h2>
                    <p><strong>Check-In Time:</strong> ${checkInTime}</p>
                    <p><strong>Productive Hours:</strong> ${productiveHours}</p>
                    <p><strong>Extra Time:</strong> ${secondsToTime(extraTime)}</p>
                    <p>You have successfully completed <strong>9 productive hours</strong>. Screenshot attached.</p>
                `,
                screenshotPath
            });

            // Target reached — stop polling
            break;

        } else if (productiveSeconds >= ALERT_THRESHOLD_SECONDS && !alertSent) {
            const remainingTime =
                REQUIRED_PRODUCTIVE_SECONDS - productiveSeconds;

            console.log('⏰ You have reached 7h 50m. Almost there!');
            console.log(`Remaining productive time: ${secondsToTime(remainingTime)}`);

            // Send heads-up email at 7h 50m (only once)
            await sendEmail({
                to: 'naveencoderepo@gmail.com',
                subject: '⏰ CMS Alert: 7h 50m Reached – Almost 9 Hours!',
                body: `
                    <h2>⏰ Heads Up! You are almost at 9 productive hours</h2>
                    <p><strong>Check-In Time:</strong> ${checkInTime}</p>
                    <p><strong>Productive Hours:</strong> ${productiveHours}</p>
                    <p><strong>Remaining Time:</strong> ${secondsToTime(remainingTime)}</p>
                    <p>You have reached <strong>7 hours 50 minutes</strong>. Just a little more to go! Screenshot attached.</p>
                `,
                screenshotPath
            });

            alertSent = true;
        } else {
            const remainingTime =
                REQUIRED_PRODUCTIVE_SECONDS - productiveSeconds;

            console.log('❌ You have not completed 9 productive hours.');
            console.log(
                `Remaining productive time: ${secondsToTime(remainingTime)}`
            );
        }

        console.log(`⏳ Next check in 15 minutes...`);
        await sleep(POLL_INTERVAL_MS);
    }
});