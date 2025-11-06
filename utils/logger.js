// // utils/logger.js
// import fs from 'fs';
// import path from 'path';

// export function logToFile(filename, ...messages) {
//   const fullPath = path.resolve(filename);
//   const logMessage = messages.map(msg => 
//     typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg
//   ).join(' ') + '\n';

//   fs.mkdirSync(path.dirname(fullPath), { recursive: true }); // Ensure directory exists
//   fs.appendFileSync(fullPath, logMessage, 'utf8');
// }


// v0ersion 2 overwrite logToFile function to use console.log

import fs from 'fs';
import path from 'path';

export function logToFile(filename, message, overwrite = false) {
  const logPath = path.resolve(filename);
  const writeMethod = overwrite ? fs.writeFileSync : fs.appendFileSync;
  const formatted = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
  writeMethod(logPath, formatted + '\n');
}
