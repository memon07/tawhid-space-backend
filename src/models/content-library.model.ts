import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class ContentLibrary extends Model<InferAttributes<ContentLibrary>, InferCreationAttributes<ContentLibrary>> {
  declare id: CreationOptional<number>;
  declare contentType: string;
  declare categoryId: CreationOptional<number | null>;
  declare reference: CreationOptional<string | null>;
  declare arabicText: CreationOptional<string | null>;
  declare source: CreationOptional<string | null>;
  declare difficultyLevel: CreationOptional<string | null>;
  declare estimatedDurationSeconds: CreationOptional<number | null>;
  declare repetitionsDefault: CreationOptional<number | null>;
  declare tags: CreationOptional<Record<string, unknown> | null>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initContentLibraryModel = (sequelize: Sequelize): typeof ContentLibrary => {
  ContentLibrary.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      contentType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'content_type'
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'category_id'
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: true
      },
      arabicText: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'arabic_text'
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true
      },
      difficultyLevel: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'difficulty_level'
      },
      estimatedDurationSeconds: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'estimated_duration_seconds'
      },
      repetitionsDefault: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'repetitions_default'
      },
      tags: {
        type: DataTypes.JSONB,
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
      modelName: 'ContentLibrary',
      tableName: 'content_library',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return ContentLibrary;
};
