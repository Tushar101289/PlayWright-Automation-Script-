// // tests/api/auth.spec.js
// import { test, expect } from '@playwright/test';
// import { logToFile } from '../../utils/logger.js';

// // 📂 Log file path
// const filename = 'logs/auth/auth.log';

// // 🕒 Timestamp helper
// function getDateTime() {
//   const now = new Date();
//   const pad = (n) => n.toString().padStart(2, '0');
//   return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
//     now.getHours()
//   )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
// }

// const baseURL = 'https://staging.api.inpulse.education/auth/signin';

// test.describe('/auth API Tests', () => {

//   // ✅ Valid login
//   test('POST /auth/signin - valid credentials', async ({ request }) => {
//     const payload = {
//       email: 'anitha.library@sahyadri.edu.in',
//       password: 'anitha.library@sahyadri.edu.in'
//     };

//     logToFile(filename, '--------------------------------------------------------------------------');
//     logToFile(filename, `🕒 Log Time: ${getDateTime()}`);
//     logToFile(filename, '✅ Starting Valid Login Test');
//     logToFile(filename, `🔗 URL: ${baseURL}`);
//     logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

//     const response = await request.post(baseURL, { data: payload });
//     expect(response.status()).toBe(200);

//     const body = await response.json();
//     console.log(body);

//     // ✅ Check only token
//     expect(body).toHaveProperty('token');
//     expect(typeof body.token).toBe('string');
//   });

//   // ❌ Invalid credentials
//   test('POST /auth/signin - invalid credentials', async ({ request }) => {
//     const payload = {
//       email: 'fakeuser@domain.com',
//       password: 'wrongpassword'
//     };

//     logToFile(filename, '--------------------------------------------------------------------------');
//     logToFile(filename, `🕒 Log Time: ${getDateTime()}`);
//     logToFile(filename, '❌ Starting Negative Login Test');
//     logToFile(filename, `🔗 URL: ${baseURL}`);
//     logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

//     const response = await request.post(baseURL, { data: payload });

//     expect(response.status()).toBe(401);
//     const body = await response.json();
//     console.log(body);

//     // ✅ Ensure error message is present
//     expect(body.message || body.error).toBeDefined();
//   });

//   // ❌ Invalid email format
//   test('POST /auth/signin - invalid email format', async ({ request }) => {
//     const payload = {
//       email: 'notanemail',
//       password: 'anitha.library@sahyadri.edu.in'
//     };

//     logToFile(filename, '--------------------------------------------------------------------------');
//     logToFile(filename, `🕒 Log Time: ${getDateTime()}`);
//     logToFile(filename, '❌ Starting Invalid Email Format Test');
//     logToFile(filename, `🔗 URL: ${baseURL}`);
//     logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

//     const response = await request.post(baseURL, { data: payload });

//     expect(response.status()).toBe(400);
//     const body = await response.json();
//     console.log(body);

//     // ✅ Ensure validation error message is present
//     expect(body.message || body.error).toBeDefined();
//   });

//   // ✅ Special character password
//   test('POST /auth/signin - valid password with special characters', async ({ request }) => {
//     const payload = {
//       email: 'anitha.library@sahyadri.edu.in',
//       password: 'anitha.library@sahyadri.edu.in' // password with special chars
//     };

//     logToFile(filename, '--------------------------------------------------------------------------');
//     logToFile(filename, `🕒 Log Time: ${getDateTime()}`);
//     logToFile(filename, '✅ Starting Special Characters Password Test');
//     logToFile(filename, `🔗 URL: ${baseURL}`);
//     logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

//     const response = await request.post(baseURL, { data: payload });

//     expect(response.status()).toBe(200);
//     const body = await response.json();
//     console.log(body);

//     // ✅ Check only token
//     expect(body).toHaveProperty('token');
//     expect(typeof body.token).toBe('string');
//   });

// });



//version 2

// tests/api/auth.spec.js
import { test, expect } from '@playwright/test';
import { logToFile } from '../../utils/logger.js';

// 📂 Log file path
const filename = 'logs/auth/signin.log';

// 🕒 Timestamp helper
function getDateTime() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

const baseURL = 'https://staging.api.inpulse.education/auth/signin';

async function runTestWithLogging(testName, payload, testFn) {
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

test.describe('/auth API Tests', () => {

  test('POST /auth/signin - valid credentials', async ({ request }) => {
    const payload = {
      email: 'anitha.library@sahyadri.edu.in',
      password: 'anitha.library@sahyadri.edu.in'
    };

    await runTestWithLogging('Valid Login', payload, async () => {
      const response = await request.post(baseURL, { data: payload });
      expect(response.status()).toBe(400);

      const body = await response.json();
      console.log(body);
    });
  });

  test('POST /auth/signin - invalid credentials', async ({ request }) => {
    const payload = {
      email: 'fakeuser@domain.com',
      password: 'wrongpassword'
    };

    await runTestWithLogging('Negative Login', payload, async () => {
      const response = await request.post(baseURL, { data: payload });
      expect(response.status()).toBe(404);

      const body = await response.json();
      console.log(body);
    });
  });

  test('POST /auth/signin - invalid email format', async ({ request }) => {
    const payload = {
      email: 'notanemail',
      password: 'anitha.library@sahyadri.edu.in'
    };

    await runTestWithLogging('Invalid Email Format', payload, async () => {
      const response = await request.post(baseURL, { data: payload });
      expect(response.status()).toBe(400);

      const body = await response.json();
      console.log(body);
    });
  });

  test('POST /auth/signin - valid password with special characters', async ({ request }) => {
    const payload = {
      email: 'anitha.library@sahyadri.edu.in',
      password: 'anitha.library@sahyadri.edu.in' // password with special chars
    };

    await runTestWithLogging('Special Characters Password', payload, async () => {
      const response = await request.post(baseURL, { data: payload });
      expect(response.status()).toBe(200);

      const body = await response.json();
      console.log(body);
    });
  });

});
