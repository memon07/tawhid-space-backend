import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class Intervention extends Model<InferAttributes<Intervention>, InferCreationAttributes<Intervention>> {
  declare id: CreationOptional<number>;
  declare moduleType: string;
  declare interventionKey: string;
  declare nameKey: string;
  declare contentIds: CreationOptional<Record<string, unknown> | null>;
  declare durationDays: CreationOptional<number | null>;
  declare recommendedFrequency: CreationOptional<string | null>;
  declare targetConditions: CreationOptional<Record<string, unknown> | null>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initInterventionModel = (sequelize: Sequelize): typeof Intervention => {
  Intervention.init(
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
      interventionKey: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'intervention_key'
      },
      nameKey: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name_key'
      },
      contentIds: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: 'content_ids'
      },
      durationDays: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'duration_days'
      },
      recommendedFrequency: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'recommended_frequency'
      },
      targetConditions: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: 'target_conditions'
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
      modelName: 'Intervention',
      tableName: 'interventions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Intervention;
};
