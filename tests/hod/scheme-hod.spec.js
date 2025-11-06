// import { test, expect } from '@playwright/test';

// // 🌐 Base Setup
// const BASE_URL = 'https://inpulse-staging-dashboard.web.app/t/eb9d49bb-bdb9-43c0-9741-febeeca7224a';
// const LOGIN_URL = `${BASE_URL}/auth/login`;
// const ENDPOINT = '/t/eb9d49bb-bdb9-43c0-9741-febeeca7224a/schemes/contents/programmes/12dc5e21-b80b-4e91-8457-a9d6c70b3c48';

// // 👤 Credentials
// const USERS = {
//   HOD: { email: 'gagansalian@gmail.com', password: 'gagansalian@gmail.com' },
//   COORD: { email: 'tester.coordinator@inpulse.in', password: 'tester.coordinator@inpulse.in' }
// };

// // 🔑 Fetch JWT Token
// async function getToken(api, creds) {
//   const res = await api.post(LOGIN_URL, { data: creds, headers: { 'Content-Type': 'application/json' } });
//   expect(res.ok(), `Login failed for ${creds.email}`).toBeTruthy();
//   const token = (await res.json())?.data?.token;
//   if (!token) throw new Error(`Token missing for ${creds.email}`);
//   console.log(`🔐 Token fetched for ${creds.email}`);
//   return token;
// }

// // 📦 Request Body
// const requestBody = {
//   courses: [{
//     nba_code: "QW12", course_code: "QW12",
//     title: "APPLY LAWS OF NATURAL SCIENCE TO AN ENGINEERING PROBLEM",
//     description: "", course_category_id: "dc3e2e54-d4a9-49c1-9039-bf27b84e221f",
//     td_psb_id: "04adb02b-1e82-4041-82a1-596cc88f3a7f", elective_course_id: "", is_skill_course: false
//   }],
//   scheme_contents: [{
//     index: 1, scheme_id: "065f5267-cf4a-42ac-bcf9-60ee5975ed5b",
//     department_id: "04adb02b-1e82-4041-82a1-596cc88f3a7f", course_id: "QW12",
//     theory_lecture: 2, tutorial: 2, practical_drawings: 2, sda: 2, examination_duration: 2,
//     cie_marks: 2, see_marks: 2, credits: 2, semester: 3, cycle: "", allied_department: "",
//     is_skill_course: false, department_specialization_id: "0903a2ba-f3a4-425c-96b0-9aa924071e90"
//   }],
//   deleted_elective_courses: []
// };

// // 🧪 Test Suite
// test.describe('🔒 Scheme Content Access Control (Dynamic Token)', () => {
//   let hodToken, coordToken;

//   test.beforeAll(async ({ request }) => {
//     hodToken = await getToken(request, USERS.HOD);
//     coordToken = await getToken(request, USERS.COORD);
//   });

//   test('✅ HOD should be able to update scheme contents', async ({ request }) => {
//     const res = await request.post(`${BASE_URL}${ENDPOINT}`, {
//       headers: { Authorization: `Bearer ${hodToken}`, 'Content-Type': 'application/json' },
//       data: requestBody
//     });
//     expect(res.status()).toBeGreaterThanOrEqual(200);
//     expect(res.status()).toBeLessThan(300);
//     console.log('✅ HOD Response:', await res.json());
//   });

//   test('❌ Coordinator should NOT be able to update scheme contents', async ({ request }) => {
//     const res = await request.post(`${BASE_URL}${ENDPOINT}`, {
//       headers: { Authorization: `Bearer ${coordToken}`, 'Content-Type': 'application/json' },
//       data: requestBody
//     });
//     const status = res.status();
//     const body = await res.json().catch(() => ({}));

//     if ([401, 403].includes(status)) {
//       console.log('🚫 Access denied as expected:', body.message || body.error || body);
//       expect([401, 403]).toContain(status);
//     } else if (body?.error?.includes('violates row-level security')) {
//       console.log('🚫 Blocked by RLS policy');
//       expect(body.status).toBe('error');
//     } else {
//       console.warn('⚠️ Unexpected success:', body);
//       expect(status).not.toBeLessThan(300);
//     }
//   });
// });


//version 2


import { test, expect, request } from '@playwright/test';

