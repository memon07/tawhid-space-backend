import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class UserStreak extends Model<InferAttributes<UserStreak>, InferCreationAttributes<UserStreak>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare streakType: string;
  declare currentStreak: CreationOptional<number>;
  declare longestStreak: CreationOptional<number>;
  declare lastActivityDate: CreationOptional<string | null>;
  declare streakStartedAt: CreationOptional<string | null>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initUserStreakModel = (sequelize: Sequelize): typeof UserStreak => {
  UserStreak.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'user_id'
      },
      streakType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'streak_type'
      },
      currentStreak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'current_streak'
      },
      longestStreak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'longest_streak'
      },
      lastActivityDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'last_activity_date'
      },
      streakStartedAt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'streak_started_at'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
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
      }
    },
    {
      sequelize,
      modelName: 'UserStreak',
      tableName: 'user_streaks',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return UserStreak;
};
