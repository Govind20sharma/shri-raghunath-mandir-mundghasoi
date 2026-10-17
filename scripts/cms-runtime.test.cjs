const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

test('Firebase Auth loads and resolves signing keys when require(ESM) is disabled on the host', () => {
  const source = `
    require('firebase-admin/auth');
    const { generateKeyPairSync } = require('node:crypto');
    const jwt = require('jsonwebtoken');
    const { retrieveSigningKeys } = require('jwks-rsa/src/utils');
    (async () => {
      const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
      const jwk = { ...publicKey.export({format:'jwk'}), kid:'runtime-regression', alg:'RS256', use:'sig' };
      const keys = await retrieveSigningKeys([jwk]);
      if (keys.length !== 1) throw new Error('Signing key could not be imported.');
      const token = jwt.sign({purpose:'runtime-regression'}, privateKey, {algorithm:'RS256'});
      const verified = jwt.verify(token, keys[0].getPublicKey(), {algorithms:['RS256']});
      if (verified.purpose !== 'runtime-regression') throw new Error('Signature verification failed.');
    })().catch(error => { console.error(error.message); process.exitCode = 1; });
  `;
  const result = spawnSync(process.execPath, ['--no-experimental-require-module', '-e', source], {cwd:process.cwd(),encoding:'utf8',timeout:60000});
  assert.equal(result.status, 0, result.stderr || result.error?.message);
});
