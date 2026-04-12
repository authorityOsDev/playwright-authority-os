import fs from 'fs';
import path from 'path';

async function globalTeardown() {
  // Use the same path logic as in your config
  const storagePath = path.join(__dirname, '.auth/user.json');

  console.log('\n--- Authority OS: Finalizing Environment ---');

  if (fs.existsSync(storagePath)) {
    try {
      fs.unlinkSync(storagePath);
      console.log(`✅ Session state deleted: ${storagePath}`);
    } catch (err) {
      console.error(`❌ Error deleting session state: ${err}`);
    }
  }
  
  console.log('--- Teardown Complete: Ready for next run ---\n');
}

export default globalTeardown;