import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class UserIntervention extends Model<
  InferAttributes<UserIntervention>,
  InferCreationAttributes<UserIntervention>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare interventionId: number;
  declare startedAt: CreationOptional<Date | null>;
  declare targetCompletionDate: CreationOptional<string | null>;
  declare completionPercentage: CreationOptional<string>;
  declare isActive: CreationOptional<boolean>;
  declare completedAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initUserInterventionModel = (sequelize: Sequelize): typeof UserIntervention => {
  UserIntervention.init(
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
      interventionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'intervention_id'
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'started_at'
      },
      targetCompletionDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'target_completion_date'
      },
      completionPercentage: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        field: 'completion_percentage'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active'
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'completed_at'
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
      modelName: 'UserIntervention',
      tableName: 'user_interventions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return UserIntervention;
};
