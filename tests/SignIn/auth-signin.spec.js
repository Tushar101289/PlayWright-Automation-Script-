

// // const { test, expect } = require('@playwright/test');

// // const signInUsers = [
// //   { email: 'user1@example.com', password: 'TestPass@123' },
// //   { email: 'user2@example.com', password: 'SecurePass456' },
// //   { email: 'user3@example.com', password: 'AnotherPass789' }
// // ];

// // test.describe('Sign In Form', () => {
// //   for (const user of signInUsers) {
// //     test(`Sign in with ${user.email}`, async ({ page }) => {
// //       await page.goto('https://contest.inpulse.education/signin?redirect=%2Fcontests%2F44f633c4-d0fb-447b-a1aa-812b54e4e374');

// //       // Wait for the toggle text to appear
// //       const toggleTextElement = await page.locator('p:has-text("Sign Up"), p:has-text("Sign In")').first();
// //       const toggleText = await toggleTextElement.textContent();

// //       // Check if we're on the right form, if not, toggle
// //       if (toggleText.includes('Sign Up')) {
// //         // We're already on Sign In — do nothing
// //       } else if (toggleText.includes('Sign In')) {
// //         // We're on Sign Up — click to go to Sign In
// //         await toggleTextElement.click();
// //       }

// //       // Fill in the sign-in form
// //       await page.getByLabel('Username or Email').fill(user.email);
// //       await page.getByLabel('Password').fill(user.password);

// //       // Submit the form
// //       await page.getByRole('button', { name: /SIGN IN/i }).click();

// //       // Optional: Add assertion to confirm successful login
// //       // await expect(page).not.toHaveURL(/.*signin.*/);
// //     });
// //   }
// // });

// const { test, expect } = require('@playwright/test');
// const { URL } = require('url');

// const signInUsers = [
//   { email: 'user1@example.com', password: 'TestPass@123' },
//   { email: 'user2@example.com', password: 'SecurePass456' },
//   { email: 'user3@example.com', password: 'AnotherPass789' }
// ];

// test.describe('Sign In Form', () => {
//   for (const user of signInUsers) {
//     test(`Sign in with ${user.email}`, async ({ page }) => {
//       // Define base and full URL with redirect param
//       const baseUrl = 'https://contest.inpulse.education';
//       const fullUrl = `${baseUrl}/signin?redirect=%2Fcontests%2F44f633c4-d0fb-447b-a1aa-812b54e4e374`;

//       // Extract redirect path if present
//       const parsed = new URL(fullUrl);
//       const redirectPath = parsed.searchParams.get('redirect') || '/';
//       const expectedRedirectUrl = `${baseUrl}${redirectPath}`;

//       // Go to the sign-in page
//       await page.goto(fullUrl);

//       // Wait for the toggle text to appear
//       const toggleTextElement = await page.locator('p:has-text("Sign Up"), p:has-text("Sign In")').first();
//       const toggleText = await toggleTextElement.textContent();

//       // Ensure we're on the Sign In form
//       if (toggleText.includes('Sign In')) {
//         await toggleTextElement.click();
//       }

//       // Fill in the form
//       await page.locator('input[name="email"]').fill(user.email);
//       await page.locator('input[name="password"]').fill(user.password);

//       // Click submit and wait for redirection
//       await Promise.all([
//         page.waitForURL(expectedRedirectUrl),
//         page.locator('button[type="submit"]').click()
//       ]);

//       // Assert redirection to expected URL
//       await expect(page).toHaveURL(expectedRedirectUrl);
//     });
//   }
// });

// const { test, expect } = require('@playwright/test');

// const signInUsers = [
//   { email: 'user1@example.com', password: 'TestPass@123' }
// ];

// test.describe('Sign In Form', () => {
//   for (const user of signInUsers) {
//     test(`Sign in with ${user.email}`, async ({ page }) => {
//       const url = 'https://contest.inpulse.education/signin?redirect=%2Fcontests%2F44f633c4-d0fb-447b-a1aa-812b54e4e374';
//       await page.goto(url);

//       // Ensure we're on the Sign In form
//       const toggleTextElement = page.locator('p:has-text("Sign In"), p:has-text("Sign Up")').first();
//       const toggleText = await toggleTextElement.textContent();

//       if (toggleText?.includes('Sign In')) {
//         await toggleTextElement.click(); // Switch to Sign In
//         await page.waitForSelector('input[name="identifier"]', { timeout: 5000 });
//       }

