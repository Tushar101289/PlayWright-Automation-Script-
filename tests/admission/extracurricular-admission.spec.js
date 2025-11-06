const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('TC_ADM_003 - Fetch student extra-curricular activities and log full response', async ({ request }) => {
  const tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';
  const studentId = '5d858032-7035-4e45-9f74-8af14128b4e5';
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyanVuLnBAaW51bml0eS5pbiIsImV4cCI6MTc1NjM3NTA5MiwiaWF0IjoxNzUzNzgzMDkyLCJzdWIiOiIxMTAyNzgyZi1iMzA2LTRmOWYtODExZi01ZDNiNDNiNzFlZTgifQ.Ys66nESjV8vc822NdrKl3sqYJvvBedF6Hyvmi-XeHK4';

  const url = `https://staging.api.inpulse.education/t/${tenantId}/admissions/student-registration/${studentId}/extra-curricular-activities`;

  const logFile = path.join(__dirname, 'response-log.txt');
  let logData = "";

  logData += `🚀 Sending GET request to: ${url}\n`;
  logData += `🔐 Using token (first 30 chars): ${token.slice(0, 30)} ...\n`;

  const response = await request.get(url, {
    headers: {
      'Authorization': token
    }
  });

  const status = response.status();
  logData += `📡 Response Status Code: ${status}\n`;

  const contentType = response.headers()['content-type'] || '';
  logData += `📄 Content-Type: ${contentType}\n`;

  if (contentType.includes('application/json')) {
    const json = await response.json();
    logData += "📦 JSON Response Body:\n" + JSON.stringify(json, null, 2) + "\n";
  } else {
    const text = await response.text();
    logData += "📦 Raw Text Response:\n" + text + "\n";
  }

  if (!response.ok()) {
    logData += `⚠️ Request failed with status ${status}. This might be due to missing permissions, bad token, or missing record.\n`;
  } else {
    logData += "✅ Request succeeded.\n";
  }

  fs.writeFileSync(logFile, logData, { encoding: 'utf8' });
});
