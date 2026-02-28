import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class AssessmentTemplate extends Model<
  InferAttributes<AssessmentTemplate>,
  InferCreationAttributes<AssessmentTemplate>
> {
  declare id: CreationOptional<number>;
  declare moduleType: string;
  declare assessmentKey: string;
  declare nameKey: string;
  declare descriptionKey: CreationOptional<string | null>;
  declare frequency: CreationOptional<string | null>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initAssessmentTemplateModel = (sequelize: Sequelize): typeof AssessmentTemplate => {
  AssessmentTemplate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      moduleType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'module_type'
      },
      assessmentKey: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'assessment_key'
      },
      nameKey: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name_key'
      },
      descriptionKey: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'description_key'
      },
      frequency: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
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
      modelName: 'AssessmentTemplate',
      tableName: 'assessment_templates',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return AssessmentTemplate;
};
