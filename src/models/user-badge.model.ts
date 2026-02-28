import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class UserBadge extends Model<InferAttributes<UserBadge>, InferCreationAttributes<UserBadge>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare badgeId: number;
  declare achievedAt: CreationOptional<Date>;
  declare progressPercentage: CreationOptional<string>;
  declare isShowcased: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
}

export const initUserBadgeModel = (sequelize: Sequelize): typeof UserBadge => {
  UserBadge.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'user_id'
      },
      badgeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'badge_id'
      },
      achievedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'achieved_at'
      },
      progressPercentage: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        field: 'progress_percentage'
      },
      isShowcased: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_showcased'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
      }
    },
    {
      sequelize,
      modelName: 'UserBadge',
      tableName: 'user_badges',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at'
    }
  );

  return UserBadge;
};
