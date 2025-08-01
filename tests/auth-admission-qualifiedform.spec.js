const { test, expect } = require('@playwright/test');

test('TC_ADM_005 - Unauthorized user cannot update student qualification details', async ({ request }) => {
  const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
  const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
  const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/qualification-details`;

  // 🔒 Replace this with a token of a user who should NOT have permission
  const unauthorizedToken = 'Bearer eyJhbGciOi...unauth_token';

  const payload = {
    id: "cece6a50-44a0-4a38-9c71-ad84a748840c",
    student_id: studentId,
    educational_level: "PUC",
    educational_medium_id: "37957387-95dc-4416-bdf0-0bb9b5084da1",
    examination_board_id: "0ac9690e-f05d-461b-9e88-a806230cec66",
    exam_state_id: "42c42d82-1a6a-4c30-bca3-d136abd592b2",
    institute_id: "9ec42e45-7385-4d90-b4c9-c47a18ba7156",
    registration_number: "1111111",
    passing_month: "January",
    passing_year: 2025,
    obtained_marks: 99,
    biology: 99,
    biology_total_marks: 100,
    chemistry: 99,
    chemistry_total_marks: 100,
    physics: 99,
    physics_total_marks: 100,
    mathematics: 99,
    mathematics_total_marks: 100,
    computer_science: 0,
    computer_science_total_marks: 0,
    statistics: 0,
    statistics_total_marks: 0,
    electronics: 0,
    electronics_total_marks: 0,
    other: 0
  };

  console.log('🚨 Unauthorized user trying to update data...');
  console.log('🔗 URL:', url);
  console.log('📤 Payload:', JSON.stringify(payload, null, 2));

  const response = await request.post(url, {
    headers: {
      'Authorization': unauthorizedToken,
      'Content-Type': 'application/json'
    },
    data: payload
  });

  const statusCode = response.status();
  console.log('📡 Status Code:', statusCode);

  try {
    const contentType = response.headers()['content-type'] || '';
    if (contentType.includes('application/json')) {
      const json = await response.json();
      console.log("📥 Response JSON:\n", JSON.stringify(json, null, 2));
    } else {
      const text = await response.text();
      console.log("📥 Response Text:\n", text);
    }
  } catch (e) {
    console.log('⚠️ Could not parse response body');
  }

  // ✅ You expect 401 or 403 in this case
  expect([401, 403]).toContain(statusCode);
});
