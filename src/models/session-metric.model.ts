import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class SessionMetric extends Model<InferAttributes<SessionMetric>, InferCreationAttributes<SessionMetric>> {
  declare id: CreationOptional<number>;
  declare sessionId: number;
  declare metricType: string;
  declare metricValue: string;
  declare recordedAt: CreationOptional<Date>;
}

export const initSessionMetricModel = (sequelize: Sequelize): typeof SessionMetric => {
  SessionMetric.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      sessionId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'session_id'
      },
      metricType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'metric_type'
      },
      metricValue: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: 'metric_value'
      },
      recordedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'recorded_at'
      }
    },
    {
      sequelize,
      modelName: 'SessionMetric',
      tableName: 'session_metrics',
      timestamps: false
    }
  );

  return SessionMetric;
};
