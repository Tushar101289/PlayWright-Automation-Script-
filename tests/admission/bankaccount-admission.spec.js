// import { test, expect } from '@playwright/test';
// import { logToFile } from '../../utils/logger.js';

// test('TC_ADM_007B - Authorized user modifies bank account number successfully (log only)', async ({ request }) => {
//   const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
//   const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
//   const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/bank-details`;

//   // ✅ Authorized user token
//   // const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVuLnBAaW51bml0eS5pbiIsImV4cCI6MTc1NjQ1MjAzMiwiaWF0IjoxNzUzODYwMDMyLCJzdWIiOiIxMTAyNzgyZi1iMzA2LTRmOWYtODExZi01ZDNiNDNiNzFlZTgifQ.VMf1qY9FDl2BvvmejJKa9NYBSKKvL4i53PN4AIyvOV0';

//     const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rlci5jb29yZGluYXRvckBpbnB1bHNlLmluIiwiZXhwIjoxNzU3NDgzNzM3LCJpYXQiOjE3NTQ4OTE3MzcsInN1YiI6IjAzY2UwYWQ0LTI4NzUtNDM1Ny1hZDE1LWEyMThlODBmNjFjYiJ9.6fdOp60zrdd9UYGO_ZuZ8ygGQrybs-oftIFBNbrnD-Y';

//   const payload = {
//     account_number: '555555', // ✅ Test value
//     bank_id: 'c517fe5a-fa8f-4eb8-8470-36fde7652f8d',
//     branch_id: 'f0b699f9-80ee-479a-9776-2a7a4d8181c8',
//     id: studentId,
//     is_education_loan_applied: true,
//     loan_section: 'Transport'
//   };

//   const filename = 'logs/admission/bankaccount.log'; // Log file path

//   // Generate current date and time in YYYY-MM-DD HH:mm:ss format
// const now = new Date();
// const pad = (n) => n.toString().padStart(2, '0');

// const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
// const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
// const dateTimeStr = `${dateStr} ${timeStr}`;


//   // 📝 Start Logging
//     logToFile(filename, '--------------------------------------------------------------------------');
//     logToFile(filename, `🕒 Log Time: ${dateTimeStr}`);
//   logToFile(filename, '✅ Authorized user attempting to update bank details');
//   logToFile(filename, `🔗 URL: ${url}`);
//   logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

//   const response = await request.post(url, {
//     headers: {
//       'Authorization': authorizedToken,
//       'Content-Type': 'application/json'
//     },
//     data: payload
//   });

//   const statusCode = response.status();
//   logToFile(filename, `📡 Status Code: ${statusCode}`);

//   const contentType = response.headers()['content-type'] || '';
//   try {
//     if (contentType.includes('application/json')) {
//       const json = await response.json();
//       logToFile(filename, '📥 Response JSON:\n' + JSON.stringify(json, null, 2));
//     } else {
//       const text = await response.text();
//       logToFile(filename, '📥 Response Text:\n' + text);
//     }
//   } catch (e) {
//     logToFile(filename, '⚠️ Could not parse response body');
//   }

//   // 👇 Optional assertion if you want to check status
//   // expect([200, 201]).toContain(statusCode);
// });



// Version 2: Both test cases with correct Token and different Token for each test case

import { test } from '@playwright/test';
import { logToFile } from '../../utils/logger.js';

// Common data
const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/bank-details`;

const payload = {
  account_number: '77777',
  bank_id: 'c517fe5a-fa8f-4eb8-8470-36fde7652f8d',
  branch_id: 'f0b699f9-80ee-479a-9776-2a7a4d8181c8',
  id: studentId,
  is_education_loan_applied: true,
  loan_section: 'Transport'
};

const filename = 'logs/admission/bankaccount.log';

// Timestamp helper
function getDateTime() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

// Test helper to send request and log
async function testBankUpdate(request, token, tokenLabel) {
  logToFile(filename, '--------------------------------------------------------------------------');
  logToFile(filename, `🕒 Log Time: ${getDateTime()}`);
  logToFile(filename, `🔑 Testing with: ${tokenLabel}`);
  logToFile(filename, `🔗 URL: ${url}`);
  logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

  const response = await request.post(url, {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data: payload
  });

  const statusCode = response.status();
  logToFile(filename, `📡 Status Code: ${statusCode}`);

  const contentType = response.headers()['content-type'] || '';
  try {
    if (contentType.includes('application/json')) {
      const json = await response.json();
      logToFile(filename, '📥 Response JSON:\n' + JSON.stringify(json, null, 2));
    } else {
      const text = await response.text();
      logToFile(filename, '📥 Response Text:\n' + text);
    }
  } catch (e) {
    logToFile(filename, '⚠️ Could not parse response body');
  }
}

// Tokens
const correctToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVuLnBAaW51bml0eS5pbiIsImV4cCI6MTc2MzgwMTk1NSwiaWF0IjoxNzYxMjA5OTU1LCJzdWIiOiIxMTAyNzgyZi1iMzA2LTRmOWYtODExZi01ZDNiNDNiNzFlZTgifQ.IvT1m80cudQUCW_7nKG_sdSz2MfkGuUXWslKdIEIm0w';
const otherUserToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaXRoYS5saWJyYXJ5QHNhaHlhZHJpLmVkdS5pbiIsImV4cCI6MTc2MzgwMTkwNCwiaWF0IjoxNzYxMjA5OTA0LCJzdWIiOiI3OWU5YjA2Ny1jOTg3LTQ4MzItODU2Yi0yYjI3MGEwMmJmZDQifQ.Pyp3pWruch14lVTJx_AukVDZxXM0PFIoFyGr6eOWdM4';

// Test cases
test('TC_ADM_007B - Update bank account with correct token', async ({ request }) => {
  await testBankUpdate(request, correctToken, '✅ Correct Token');
});

test('TC_ADM_007B - Update bank account with different user token', async ({ request }) => {
  await testBankUpdate(request, otherUserToken, '❌ Different User Token');
});
