import fs from 'fs';
import path from 'path';

async function globalTeardown() {
  const storagePath = path.join(__dirname, '.auth/user.json');

  console.log('\n--- Authority OS: Finalizing Environment ---');

  try {
    await fs.promises.access(storagePath);
    await fs.promises.unlink(storagePath);
    console.log(`✅ Session state deleted: ${storagePath}`);
  } catch {
    // File does not exist — nothing to clean up
  }

  console.log('--- Teardown Complete: Ready for next run ---\n');
}

export default globalTeardown;