//       // Fill in the form
//       await page.locator('input[name="identifier"]').fill(user.email);
//       await page.locator('input[name="password"]').fill(user.password);

//       // Click submit
//       await Promise.all([
//         page.waitForNavigation({ url: '**' }), // Wait for redirect
//         page.locator('button[type="submit"]').click()
//       ]);

//       // Determine expected redirect
//       const redirectMatch = url.match(/redirect=([^&]+)/);
//       const expectedPath = redirectMatch ? decodeURIComponent(redirectMatch[1]) : '/';
//       const expectedUrl = `https://contest.inpulse.education${expectedPath}`;

//       // ✅ Assertion
//       await expect(page).toHaveURL(expectedUrl);
//     });
//   }
// });


// version 3


// const { test, expect } = require('@playwright/test');

// const signInUsers = [
//   { email: 'user1@example.com', password: 'TestPass@123' }
// ];

// test.describe('Sign In Form', () => {
//   for (const user of signInUsers) {
//     test(`Sign in with ${user.email}`, async ({ page }) => {
//       const redirectUrl = 'https://contest.inpulse.education/signin';
//       await page.goto(redirectUrl);
//       console.log('✅ Page loaded');

//       // Detect if we're on Sign Up and need to toggle to Sign In
//       const toggleTextElement = await page.locator('p:has-text("Sign Up"), p:has-text("Sign In")').first();
//       const toggleText = await toggleTextElement.textContent();
//       console.log(`ℹ️ Toggle text found: ${toggleText.trim()}`);

//       if (toggleText.includes('Sign In')) {
//         console.log('🔁 Toggling to Sign In form');
//         await toggleTextElement.click();
//       } else {
//         console.log('✅ Already on Sign In form');
//       }

//       // Fill in form fields with logging
//       const emailInput = page.locator('input[name="identifier"]');
//       const passwordInput = page.locator('input[name="password"]');
//       await expect(emailInput).toBeVisible();
//       console.log('✍️ Email field found');
//       await emailInput.fill(user.email);
//       console.log(`✅ Filled email: ${user.email}`);

//       await expect(passwordInput).toBeVisible();
//       console.log('✍️ Password field found');
//       await passwordInput.fill(user.password);
//       console.log(`✅ Filled password`);

//       // Click submit
//       const submitButton = page.locator('button[type="submit"]');
//       await expect(submitButton).toBeVisible();
//       console.log('🚀 Clicking submit');
//       await submitButton.click();

//       // Wait for routing to home or redirect path
//       const expectedPath = decodeURIComponent(redirectUrl.split('redirect=')[1] || '/');
//       const expectedUrl = `https://contest.inpulse.education${expectedPath}`;
//       await expect(page).toHaveURL(expectedUrl);
//       console.log(`🎯 Successfully navigated to: ${await page.url()}`);
//     });
//   }
// });


// version 4

// const { test, expect } = require('@playwright/test');

// const signInUsers = [
//   { email: 'waweniw529@deusa7.com', password: 'waweniw529@deusa7.com' }
// ];

// test.describe('Sign In Form', () => {
//   for (const user of signInUsers) {
//     test(`Sign in with ${user.email}`, async ({ page }) => {
//       // Go to sign-in page
//       await page.goto('https://contest.inpulse.education/signin');
//       console.log('✅ Page loaded');

//       // Toggle to Sign In form if needed
//       const toggleTextElement = await page.locator('p:has-text("Sign Up"), p:has-text("Sign In")').first();
//       const toggleText = await toggleTextElement.textContent();
//       console.log(`ℹ️ Toggle text found: ${toggleText.trim()}`);

//       if (toggleText.includes('Sign In')) {
//         console.log('🔁 Toggling to Sign In form');
//         await toggleTextElement.click();
//       } else {
//         console.log('✅ Already on Sign In form');
//       }

//       // Fill the sign-in form
//       const emailInput = page.locator('input[name="identifier"]');
//       const passwordInput = page.locator('input[name="password"]');
//       await expect(emailInput).toBeVisible();
//       console.log('✍️ Email field found');
//       await emailInput.fill(user.email);
//       console.log(`✅ Filled email: ${user.email}`);

//       await expect(passwordInput).toBeVisible();
//       console.log('✍️ Password field found');
//       await passwordInput.fill(user.password);
//       console.log(`✅ Filled password`);

//       // Submit the form
//       const submitButton = page.locator('button[type="submit"]');
//       await expect(submitButton).toBeVisible();
//       console.log('🚀 Clicking submit');
//       await submitButton.click();

