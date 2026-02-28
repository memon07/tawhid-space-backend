import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class AssessmentQuestion extends Model<
  InferAttributes<AssessmentQuestion>,
  InferCreationAttributes<AssessmentQuestion>
> {
  declare id: CreationOptional<number>;
  declare templateId: number;
  declare questionKey: string;
  declare questionType: string;
  declare options: CreationOptional<Record<string, unknown> | null>;
  declare scoringWeight: CreationOptional<string | null>;
  declare displayOrder: CreationOptional<number>;
  declare isRequired: CreationOptional<boolean>;
}

export const initAssessmentQuestionModel = (sequelize: Sequelize): typeof AssessmentQuestion => {
  AssessmentQuestion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'template_id'
      },
      questionKey: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'question_key'
      },
      questionType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'question_type'
      },
      options: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      scoringWeight: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: 'scoring_weight'
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'display_order'
      },
      isRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_required'
      }
    },
    {
      sequelize,
      modelName: 'AssessmentQuestion',
      tableName: 'assessment_questions',
      timestamps: false
    }
  );

  return AssessmentQuestion;
};
