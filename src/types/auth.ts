export type OtpPurpose = 'signup' | 'login' | 'reset_password';

export interface RequestOtpInput {
  phoneNumber: string;
  purpose: OtpPurpose;
}

export interface VerifyOtpInput {
  phoneNumber: string;
  otpCode: string;
  purpose: OtpPurpose;
  deviceInfo?: Record<string, unknown>;
}

export interface LoginInput {
  phoneNumber: string;
  password: string;
  deviceInfo?: Record<string, unknown>;
}

export interface SavePasswordInput {
  password: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
  deviceInfo?: Record<string, unknown>;
}

export interface LogoutInput {
  refreshToken: string;
}
