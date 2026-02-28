import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class UserEmotion extends Model<InferAttributes<UserEmotion>, InferCreationAttributes<UserEmotion>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare emotionId: number;
  declare selectedAt: CreationOptional<Date>;
  declare context: CreationOptional<string | null>;
  declare isCurrent: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
}

export const initUserEmotionModel = (sequelize: Sequelize): typeof UserEmotion => {
  UserEmotion.init(
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
      emotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'emotion_id'
      },
      selectedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'selected_at'
      },
      context: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isCurrent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_current'
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
      modelName: 'UserEmotion',
      tableName: 'user_emotions',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at'
    }
  );

  return UserEmotion;
};
