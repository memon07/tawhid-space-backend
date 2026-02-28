import { sequelize } from '@config/sequelize';
import { AccessToken, initAccessTokenModel } from './access-token.model';
import { ActivitySession, initActivitySessionModel } from './activity-session.model';
import { AssessmentQuestion, initAssessmentQuestionModel } from './assessment-question.model';
import { AssessmentTemplate, initAssessmentTemplateModel } from './assessment-template.model';
import { BadgeDefinition, initBadgeDefinitionModel } from './badge-definition.model';
import { ContentCategory, initContentCategoryModel } from './content-category.model';
import { ContentLibrary, initContentLibraryModel } from './content-library.model';
import { ContentTranslation, initContentTranslationModel } from './content-translation.model';
import { DailyProgress, initDailyProgressModel } from './daily-progress.model';
import { DailyQuoteAssignment, initDailyQuoteAssignmentModel } from './daily-quote-assignment.model';
import { Emotion, initEmotionModel } from './emotion.model';
import { Intervention, initInterventionModel } from './intervention.model';
import { initOtpVerificationModel, OtpVerification } from './otp-verification.model';
import { SalahNotification, initSalahNotificationModel } from './salah-notification.model';
import { initSalahTimingModel, SalahTiming } from './salah-timing.model';
import { SessionMetric, initSessionMetricModel } from './session-metric.model';
import { UserAssessment, initUserAssessmentModel } from './user-assessment.model';
import { UserBadge, initUserBadgeModel } from './user-badge.model';
import { initUserEmotionModel, UserEmotion } from './user-emotion.model';
import { UserIntervention, initUserInterventionModel } from './user-intervention.model';
import { UserPoint, initUserPointModel } from './user-point.model';
import { initUserSettingModel, UserSetting } from './user-setting.model';
import { UserStreak, initUserStreakModel } from './user-streak.model';
import { initUserModel, User } from './user.model';

initUserModel(sequelize);
initOtpVerificationModel(sequelize);
initAccessTokenModel(sequelize);
initUserSettingModel(sequelize);
initEmotionModel(sequelize);
initUserEmotionModel(sequelize);
initSalahTimingModel(sequelize);
initSalahNotificationModel(sequelize);
initContentCategoryModel(sequelize);
initContentLibraryModel(sequelize);
initContentTranslationModel(sequelize);
initActivitySessionModel(sequelize);
initSessionMetricModel(sequelize);
initUserStreakModel(sequelize);
initDailyProgressModel(sequelize);
initBadgeDefinitionModel(sequelize);
initUserBadgeModel(sequelize);
initUserPointModel(sequelize);
initDailyQuoteAssignmentModel(sequelize);
initAssessmentTemplateModel(sequelize);
initAssessmentQuestionModel(sequelize);
initUserAssessmentModel(sequelize);
initInterventionModel(sequelize);
initUserInterventionModel(sequelize);

User.hasMany(AccessToken, { foreignKey: 'userId', sourceKey: 'id', as: 'accessTokens' });
AccessToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

User.hasMany(OtpVerification, { foreignKey: 'userId', sourceKey: 'id', as: 'otpVerifications' });
OtpVerification.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

User.hasMany(UserSetting, { foreignKey: 'userId', sourceKey: 'id', as: 'userSettings' });
UserSetting.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

User.hasMany(SalahTiming, { foreignKey: 'userId', sourceKey: 'id', as: 'salahTimings' });
SalahTiming.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

User.hasMany(SalahNotification, { foreignKey: 'userId', sourceKey: 'id', as: 'salahNotifications' });
SalahNotification.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

User.hasMany(UserEmotion, { foreignKey: 'userId', sourceKey: 'id', as: 'userEmotions' });
UserEmotion.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
Emotion.hasMany(UserEmotion, { foreignKey: 'emotionId', sourceKey: 'id', as: 'userEmotions' });
UserEmotion.belongsTo(Emotion, { foreignKey: 'emotionId', targetKey: 'id', as: 'emotion' });

ContentCategory.hasMany(ContentCategory, {
  foreignKey: 'parentCategoryId',
  sourceKey: 'id',
  as: 'children'
});
ContentCategory.belongsTo(ContentCategory, {
  foreignKey: 'parentCategoryId',
  targetKey: 'id',
  as: 'parent'
});

ContentCategory.hasMany(ContentLibrary, { foreignKey: 'categoryId', sourceKey: 'id', as: 'contents' });
ContentLibrary.belongsTo(ContentCategory, { foreignKey: 'categoryId', targetKey: 'id', as: 'category' });

ContentLibrary.hasMany(ContentTranslation, {
  foreignKey: 'contentId',
  sourceKey: 'id',
  as: 'translations'
});
ContentTranslation.belongsTo(ContentLibrary, {
  foreignKey: 'contentId',
  targetKey: 'id',
  as: 'content'
});

