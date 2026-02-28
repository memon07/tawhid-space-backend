import dotenv from 'dotenv';

dotenv.config();

const getString = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const getNumber = (key: string, fallback: number): number => {
  const value = process.env[key];
  if (!value) {
    return fallback;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid number environment variable: ${key}`);
  }
  return parsed;
};

const getBoolean = (key: string, fallback: boolean): boolean => {
  const value = process.env[key];
  if (!value) {
    return fallback;
  }
  return value.toLowerCase() === 'true';
};

export const env = {
  nodeEnv: getString('NODE_ENV', 'development'),
  port: getNumber('PORT', 3000),
  db: {
    host: getString('DB_HOST', 'localhost'),
    port: getNumber('DB_PORT', 5432),
    name: getString('DB_NAME', 'tawhid_space_dev'),
    user: getString('DB_USER', 'postgres'),
    password: getString('DB_PASSWORD', ''),
    dialect: getString('DB_DIALECT', 'postgres'),
    logging: getBoolean('DB_LOGGING', false)
  },
  jwt: {
    accessSecret: getString('JWT_SECRET', 'dev_access_secret_change_me'),
    accessExpiresIn: getString('JWT_EXPIRES_IN', '7d'),
    refreshSecret: getString('JWT_REFRESH_SECRET', 'dev_refresh_secret_change_me'),
    refreshExpiresIn: getString('JWT_REFRESH_EXPIRES_IN', '30d')
  },
  otp: {
    expirySeconds: getNumber('OTP_EXPIRY_SECONDS', 90),
    length: getNumber('OTP_LENGTH', 6),
    maxAttempts: getNumber('OTP_MAX_ATTEMPTS', 3),
    resendDelaySeconds: getNumber('OTP_RESEND_DELAY_SECONDS', 30),
    maxPerHour: getNumber('OTP_MAX_PER_HOUR', 5),
    verifiedSessionMinutes: getNumber('OTP_VERIFIED_SESSION_MINUTES', 10)
  }
};

export const isProduction = env.nodeEnv === 'production';
