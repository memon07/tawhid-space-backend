export interface ListUsersQuery {
  page: number;
  limit: number;
}

export interface UpdateUserInput {
  phoneCountryCode?: string | null;
  fullName?: string | null;
  birthDate?: string | null;
  gender?: string | null;
  preferredLanguage?: string;
  profileImageUrl?: string | null;
}

export interface UpdateUserActiveInput {
  isActive: boolean;
}

export interface UpdateUserOnboardingInput {
  isOnboarded: boolean;
}

export interface SubmitOnboardingInput {
  phoneNumber: string;
  preferredLanguage: string;
  fullName: string;
  birthDate?: string;
  age?: number;
  gender: string;
}
