import { sequelize } from '@config/sequelize';
import { AccessToken, initAccessTokenModel } from './access-token.model';
import { initOtpVerificationModel, OtpVerification } from './otp-verification.model';
import { initUserModel, User } from './user.model';

initUserModel(sequelize);
initOtpVerificationModel(sequelize);
initAccessTokenModel(sequelize);

User.hasMany(AccessToken, { foreignKey: 'userId', sourceKey: 'id', as: 'accessTokens' });
AccessToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
User.hasMany(OtpVerification, { foreignKey: 'userId', sourceKey: 'id', as: 'otpVerifications' });
OtpVerification.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

export { sequelize, User, OtpVerification, AccessToken };
