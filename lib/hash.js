import crypto from 'crypto';

export default function(method, username, password) {
  const hash = crypto.createHmac(method, username);
  hash.update(password);
  return hash.digest('hex');
}
