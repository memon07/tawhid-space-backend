import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class OtpVerification extends Model<
  InferAttributes<OtpVerification>,
  InferCreationAttributes<OtpVerification>
> {
  declare id: CreationOptional<number>;
  declare userId: CreationOptional<number | null>;
  declare phoneNumber: string;
  declare otpCode: string;
  declare purpose: string;
  declare expiresAt: Date;
  declare verifiedAt: CreationOptional<Date | null>;
  declare attemptCount: CreationOptional<number>;
  declare isUsed: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
}

export const initOtpVerificationModel = (sequelize: Sequelize): typeof OtpVerification => {
  OtpVerification.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'user_id'
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'phone_number'
      },
      otpCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'otp_code'
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at'
      },
      verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'verified_at'
      },
      attemptCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'attempt_count'
      },
      isUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_used'
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
      modelName: 'OtpVerification',
      tableName: 'otp_verifications',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at'
    }
  );

  return OtpVerification;
};
