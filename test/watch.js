const fs = require('fs');
const { spawn } = require('child_process');

const watchFileName = process.argv[2];
const scriptName = process.argv[3];
let child = null;

function runScript() {
  if (child) {
    child.kill();
  }

  child = spawn('node', [scriptName], { stdio: 'inherit' });
}

runScript();

fs.watchFile(watchFileName, () => {
  console.log(`File ${watchFileName} changed, restarting...`);
  runScript();
});
