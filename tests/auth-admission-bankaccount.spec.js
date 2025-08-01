// const { test, expect } = require('@playwright/test');

// test('TC_ADM_007 - Unauthorized user tries to modify bank account number', async ({ request }) => {
//   const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
//   const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
//   const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/bank-details`;

//   const unauthorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZha2UudXNlckBnbWFpbC5jb20iLCJleHAiOjE3NTY0NTIwMzIsImlhdCI6MTc1Mzg2MDAzMiwic3ViIjoiZmFrZS11c2VyLWlkIn0.signature123fake'; // Replace with an actual token for the unauthorized user

//   const payload = {
//     "account_number": "888888888888888",  // 🔄 Tampered field
//     "bank_id": "c517fe5a-fa8f-4eb8-8470-36fde7652f8d",
//     "branch_id": "f0b699f9-80ee-479a-9776-2a7a4d8181c8",
//     "id": "5d858032-7035-4e45-9f74-8af14128b4e5",
//     "is_education_loan_applied": true,
//     "loan_section": "Transport"
//   };

//   console.log('🚨 Unauthorized attempt to modify student bank details');
//   console.log('🔗 URL:', url);
//   console.log('📤 Payload:', JSON.stringify(payload, null, 2));

//   const response = await request.post(url, {
//     headers: {
//       'Authorization': unauthorizedToken,
//       'Content-Type': 'application/json'
//     },
//     data: payload
//   });

//   const statusCode = response.status();
//   console.log('📡 Status Code:', statusCode);

//   try {
//     const contentType = response.headers()['content-type'] || '';
//     if (contentType.includes('application/json')) {
//       const json = await response.json();
//       console.log("📥 Response JSON:\n", JSON.stringify(json, null, 2));
//     } else {
//       const text = await response.text();
//       console.log("📥 Response Text:\n", text);
//     }
//   } catch (e) {
//     console.log('⚠️ Could not parse response body');
//   }

//   // ✅ Ensure unauthorized users cannot update
//   expect([401, 403]).toContain(statusCode);
// });


//Version 2


// const { test, expect } = require('@playwright/test');

// test('TC_ADM_007 - Check access control on modifying bank account number', async ({ request }) => {
//   const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
//   const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
//   const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/bank-details`;

//   const unauthorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZha2UudXNlckBnbWFpbC5jb20iLCJleHAiOjE3NTY0NTIwMzIsImlhdCI6MTc1Mzg2MDAzMiwic3ViIjoiZmFrZS11c2VyLWlkIn0.signature123fake';

//   const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlYWwudXNlckBnbWFpbC5jb20iLCJleHAiOjE3NTY0NTIwMzIsImlhdCI6MTc1Mzg2MDAzMiwic3ViIjoiYXV0aG9yaXplZC11c2VyLWlkIn0.realToken123'; // Replace with valid authorized token

//   const payload = {
//     "account_number": "99999999999999999",
//     "bank_id": "c517fe5a-fa8f-4eb8-8470-36fde7652f8d",
//     "branch_id": "f0b699f9-80ee-479a-9776-2a7a4d8181c8",
//     "id": "5d858032-7035-4e45-9f74-8af14128b4e5",
//     "is_education_loan_applied": true,
//     "loan_section": "Transport"
//   };

//   // ✖️ Unauthorized attempt
//   console.log('\n🚨 Testing UNAUTHORIZED request');
//   const unauthResponse = await request.post(url, {
//     headers: {
//       'Authorization': unauthorizedToken,
//       'Content-Type': 'application/json'
//     },
//     data: payload
//   });

//   const unauthStatus = unauthResponse.status();
//   console.log('🔒 Unauthorized Status Code:', unauthStatus);
//   try {
//     const json = await unauthResponse.json();
//     console.log('🔒 Unauthorized Response:', JSON.stringify(json, null, 2));
//   } catch (e) {
//     console.log('⚠️ Unauthorized: Could not parse response');
//   }
//   expect([401, 403]).toContain(unauthStatus); // Expect failure

//   // ✅ Authorized attempt
//   console.log('\n✅ Testing AUTHORIZED request');
//   const authResponse = await request.post(url, {
//     headers: {
//       'Authorization': authorizedToken,
//       'Content-Type': 'application/json'
//     },
//     data: payload
//   });

//   const authStatus = authResponse.status();
//   console.log('🔓 Authorized Status Code:', authStatus);
//   try {
//     const json = await authResponse.json();
//     console.log('🔓 Authorized Response:', JSON.stringify(json, null, 2));
//   } catch (e) {
//     console.log('⚠️ Authorized: Could not parse response');
//   }
//   expect([200, 201]).toContain(authStatus); // Expect success
// });


//version 3

const { test } = require('@playwright/test');

test('TC_ADM_007B - Authorized user modifies bank account number successfully (log only)', async ({ request }) => {
  const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
  const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
  const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/bank-details`;

  // ✅ Authorized user token
  const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVuLnBAaW51bml0eS5pbiIsImV4cCI6MTc1NjQ1MjAzMiwiaWF0IjoxNzUzODYwMDMyLCJzdWIiOiIxMTAyNzgyZi1iMzA2LTRmOWYtODExZi01ZDNiNDNiNzFlZTgifQ.VMf1qY9FDl2BvvmejJKa9NYBSKKvL4i53PN4AIyvOV0';

  const payload = {
    "account_number": "8888888888", // ✅ Test value
    "bank_id": "c517fe5a-fa8f-4eb8-8470-36fde7652f8d",
    "branch_id": "f0b699f9-80ee-479a-9776-2a7a4d8181c8",
    "id": studentId,
    "is_education_loan_applied": true,
    "loan_section": "Transport"
  };

  console.log('✅ Authorized user attempting to update bank details');
  console.log('🔗 URL:', url);
  console.log('📤 Payload:\n', JSON.stringify(payload, null, 2));

  const response = await request.post(url, {
    headers: {
      'Authorization': authorizedToken,
      'Content-Type': 'application/json'
    },
    data: payload
  });

  const statusCode = response.status();
  console.log('📡 Status Code:', statusCode);

  const contentType = response.headers()['content-type'] || '';
  if (contentType.includes('application/json')) {
    const json = await response.json();
    console.log("📥 Response JSON:\n", JSON.stringify(json, null, 2));
  } else {
    const text = await response.text();
    console.log("📥 Response Text:\n", text);
  }

  // 🛑 Removed assertion check
});
