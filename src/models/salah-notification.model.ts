import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class SalahNotification extends Model<
  InferAttributes<SalahNotification>,
  InferCreationAttributes<SalahNotification>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare salahType: string;
  declare notificationOffsetMinutes: CreationOptional<number>;
  declare isEnabled: CreationOptional<boolean>;
  declare soundPreference: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initSalahNotificationModel = (sequelize: Sequelize): typeof SalahNotification => {
  SalahNotification.init(
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
      salahType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'salah_type'
      },
      notificationOffsetMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'notification_offset_minutes'
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_enabled'
      },
      soundPreference: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'sound_preference'
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
      modelName: 'SalahNotification',
      tableName: 'salah_notifications',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return SalahNotification;
};
