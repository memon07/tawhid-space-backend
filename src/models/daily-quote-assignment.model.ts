import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class DailyQuoteAssignment extends Model<
  InferAttributes<DailyQuoteAssignment>,
  InferCreationAttributes<DailyQuoteAssignment>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare contentId: number;
  declare assignedDate: string;
  declare emotionMatchId: CreationOptional<number | null>;
  declare isViewed: CreationOptional<boolean>;
  declare viewedAt: CreationOptional<Date | null>;
  declare isFavorited: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
}

export const initDailyQuoteAssignmentModel = (sequelize: Sequelize): typeof DailyQuoteAssignment => {
  DailyQuoteAssignment.init(
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
      contentId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'content_id'
      },
      assignedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'assigned_date'
      },
      emotionMatchId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'emotion_match_id'
      },
      isViewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_viewed'
      },
      viewedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'viewed_at'
      },
      isFavorited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_favorited'
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
      modelName: 'DailyQuoteAssignment',
      tableName: 'daily_quote_assignments',
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at'
    }
  );

  return DailyQuoteAssignment;
};