// 🔗 API Endpoint
const BASE_URL = 'https://staging.api.inpulse.education';
const ENDPOINT = '/t/eb9d49bb-bdb9-43c0-9741-febeeca7224a/schemes/contents/programmes/12dc5e21-b80b-4e91-8457-a9d6c70b3c48';

// 🧾 Common Request Body
const requestBody = {
  "courses": [
    {
      "nba_code": "QW12",
      "course_code": "QW12",
      "title": "APPLY LAWS OF NATURAL SCIENCE TO AN ENGINEERING PROBLEM",
      "description": "",
      "course_category_id": "dc3e2e54-d4a9-49c1-9039-bf27b84e221f",
      "td_psb_id": "04adb02b-1e82-4041-82a1-596cc88f3a7f",
      "elective_course_id": "",
      "is_skill_course": false
    }
  ],
  "scheme_contents": [
    {
      "index": 1,
      "scheme_id": "065f5267-cf4a-42ac-bcf9-60ee5975ed5b",
      "department_id": "04adb02b-1e82-4041-82a1-596cc88f3a7f",
      "course_id": "QW12",
      "theory_lecture": 2,
      "tutorial": 2,
      "practical_drawings": 2,
      "sda": 2,
      "examination_duration": 2,
      "cie_marks": 2,
      "see_marks": 2,
      "credits": 2,
      "semester": 3,
      "cycle": "",
      "allied_department": "",
      "is_skill_course": false,
      "department_specialization_id": "0903a2ba-f3a4-425c-96b0-9aa924071e90"
    }
  ],
  "deleted_elective_courses": []
};

// 🎓 Valid HOD Token
const HOD_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhZ2Fuc2FsaWFuQGdtYWlsLmNvbSIsImV4cCI6MTc2NDQ5NjEyNSwiaWF0IjoxNzYxOTA0MTI1LCJzdWIiOiJhYWZlMjE5Ny0yMjM5LTQ0ZjYtYmJkYi1kNWU1Y2M0YjRjYjkifQ.vF7oA51K7FmdAfRaxlprhVYBO0Ar3quJzOyf6V1YdNk';

// 👨‍🏫 Dummy Non-HOD Token (Faculty/Student simulation)
const NON_HOD_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rlci5jb29yZGluYXRvckBpbnB1bHNlLmluIiwiZXhwIjoxNzY0NzY0MjExLCJpYXQiOjE3NjIxNzIyMTEsInN1YiI6IjAzY2UwYWQ0LTI4NzUtNDM1Ny1hZDE1LWEyMThlODBmNjFjYiJ9.315ExXuU8_6W7jKEpDmXcTStrvwjv0qSAlciqhYbITM';

// 🧪 Test Suite
test.describe('🔒 Scheme Content Access Control', () => {

  test('✅ HOD should be able to update scheme contents successfully', async ({ request }) => {
    const response = await request.post(`${BASE_URL}${ENDPOINT}`, {
      headers: {
        'Authorization': `Bearer ${HOD_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: requestBody
    });

    // Expecting successful update (status 200 or 201)
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);

    const body = await response.json();
    console.log('✅ HOD Update Response:', body);
  });

  // 🚫 Enhanced Non-HOD Access Test
  test('❌ Non-HOD user should NOT be able to update scheme contents', async ({ request }) => {
    const response = await request.post(`${BASE_URL}${ENDPOINT}`, {
      headers: {
        'Authorization': `Bearer ${NON_HOD_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: requestBody
    });

    const status = response.status();
    const body = await response.json().catch(() => ({})); // safely parse JSON

    // ✅ Expected forbidden/unauthorized response OR RLS restriction
    if ([401, 403].includes(status)) {
      console.log('🚫 Access denied as expected:', body.message || body.error || body);
      expect([401, 403]).toContain(status);
    }
    // ✅ Handle PostgreSQL RLS violation gracefully
    else if (body?.error?.includes('violates row-level security')) {
      console.log('🚫 Access blocked by RLS policy as expected');
      expect(body.status).toBe('error');
    }
    // ❌ If the request unexpectedly succeeds
    else {
      console.warn('⚠️ Unexpected success response:', body);
      expect(status).not.toBeLessThan(300); // ensure it's not success
    }
  });

});
