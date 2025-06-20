// const{test} = require('@playwright/test');

// test('Browser Context First PlayWrite Test',async ({browser})=>
//  {
//    const context = await browser.newContext();
//    const page = await context.newPage();
   
//    await page.goto("https://www.google.com/");
// });

// test.only ('Page First PlayWrite Test',async ({page})=>
//  {
//    await page.goto("https://inpulse-staging.web.app/signin");
// });
const { test, expect } = require('@playwright/test');

const signInUsers = [
  { email: 'user1@example.com', password: 'TestPass@123' },
  { email: 'user2@example.com', password: 'SecurePass456' },
  { email: 'user3@example.com', password: 'AnotherPass789' }
];

test.describe('Sign In Form', () => {
  for (const user of signInUsers) {
    test(`Sign in with ${user.email}`, async ({ page }) => {
      await page.goto('https://contest.inpulse.education/signin?redirect=%2Fcontests%2F44f633c4-d0fb-447b-a1aa-812b54e4e374');

      // Wait for the toggle text to appear
      const toggleTextElement = await page.locator('p:has-text("Sign Up"), p:has-text("Sign In")').first();
      const toggleText = await toggleTextElement.textContent();

      // Check if we're on the right form, if not, toggle
      if (toggleText.includes('Sign Up')) {
        // We're already on Sign In — do nothing
      } else if (toggleText.includes('Sign In')) {
        // We're on Sign Up — click to go to Sign In
        await toggleTextElement.click();
      }

      // Fill in the sign-in form
      await page.getByLabel('Username or Email').fill(user.email);
      await page.getByLabel('Password').fill(user.password);

      // Submit the form
      await page.getByRole('button', { name: /SIGN IN/i }).click();

      // Optional: Add assertion to confirm successful login
      // await expect(page).not.toHaveURL(/.*signin.*/);
    });
  }
});
