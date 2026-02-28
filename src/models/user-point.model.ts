import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class UserPoint extends Model<InferAttributes<UserPoint>, InferCreationAttributes<UserPoint>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare pointsEarned: CreationOptional<number>;
  declare pointsSpent: CreationOptional<number>;
  declare balance: CreationOptional<number>;
  declare lastEarnedAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initUserPointModel = (sequelize: Sequelize): typeof UserPoint => {
  UserPoint.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        field: 'user_id'
      },
      pointsEarned: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'points_earned'
      },
      pointsSpent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'points_spent'
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      lastEarnedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_earned_at'
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
      modelName: 'UserPoint',
      tableName: 'user_points',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return UserPoint;
};
