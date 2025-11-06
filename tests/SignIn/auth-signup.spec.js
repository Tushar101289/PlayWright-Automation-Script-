// const { test, expect } = require('@playwright/test');

// const testUsers = [
//   { email: 'user1@example.com', password: 'TestPass@123' },
//   { email: 'user2@example.com', password: 'SecurePass456' },
//   { email: 'user3@example.com', password: 'AnotherPass789' }
// ];

// test.describe('Sign Up Form', () => {
//   for (const user of testUsers) {
//     test(`Sign up with ${user.email}`, async ({ page }) => {
//       await page.goto('https://contest.inpulse.education/signin?redirect=%2Fcontests%2F44f633c4-d0fb-447b-a1aa-812b54e4e374');

//       // Wait for the toggle text to appear
//       const toggleTextElement = await page.locator('p:has-text("Sign Up"), p:has-text("Sign In")').first();
//       const toggleText = await toggleTextElement.textContent();

//       // Check if we're on the right form, if not, toggle
//       if (toggleText.includes('Sign In')) {
//         // We're on Sign Up already — do nothing
//       } else if (toggleText.includes('Sign Up')) {
//         // We're on Sign In — click the toggle to go to Sign Up
//         await toggleTextElement.click();
//       }

//       // Fill in the sign-up form
//       await page.getByLabel('Username or Email').fill(user.email);
//       await page.getByLabel('Password').fill(user.password);
//       await page.getByLabel('Confirm Password').fill(user.password);

//       // Submit the form
//       await page.getByRole('button', { name: /SIGN UP/i }).click();

//       // Optional: Wait for navigation or success indicator
//       // await expect(page).not.toHaveURL(/.*signin.*/);
//     });
//   }
// });

// version  2

// const { test, expect } = require('@playwright/test');

// const testUsers = [
//   { email: 'user1@example.com', password: 'TestPass@123' },
//   { email: 'user2@example.com', password: 'SecurePass456' },
//   { email: 'user3@example.com', password: 'AnotherPass789' }
// ];

// test.describe('Sign Up Form', () => {
//   for (const user of testUsers) {
//     test(`Sign up with ${user.email}`, async ({ page }) => {
//       await page.goto('https://contest.inpulse.education/signin');
//       console.log('✅ Page loaded');

//       // Toggle to Sign Up form if needed
//       const toggleTextElement = await page.locator('p:has-text("Sign Up"), p:has-text("Sign In")').first();
//       const toggleText = await toggleTextElement.textContent();
//       console.log(`ℹ️ Toggle text found: ${toggleText.trim()}`);

//       if (toggleText.includes('Sign In')) {
//         console.log('🔁 Toggling to Sign Up form');
//         await toggleTextElement.click();
//       } else {
//         console.log('✅ Already on Sign Up form');
//       }

//       // Fill in form
//       const emailField = page.locator('input[name="email"]');
//       const passwordField = page.locator('input[name="password"]');
//       const confirmPasswordField = page.locator('input[name="confirmPassword"]');

//       await expect(emailField).toBeVisible();
//       await emailField.fill(user.email);
//       console.log(`📨 Filled email: ${user.email}`);

//       await expect(passwordField).toBeVisible();
//       await passwordField.fill(user.password);
//       console.log(`🔒 Filled password`);

//       await expect(confirmPasswordField).toBeVisible();
//       await confirmPasswordField.fill(user.password);
//       console.log(`🔒 Filled confirm password`);

//       // Click Sign Up button
//       const signUpButton = page.locator('button[type="submit"]');
//       await expect(signUpButton).toBeEnabled();
//       console.log('🚀 Clicking sign up button');
//       await signUpButton.click();

//       // Wait for URL to become home page
//       await expect(page).toHaveURL('https://contest.inpulse.education/', { timeout: 10000 });
//       console.log(`🎯 Successfully signed up and landed on: ${await page.url()}`);
//     });
//   }
// });


// version 3


const { test, expect } = require('@playwright/test');

const testUsers = [
  { email: 'user1@example.com', password: 'TestPass@123' },
  { email: 'user2@example.com', password: 'SecurePass456' },
  { email: 'user3@example.com', password: 'AnotherPass789' }
];

test.describe('Sign Up Form', () => {
  for (const user of testUsers) {
    test(`Sign up with ${user.email}`, async ({ page }) => {
      await page.goto('https://contest.inpulse.education/signin');
      console.log('✅ Page loaded');

      // Toggle to Sign Up form if needed
      const toggleTextElement = page.locator('p:has-text("Sign Up"), p:has-text("Sign In")').first();
      const toggleText = await toggleTextElement.textContent();

      if (toggleText?.includes('Sign In')) {
        console.log('🔁 Toggling to Sign Up form');
        await toggleTextElement.click();
      }

      // Ensure heading "Sign up" appears
      await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible({ timeout: 7000 });

      // More robust way to access input fields using placeholder
      const emailField = page.locator('input[placeholder="Email address"]');
      const passwordField = page.locator('input[name="password"]');
      const confirmPasswordField = page.locator('input[name="confirmPassword"]');

      await expect(emailField).toBeVisible({ timeout: 7000 });
      await emailField.fill(user.email);
      console.log(`📨 Filled email: ${user.email}`);

      await expect(passwordField).toBeVisible();
      await passwordField.fill(user.password);
      console.log(`🔒 Filled password`);

      await expect(confirmPasswordField).toBeVisible();
      await confirmPasswordField.fill(user.password);
      console.log(`🔒 Filled confirm password`);

      // Click the sign-up button (wait for it to be enabled)
      const signUpButton = page.locator('button[type="submit"]');
      await expect(signUpButton).toBeEnabled({ timeout: 7000 });
      await signUpButton.click();

      // Expect to land on home page
      await expect(page).toHaveURL('https://contest.inpulse.education/', { timeout: 10000 });
      console.log(`🎯 Successfully signed up: ${await page.url()}`);
    });
  }
});
