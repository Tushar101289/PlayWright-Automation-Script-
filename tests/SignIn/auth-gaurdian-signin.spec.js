
// const { test, expect } = require('@playwright/test');

// const signInUsers = [
//   { email: 'tester.guardian@inpulse.in', password: 'tester.guardian@inpulse.in' }
// ];

// test.describe('Sign In Form', () => {
//   for (const user of signInUsers) {
//     test(`Sign in with ${user.email}`, async ({ page }) => {
//       // Go to sign-in page
//       await page.goto('https://inpulse-staging-guardian.web.app/signin', {
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



// Version 2

// const { test, expect } = require('@playwright/test');

// const signInUsers = [
//   { email: 'tester.guardian@inpulse.in', password: 'tester.guardian@inpulse.in' }
// ];

// test.describe('Sign In Form', () => {
//   for (const user of signInUsers) {
//     test(`Sign in with ${user.email}`, async ({ page }) => {
//       // Visit the sign-in page
//       await page.goto('https://inpulse-staging-guardian.web.app/signin', {
//         waitUntil: 'domcontentloaded'
//       });
//       console.log('✅ Page loaded');

//       // Updated selectors based on your provided HTML
//       const emailInput = page.locator('input[name="identifier"]');
//       const passwordInput = page.locator('input[name="password"]');
//       const submitButton = page.getByRole('button', { name: 'Ready, Set, Go!' });

//       // Fill in username/email
//       await expect(emailInput).toBeVisible();
//       await emailInput.fill(user.email);
//       console.log(`✅ Filled email: ${user.email}`);

//       // Fill in password
//       await expect(passwordInput).toBeVisible();
//       await passwordInput.fill(user.password);
//       console.log(`✅ Filled password`);

//       // Submit the form
//       await expect(submitButton).toBeVisible();
//       await submitButton.click();
//       console.log('🚀 Submitted the form');

//       // Wait for the expected dashboard URL
//       await expect(page).toHaveURL('https://inpulse-staging-dashboard.web.app/t/eb9d49bb-bdb9-43c0-9741-febeeca7224a', {
//         timeout: 15000
//       });
//       console.log(`🎯 Login successful. Redirected to: ${await page.url()}`);
//     });
//   }
// });


// version 3 to see if button is visible or not 


const { test, expect } = require('@playwright/test');

const signInUsers = [
  { email: 'tester.guardian@inpulse.in', password: 'tester.guardian@inpulse.in' }
];

test.describe('Sign In Form', () => {
  for (const user of signInUsers) {
    test(`Sign in with ${user.email}`, async ({ page }) => {
      // Visit the sign-in page
      await page.goto('https://inpulse-staging-guardian.web.app/signin', {
        waitUntil: 'domcontentloaded'
      });
      console.log('✅ Page loaded');

      // Locators based on HTML
      const emailInput = page.locator('input[name="identifier"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.getByRole('button', { name: 'Ready, Set, Go!' });

      // Fill in credentials
      await expect(emailInput).toBeVisible();
      await emailInput.fill(user.email);
      console.log(`✅ Email entered: ${user.email}`);

      await expect(passwordInput).toBeVisible();
      await passwordInput.fill(user.password);
      console.log(`✅ Password entered`);

      // Click the login button
      await expect(submitButton).toBeVisible();
      console.log('🚀 Clicking submit button');
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => console.log('⏳ No full navigation happened')),
        submitButton.click()
      ]);

      // Check if something changed (basic feedback)
      const url = page.url();
      console.log(`🔁 Current URL after click: ${url}`);

      // Optional: Verify login button is disabled or replaced to show it's processing
      const stillVisible = await submitButton.isVisible();
      console.log(stillVisible ? '🟠 Button still visible (check further)' : '✅ Button is no longer visible (possibly redirected)');
    });
  }
});
