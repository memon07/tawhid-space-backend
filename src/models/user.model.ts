import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare phoneNumber: string;
  declare phoneCountryCode: CreationOptional<string | null>;
  declare passwordHash: CreationOptional<string | null>;
  declare fullName: CreationOptional<string | null>;
  declare birthDate: CreationOptional<string | null>;
  declare gender: CreationOptional<string | null>;
  declare preferredLanguage: CreationOptional<string | null>;
  declare profileImageUrl: CreationOptional<string | null>;
  declare isActive: CreationOptional<boolean>;
  declare isOnboarded: CreationOptional<boolean>;
  declare onboardedAt: CreationOptional<Date | null>;
  declare lastLoginAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
}

export const initUserModel = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'phone_number'
      },
      phoneCountryCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'phone_country_code'
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'password_hash'
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'full_name'
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'birth_date'
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      preferredLanguage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'en',
        field: 'preferred_language'
      },
      profileImageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'profile_image_url'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
      },
      isOnboarded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_onboarded'
      },
      onboardedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'onboarded_at'
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login_at'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      underscored: true,
      paranoid: true,
      deletedAt: 'deleted_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return User;
};
