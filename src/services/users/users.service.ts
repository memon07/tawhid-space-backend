import { userRepository } from '@repositories/user.repository';
import { HttpError } from '@utils/http-error';
import {
  SubmitOnboardingInput,
  UpdateUserActiveInput,
  UpdateUserInput,
  UpdateUserOnboardingInput
} from '@/types/user';
import { normalizePhoneE164 } from '@utils/phone';

const deriveBirthDateFromAge = (age: number): string => {
  const now = new Date();
  const year = now.getUTCFullYear() - age;
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const usersService = {
  async listUsers(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const result = await userRepository.list(limit, offset);

    return {
      items: result.rows,
      pagination: {
        page,
        limit,
        totalItems: result.count,
        totalPages: Math.max(1, Math.ceil(result.count / limit))
      }
    };
  },

  async getUserById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    return user;
  },

  async updateUser(id: number, payload: UpdateUserInput) {
    const user = await userRepository.updateById(id, payload);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    return user;
  },

  async updateActive(id: number, payload: UpdateUserActiveInput) {
    const user = await userRepository.setActive(id, payload.isActive);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    return user;
  },

  async updateOnboarding(id: number, payload: UpdateUserOnboardingInput) {
    const user = await userRepository.setOnboarding(id, payload.isOnboarded);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    return user;
  },

  async deleteUser(id: number): Promise<void> {
    const deleted = await userRepository.softDelete(id);
    if (!deleted) {
      throw new HttpError(404, 'User not found');
    }
  },

  async submitOnboarding(payload: SubmitOnboardingInput) {
    const phoneNumber = normalizePhoneE164(payload.phoneNumber);
    const user = await userRepository.findByPhone(phoneNumber);

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    const birthDate = payload.birthDate ?? (payload.age ? deriveBirthDateFromAge(payload.age) : null);

    const updatedUser = await userRepository.completeOnboarding(user.id, {
      preferredLanguage: payload.preferredLanguage,
      fullName: payload.fullName,
      birthDate,
      gender: payload.gender
    });

    if (!updatedUser) {
      throw new HttpError(404, 'User not found');
    }

    return updatedUser;
  }
};
