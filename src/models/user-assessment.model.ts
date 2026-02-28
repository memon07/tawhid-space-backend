import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class UserAssessment extends Model<InferAttributes<UserAssessment>, InferCreationAttributes<UserAssessment>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare templateId: number;
  declare completedAt: CreationOptional<Date | null>;
  declare totalScore: CreationOptional<string | null>;
  declare interpretation: CreationOptional<string | null>;
  declare responses: CreationOptional<Record<string, unknown> | null>;
  declare followUpRecommended: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
}

export const initUserAssessmentModel = (sequelize: Sequelize): typeof UserAssessment => {
  UserAssessment.init(
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
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'template_id'
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'completed_at'
      },
      totalScore: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: 'total_score'
      },
      interpretation: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      responses: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      followUpRecommended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'follow_up_recommended'
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
      modelName: 'UserAssessment',
      tableName: 'user_assessments',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at'
    }
  );

  return UserAssessment;
};
