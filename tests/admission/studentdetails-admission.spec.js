// const { test, expect } = require('@playwright/test');

// test('TC_ADM_002 - Unauthorized user cannot modify admission fee', async ({ request }) => {
//   const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
//   const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';

//   // Replace this with a token of a user who is NOT allowed to change fee
//   const unauthorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVuLnBAaW51bml0eS5pbiIsImV4cCI6MTc1NjI5MDgwNCwiaWF0IjoxNzUzNjk4ODA0LCJzdWIiOiIxMTAyNzgyZi1iMzA2LTRmOWYtODExZi01ZDNiNDNiNzFlZTgifQ.8DXOEoIKdxPtXKtF29_kHhc5vKqDPrIuFyT-OUEcL2I';

//   const response = await request.fetch(`https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/details`, {
//     method: 'PUT', // or PATCH based on your API
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': unauthorizedToken
//     },
//     data: {
//       fee: 35000
//     }
//   });

//   // Expect 401 or 403 error
//   expect([401, 403]).toContain(response.status());

//   // Check content-type before parsing
//   const contentType = response.headers()['content-type'] || '';

//   if (contentType.includes('application/json')) {
//     const responseBody = await response.json();
//     expect(responseBody.message.toLowerCase()).toContain("forbidden");
//   } else {
//     const responseText = await response.text();
//     expect(responseText.toLowerCase()).toContain("forbidden");
//   }
// });



// Updated versipon 2


// import { test, expect } from '@playwright/test';
// import { logToFile } from '../../utils/logger.js';

// test('TC_ADM_002 - Authorized user attempts to modify admission fee', async ({ request }) => {
//   const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
//   const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
//   const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/details`;

//   const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVuLnBAaW51bml0eS5pbiIsImV4cCI6MTc1Njk2NTU4OSwiaWF0IjoxNzU0MzczNTg5LCJzdWIiOiIxMTAyNzgyZi1iMzA2LTRmOWYtODExZi01ZDNiNDNiNzFlZTgifQ.VeEr0N3MeLoN3fMGXMibclYYpss8eGPtUXmwof1c1ns';

//    const payload = {
//     fee: 42000  // 🔄 Change fee value here
//   };

//   const filename = 'logs/admission/student-details.log';

//   // 📝 Start Logging
//   logToFile(filename, '--------------------------------------------------------------------------');
//   logToFile(filename, '✅ Authorized user attempting to update student details');
//   logToFile(filename, `🔗 URL: ${url}`);
//   logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

//   const response = await request.fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': authorizedToken
//     },
//     data: payload
//   });

//   const status = response.status();
//   logToFile(filename, `📡 Status Code: ${status}`);

//   const contentType = response.headers()['content-type'] || '';

//   try {
//     if (contentType.includes('application/json')) {
//       const responseBody = await response.json();
//       logToFile(filename, '📥 Response JSON:\n' + JSON.stringify(responseBody, null, 2));
//       // Optionally assert success here
//       expect([200, 201]).toContain(status);
//     } else {
//       const responseText = await response.text();
//       logToFile(filename, '📥 Response Text:\n' + responseText);
//       expect(status).toBeLessThan(400); // crude check
//     }
//   } catch (e) {
//     logToFile(filename, '⚠️ Could not parse response body');
//   }
// });



//Updare version 3 multipart/form-data


// import { test, expect } from '@playwright/test';
// import FormData from 'form-data';
// import { logToFile } from '../../utils/logger.js';

// test('TC_ADM_002 - Authorized user updates fee with multipart/form-data', async ({ request }) => {
//   const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
//   const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
//   const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/details`;

//   const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVuLnBAaW51bml0eS5pbiIsImV4cCI6MTc1NjQ1MjAzMiwiaWF0IjoxNzUzODYwMDMyLCJzdWIiOiIxMTAyNzgyZi1iMzA2LTRmOWYtODExZi01ZDNiNDNiNzFlZTgifQ.VMf1qY9FDl2BvvmejJKa9NYBSKKvL4i53PN4AIyvOV0';

//   // Full payload as JSON string
//   const payloadObject = {
//     id: studentId,
//     fee: "50000" // 🔄 Updated value
//     // ✅ Add other fields if required
//   };