//       // Wait for SPA navigation to home page
//       await expect(page).toHaveURL('https://contest.inpulse.education/');
//       console.log(`🎯 Successfully navigated to home page: ${await page.url()}`);
//     });
//   }
// });


//version 5

// const { test, expect } = require('@playwright/test');

// const signInUsers = [
//   { email: 'tushar+hod@technicalcareer.education', password: 'tester.hod@inpulse.in' }
// ];

// test.describe('Sign In Form', () => {
//   for (const user of signInUsers) {
//     test(`Sign in with ${user.email}`, async ({ page }) => {
//       // Go to sign-in page
//       await page.goto('https://inpulse-staging-dashboard.web.app/signin', {
//         waitUntil: 'domcontentloaded'
//       });
//       console.log('✅ Page loaded');

//       // Selectors from provided HTML
//       const emailInput = page.locator('input[name="email"]');
//       const passwordInput = page.locator('input[name="password"]');
//       const submitButton = page.locator('button[type="submit"]');

//       // Fill in email
//       await expect(emailInput).toBeVisible();
//       console.log('✍️ Email input found');
//       await emailInput.fill(user.email);
//       console.log(`✅ Email entered: ${user.email}`);

//       // Fill in password
//       await expect(passwordInput).toBeVisible();
//       console.log('✍️ Password input found');
//       await passwordInput.fill(user.password);
//       console.log(`✅ Password entered`);

//       // Click submit
//       await expect(submitButton).toBeVisible();
//       console.log('🚀 Clicking submit button');
//       await submitButton.click();

//       // Wait for expected home URL (update path if needed)
//       await expect(page).toHaveURL('https://inpulse-staging-dashboard.web.app/t/eb9d49bb-bdb9-43c0-9741-febeeca7224a', {
//         timeout: 15000
//       });
//       console.log(`🎯 Redirected to home: ${await page.url()}`);
//     });
//   }
// });


//version 6

import { test, expect } from '@playwright/test';
import { logToFile } from '../../utils/logger.js';

// 📂 Log file path
const filename = 'logs/signin/signin.log';

// 🕒 Timestamp helper
function getDateTime() {
  const now = new Date();
   const pad = (n) => n.toString().padStart(2, '0'); // ✅ Works in JS
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

// 🌐 Base URLs
const baseURL = 'https://inpulse-staging.web.app/signin';
const dashboardURL = 'https://inpulse-staging.web.app/';

// ✅ Positive Login Test
test('Positive Login with valid credentials', async ({ page }) => {
  const payload = {
    email: 'testingprocess@testingprocess.com',
    password: 'testingprocess@testingprocess.com' // replace with valid
  };

  logToFile(filename, '--------------------------------------------------------------------------');
  logToFile(filename, `🕒 Log Time: ${getDateTime()}`);
  logToFile(filename, '✅ Starting Positive Login Test');
  logToFile(filename, `🔗 URL: ${baseURL}`);
  logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

  await page.goto(baseURL);
  await page.fill('#signin-email-or-username', payload.email);
  await page.fill('#signin-password', payload.password);
  await page.click('#signin-button-submit');

  await expect(page).toHaveURL(dashboardURL);
  await expect(page.locator('text=TESTINGPROCESS')).toBeVisible();

  logToFile(filename, '📥 Result: Login successful, user redirected to dashboard.\n');
});

// ❌ Negative Login Test (dynamic error capture)
test('Negative Login with invalid credentials', async ({ page }) => {
  const payload = {
    email: 'wrong@test.com',
    password: 'WrongPassword'
  };

  logToFile(filename, '--------------------------------------------------------------------------');
  logToFile(filename, `🕒 Log Time: ${getDateTime()}`);
  logToFile(filename, '❌ Starting Negative Login Test');
  logToFile(filename, `🔗 URL: ${baseURL}`);
  logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

  await page.goto(baseURL);
  await page.fill('#signin-email-or-username', payload.email);
  await page.fill('#signin-password', payload.password);
  await page.click('#signin-button-submit');

  // Capture whatever error message is shown dynamically
  const errorLocator = page.locator('.error-message'); // change selector to actual error element
  const errorMessage = await errorLocator.textContent();

  logToFile(filename, `📥 Result: Login failed, error message displayed: "${errorMessage?.trim()}"\n`);

  // Optional assertion to ensure some error message is visible
  await expect(errorLocator).toBeVisible();
});
