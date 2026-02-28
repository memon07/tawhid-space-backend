import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class DailyProgress extends Model<InferAttributes<DailyProgress>, InferCreationAttributes<DailyProgress>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare progressDate: string;
  declare sessionsCompleted: CreationOptional<number>;
  declare targetSessions: CreationOptional<number>;
  declare completionPercentage: CreationOptional<string | null>;
  declare streakDayNumber: CreationOptional<number | null>;
  declare colorCode: CreationOptional<string | null>;
  declare moodSummary: CreationOptional<Record<string, unknown> | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initDailyProgressModel = (sequelize: Sequelize): typeof DailyProgress => {
  DailyProgress.init(
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
      progressDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'progress_date'
      },
      sessionsCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'sessions_completed'
      },
      targetSessions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'target_sessions'
      },
      completionPercentage: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: 'completion_percentage'
      },
      streakDayNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'streak_day_number'
      },
      colorCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'color_code'
      },
      moodSummary: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: 'mood_summary'
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
      modelName: 'DailyProgress',
      tableName: 'daily_progress',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return DailyProgress;
};
