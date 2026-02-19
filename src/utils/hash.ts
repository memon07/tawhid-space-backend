import crypto from 'crypto';

export const sha256 = (value: string): string => {
  return crypto.createHash('sha256').update(value).digest('hex');
};

const PASSWORD_PREFIX = 'scrypt';

export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${PASSWORD_PREFIX}:${salt}:${derivedKey}`;
};

export const verifyPassword = (password: string, storedHash: string): boolean => {
  const [prefix, salt, hash] = storedHash.split(':');
  if (prefix !== PASSWORD_PREFIX || !salt || !hash) {
    return false;
  }

  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derivedKey, 'hex'));
};
