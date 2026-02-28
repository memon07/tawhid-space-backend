import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class UserSetting extends Model<InferAttributes<UserSetting>, InferCreationAttributes<UserSetting>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare settingKey: string;
  declare settingValue: Record<string, unknown>;
  declare updatedAt: CreationOptional<Date>;
}

export const initUserSettingModel = (sequelize: Sequelize): typeof UserSetting => {
  UserSetting.init(
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
      settingKey: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'setting_key'
      },
      settingValue: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
        field: 'setting_value'
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
      modelName: 'UserSetting',
      tableName: 'user_settings',
      timestamps: true,
      createdAt: false,
      updatedAt: 'updated_at'
    }
  );

  return UserSetting;
};
