import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class ActivitySession extends Model<InferAttributes<ActivitySession>, InferCreationAttributes<ActivitySession>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare sessionType: string;
  declare salahType: CreationOptional<string | null>;
  declare contentId: CreationOptional<number | null>;
  declare startedAt: CreationOptional<Date | null>;
  declare completedAt: CreationOptional<Date | null>;
  declare durationSeconds: CreationOptional<number | null>;
  declare repetitionsCompleted: CreationOptional<number | null>;
  declare qualityRating: CreationOptional<number | null>;
  declare emotionBeforeId: CreationOptional<number | null>;
  declare emotionAfterId: CreationOptional<number | null>;
  declare location: CreationOptional<Record<string, unknown> | null>;
  declare notes: CreationOptional<string | null>;
  declare isCompleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initActivitySessionModel = (sequelize: Sequelize): typeof ActivitySession => {
  ActivitySession.init(
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
      sessionType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'session_type'
      },
      salahType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'salah_type'
      },
      contentId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'content_id'
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'started_at'
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'completed_at'
      },
      durationSeconds: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'duration_seconds'
      },
      repetitionsCompleted: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'repetitions_completed'
      },
      qualityRating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'quality_rating'
      },
      emotionBeforeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'emotion_before_id'
      },
      emotionAfterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'emotion_after_id'
      },
      location: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_completed'
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
      modelName: 'ActivitySession',
      tableName: 'activity_sessions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return ActivitySession;
};