User.hasMany(ActivitySession, { foreignKey: 'userId', sourceKey: 'id', as: 'activitySessions' });
ActivitySession.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

ContentLibrary.hasMany(ActivitySession, {
  foreignKey: 'contentId',
  sourceKey: 'id',
  as: 'activitySessions'
});
ActivitySession.belongsTo(ContentLibrary, { foreignKey: 'contentId', targetKey: 'id', as: 'content' });

Emotion.hasMany(ActivitySession, {
  foreignKey: 'emotionBeforeId',
  sourceKey: 'id',
  as: 'activitySessionsBeforeEmotion'
});
Emotion.hasMany(ActivitySession, {
  foreignKey: 'emotionAfterId',
  sourceKey: 'id',
  as: 'activitySessionsAfterEmotion'
});
ActivitySession.belongsTo(Emotion, {
  foreignKey: 'emotionBeforeId',
  targetKey: 'id',
  as: 'emotionBefore'
});
ActivitySession.belongsTo(Emotion, {
  foreignKey: 'emotionAfterId',
  targetKey: 'id',
  as: 'emotionAfter'
});

ActivitySession.hasMany(SessionMetric, {
  foreignKey: 'sessionId',
  sourceKey: 'id',
  as: 'sessionMetrics'
});
SessionMetric.belongsTo(ActivitySession, { foreignKey: 'sessionId', targetKey: 'id', as: 'session' });

User.hasMany(UserStreak, { foreignKey: 'userId', sourceKey: 'id', as: 'userStreaks' });
UserStreak.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

User.hasMany(DailyProgress, { foreignKey: 'userId', sourceKey: 'id', as: 'dailyProgress' });
DailyProgress.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

BadgeDefinition.hasMany(UserBadge, { foreignKey: 'badgeId', sourceKey: 'id', as: 'userBadges' });
UserBadge.belongsTo(BadgeDefinition, { foreignKey: 'badgeId', targetKey: 'id', as: 'badge' });
User.hasMany(UserBadge, { foreignKey: 'userId', sourceKey: 'id', as: 'userBadges' });
UserBadge.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

User.hasOne(UserPoint, { foreignKey: 'userId', sourceKey: 'id', as: 'userPoints' });
UserPoint.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

User.hasMany(DailyQuoteAssignment, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'dailyQuoteAssignments'
});
DailyQuoteAssignment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
ContentLibrary.hasMany(DailyQuoteAssignment, {
  foreignKey: 'contentId',
  sourceKey: 'id',
  as: 'dailyQuoteAssignments'
});
DailyQuoteAssignment.belongsTo(ContentLibrary, {
  foreignKey: 'contentId',
  targetKey: 'id',
  as: 'content'
});
Emotion.hasMany(DailyQuoteAssignment, {
  foreignKey: 'emotionMatchId',
  sourceKey: 'id',
  as: 'dailyQuoteAssignments'
});
DailyQuoteAssignment.belongsTo(Emotion, {
  foreignKey: 'emotionMatchId',
  targetKey: 'id',
  as: 'emotion'
});

AssessmentTemplate.hasMany(AssessmentQuestion, {
  foreignKey: 'templateId',
  sourceKey: 'id',
  as: 'questions'
});
AssessmentQuestion.belongsTo(AssessmentTemplate, {
  foreignKey: 'templateId',
  targetKey: 'id',
  as: 'template'
});

AssessmentTemplate.hasMany(UserAssessment, {
  foreignKey: 'templateId',
  sourceKey: 'id',
  as: 'userAssessments'
});
UserAssessment.belongsTo(AssessmentTemplate, {
  foreignKey: 'templateId',
  targetKey: 'id',
  as: 'template'
});
User.hasMany(UserAssessment, { foreignKey: 'userId', sourceKey: 'id', as: 'userAssessments' });
UserAssessment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

Intervention.hasMany(UserIntervention, {
  foreignKey: 'interventionId',
  sourceKey: 'id',
  as: 'userInterventions'
});
UserIntervention.belongsTo(Intervention, {
  foreignKey: 'interventionId',
  targetKey: 'id',
  as: 'intervention'
});
User.hasMany(UserIntervention, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'userInterventions'
});
UserIntervention.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

export {
  sequelize,
  User,
  OtpVerification,
  AccessToken,
  UserSetting,
  Emotion,
  UserEmotion,
  SalahTiming,
  SalahNotification,
  ContentCategory,
  ContentLibrary,
  ContentTranslation,
  ActivitySession,
  SessionMetric,
  UserStreak,
  DailyProgress,
  BadgeDefinition,
  UserBadge,
  UserPoint,
  DailyQuoteAssignment,
  AssessmentTemplate,
  AssessmentQuestion,
  UserAssessment,
  Intervention,
  UserIntervention
};
