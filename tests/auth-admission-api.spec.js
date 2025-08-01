const { test, expect } = require('@playwright/test');

test('TC_ADM_002 - Unauthorized user cannot modify admission fee', async ({ request }) => {
  const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
  const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';

  // Replace this with a token of a user who is NOT allowed to change fee
  const unauthorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVuLnBAaW51bml0eS5pbiIsImV4cCI6MTc1NjI5MDgwNCwiaWF0IjoxNzUzNjk4ODA0LCJzdWIiOiIxMTAyNzgyZi1iMzA2LTRmOWYtODExZi01ZDNiNDNiNzFlZTgifQ.8DXOEoIKdxPtXKtF29_kHhc5vKqDPrIuFyT-OUEcL2I';

  const response = await request.fetch(`https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/details`, {
    method: 'PUT', // or PATCH based on your API
    headers: {
      'Content-Type': 'application/json',
      'Authorization': unauthorizedToken
    },
    data: {
      fee: 35000
    }
  });

  // Expect 401 or 403 error
  expect([401, 403]).toContain(response.status());

  // Check content-type before parsing
  const contentType = response.headers()['content-type'] || '';

  if (contentType.includes('application/json')) {
    const responseBody = await response.json();
    expect(responseBody.message.toLowerCase()).toContain("forbidden");
  } else {
    const responseText = await response.text();
    expect(responseText.toLowerCase()).toContain("forbidden");
  }
});