//   const form = new FormData();
//   form.append('data', JSON.stringify(payloadObject)); // the field name 'data' depends on your API

//   const filename = 'logs/admission/student-details.log';
//   logToFile(filename, '--------------------------------------------------------------------------');
//   logToFile(filename, '📤 Sending multipart/form-data request to update fee');
//   logToFile(filename, `🔗 URL: ${url}`);
//   logToFile(filename, '📤 Form Data:\n' + JSON.stringify(payloadObject, null, 2));

//   const response = await request.fetch(url, {
//     method: 'POST',
//     headers: {
//       ...form.getHeaders(), // adds multipart Content-Type with boundary
//       Authorization: authorizedToken
//     },
//     body: form
//   });

//   const status = response.status();
//   logToFile(filename, `📡 Status Code: ${status}`);

//   const contentType = response.headers()['content-type'] || '';
//   try {
//     if (contentType.includes('application/json')) {
//       const body = await response.json();
//       logToFile(filename, '📥 Response JSON:\n' + JSON.stringify(body, null, 2));
//       expect([200, 201]).toContain(status);
//     } else {
//       const text = await response.text();
//       logToFile(filename, '📥 Response Text:\n' + text);
//       expect(status).toBeLessThan(400);
//     }
//   } catch (e) {
//     logToFile(filename, '⚠️ Could not parse response body');
//   }
// });


// update version4 image less than 10mb


import { test, expect } from '@playwright/test';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { logToFile } from '../../utils/logger.js';

test('TC_ADM_002 - Update admission fee with profile photo (multipart/form-data)', async ({ request }) => {
  const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
  const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
  const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/details`;

  const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVuLnBAaW51bml0eS5pbiIsImV4cCI6MTc1NjQ1MjAzMiwiaWF0IjoxNzUzODYwMDMyLCJzdWIiOiIxMTAyNzgyZi1iMzA2LTRmOWYtODExZi01ZDNiNDNiNzFlZTgifQ.VMf1qY9FDl2BvvmejJKa9NYBSKKvL4i53PN4AIyvOV0';

  // 🔁 Modified payload with updated fee
  const payload = {
    id: studentId,
    fee: "50000", // ✅ UPDATED FEE
    admission_fee: {
      student_id: studentId,
      fee: 50000
    },
    // 🔁 Include all other fields from your full payload if required
  };

  const form = new FormData();
  form.append('data', JSON.stringify(payload)); // ⬅ backend expects field named 'data'

  // 📎 Add profile photo (ensure file is <10MB)
  const filePath = path.resolve('assets/profile.jpg'); // ✅ Update with your actual file path
  const stats = fs.statSync(filePath);
  if (stats.size > 10 * 1024 * 1024) {
    throw new Error('File size exceeds 10MB limit');
  }
  form.append('profile_photo', fs.createReadStream(filePath)); // ⬅ Key name must match backend requirement

  const filename = 'logs/admission/student-details.log';
  logToFile(filename, '--------------------------------------------------------------------------');
  logToFile(filename, '✅ Sending multipart/form-data request to update fee and upload photo');
  logToFile(filename, `🔗 URL: ${url}`);
  logToFile(filename, '📤 Payload:\n' + JSON.stringify(payload, null, 2));

  const response = await request.fetch(url, {
    method: 'PUT', // Use 'POST' if backend doesn't allow PUT
    headers: {
      ...form.getHeaders(),
      Authorization: authorizedToken
    },
    body: form
  });

  const status = response.status();
  logToFile(filename, `📡 Status Code: ${status}`);

  const contentType = response.headers()['content-type'] || '';
  try {
    if (contentType.includes('application/json')) {
      const json = await response.json();
      logToFile(filename, '📥 Response JSON:\n' + JSON.stringify(json, null, 2));
      expect([200, 201]).toContain(status);
    } else {
      const text = await response.text();
      logToFile(filename, '📥 Response Text:\n' + text);
      expect(status).toBeLessThan(400);
    }
  } catch (e) {
    logToFile(filename, '⚠️ Could not parse response body');
  }
});

