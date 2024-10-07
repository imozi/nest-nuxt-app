import { parentPort, workerData } from 'node:worker_threads';
import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';

const { data, secret, method } = workerData;

const encryptData = (data: any, secret: string) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-gcm', secret, iv);
  const encrypted = cipher.update(data, 'utf8', 'base64');
  const final = cipher.final('base64');
  const authTag = cipher.getAuthTag().toString('base64');

  return `${iv.toString('base64')}:${encrypted + final}:${authTag}`;
};

const decryptData = (data: any, secret: string) => {
  const [ivHex, encrypted, authTagHex] = data.split(':');
  const iv = Buffer.from(ivHex, 'base64');
  const authTag = Buffer.from(authTagHex, 'base64');

  const decipher = createDecipheriv('aes-256-gcm', secret, iv);
  decipher.setAuthTag(authTag);

  const decrypted = decipher.update(encrypted, 'base64', 'utf8');
  const final = decipher.final('utf8');

  return decrypted + final;
};

switch (true) {
  case method === 'encrypt':
    parentPort.postMessage(encryptData(data, secret));
    break;
  case method === 'decrypt':
    parentPort.postMessage(decryptData(data, secret));
    break;
}
