// import { test, expect } from '@playwright/test';

// test('Signup API Test', async ({ request }) => {
//   const url = 'https://staging.api.inpulse.education/auth/signup';

//   const payload = {
//     email: `user_${Date.now()}@test.com`, // unique email every run
//     password: "Test@1234",
//     confirmPassword: "Test@1234"
//   };

//   const response = await request.post(url, {
//     data: payload,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   expect(response.status()).toBe(201); // or 200 depending on API

//   const responseBody = await response.json();
//   console.log('Signup Response:', responseBody);

//   // ✅ Check API structure
//   expect(responseBody).toHaveProperty('status', 'success');
//   expect(responseBody).toHaveProperty('data.token'); // token must be present
//   expect(typeof responseBody.data.token).toBe('string');
// });


//version: 1.0

import { test, expect } from '@playwright/test';
import { logToFile } from '../../utils/logger.js';

// 📂 Log file path
const filename = 'logs/auth/signup.log';

// 🕒 Timestamp helper
function getDateTime() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

// 🔧 Logging wrapper
async function runTestWithLogging(testName, payload, testFn, baseURL) {
  logToFile(filename, '--------------------------------------------------------------------------');
  logToFile(filename, `🕒 Log Time: ${getDateTime()}`);
  logToFile(filename, `🔹 Starting Test: ${testName}`);
  logToFile(filename, `🔗 URL: ${baseURL}`);
  logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

  try {
    await testFn();
    logToFile(filename, `✅ Test Passed: ${testName}`);
  } catch (error) {
    logToFile(filename, `❌ Test Failed: ${testName}`);
    logToFile(filename, `❗ Error: ${error.message}`);
    throw error; // re-throw so Playwright still marks test as failed
  }
}

test.describe('Signup API Tests', () => {
  const baseURL = 'https://staging.api.inpulse.education/auth/signup';
  const uniqueEmail = `user_${Date.now()}@test.com`; // dynamic email
  const password = "Test@1234";
  const name = "New User";

  test('✅ Signup with new email (success case)', async ({ request }) => {
    const payload = { email: uniqueEmail, password, name };

    await runTestWithLogging('Signup with new email', payload, async () => {
      const response = await request.post(baseURL, {
        data: payload,
        headers: { 'Content-Type': 'application/json' }
      });

      expect([200, 201]).toContain(response.status());
      const body = await response.json();
      console.log('Signup Response (first attempt):', body);

      expect(body).toHaveProperty('status', 'success');
      expect(body.data).toHaveProperty('token');
      expect(typeof body.data.token).toBe('string');
    }, baseURL);
  });

  test('❌ Signup with same email again (duplicate case)', async ({ request }) => {
    const payload = { email: uniqueEmail, password, name };

    await runTestWithLogging('Signup with duplicate email', payload, async () => {
      const response = await request.post(baseURL, {
        data: payload,
        headers: { 'Content-Type': 'application/json' }
      });

      expect([400, 409]).toContain(response.status());
      const body = await response.json();
      console.log('Signup Response (duplicate email):', body);

      expect(body.status).toBe('error'); // adjust based on API
      expect(body.error).not.toBeNull();
    }, baseURL);
  });
});

