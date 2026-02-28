import { User } from '@models/index';
import { InferAttributes } from 'sequelize';

export const userRepository = {
  async findByPhone(phoneNumber: string): Promise<User | null> {
    return User.findOne({ where: { phoneNumber } });
  },

  async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  },

  async list(limit: number, offset: number): Promise<{ rows: User[]; count: number }> {
    return User.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
  },

  async create(phoneNumber: string): Promise<User> {
    return User.create({ phoneNumber, preferredLanguage: 'en' });
  },

  async updateLastLogin(userId: number): Promise<void> {
    await User.update({ lastLoginAt: new Date() }, { where: { id: userId } });
  },

  async updateById(
    id: number,
    payload: Partial<
      Pick<
        InferAttributes<User>,
        | 'phoneCountryCode'
        | 'fullName'
        | 'birthDate'
        | 'gender'
        | 'preferredLanguage'
        | 'profileImageUrl'
      >
    >
  ): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    await user.update(payload);
    return user;
  },

  async setActive(id: number, isActive: boolean): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    await user.update({ isActive });
    return user;
  },

  async setOnboarding(id: number, isOnboarded: boolean): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    await user.update({
      isOnboarded,
      onboardedAt: isOnboarded ? user.onboardedAt ?? new Date() : null
    });
    return user;
  },

  async setPassword(id: number, passwordHash: string): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    await user.update({ passwordHash });
    return user;
  },

  async completeOnboarding(
    id: number,
    payload: {
      preferredLanguage: string;
      fullName: string;
      birthDate: string | null;
      gender: string;
    }
  ): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    await user.update({
      preferredLanguage: payload.preferredLanguage,
      fullName: payload.fullName,
      birthDate: payload.birthDate,
      gender: payload.gender,
      isOnboarded: true,
      onboardedAt: user.onboardedAt ?? new Date()
    });
    return user;
  },

  async softDelete(id: number): Promise<boolean> {
    const affectedRows = await User.destroy({ where: { id } });
    return affectedRows > 0;
  }
};
