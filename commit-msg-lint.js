const fs = require('fs');
const messageFilePath = '.git/COMMIT_EDITMSG';
const regexp = /^(feat|fix|docs|style|refactor|test|chore):( UI\-\d{4,})( .{3,}[^.\s])((\n+.+)+)?$/i;

const message = fs.readFileSync(messageFilePath).toString().trim();

if (!regexp.test(message)) {
  console.error('\x1b[31m', 'Commit message format is not correct', '\x1b[0m');
  console.log('https://confluence.it.volvo.net/display/UX/Comments+convention');
  process.exit(1);
}
