import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class AccessToken extends Model<InferAttributes<AccessToken>, InferCreationAttributes<AccessToken>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare token: string;
  declare deviceInfo: CreationOptional<Record<string, unknown> | null>;
  declare expiresAt: Date;
  declare isRevoked: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
}

export const initAccessTokenModel = (sequelize: Sequelize): typeof AccessToken => {
  AccessToken.init(
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
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      deviceInfo: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: 'device_info'
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at'
      },
      isRevoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_revoked'
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
      modelName: 'AccessToken',
      tableName: 'access_tokens',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at'
    }
  );

  return AccessToken;
};
