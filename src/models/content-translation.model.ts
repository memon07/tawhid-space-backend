import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class ContentTranslation extends Model<
  InferAttributes<ContentTranslation>,
  InferCreationAttributes<ContentTranslation>
> {
  declare id: CreationOptional<number>;
  declare contentId: number;
  declare languageCode: string;
  declare translation: CreationOptional<string | null>;
  declare transliteration: CreationOptional<string | null>;
  declare audioFileUrl: CreationOptional<string | null>;
  declare audioDurationSeconds: CreationOptional<number | null>;
  declare translatorName: CreationOptional<string | null>;
  declare qualityStatus: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initContentTranslationModel = (sequelize: Sequelize): typeof ContentTranslation => {
  ContentTranslation.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      contentId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'content_id'
      },
      languageCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'language_code'
      },
      translation: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      transliteration: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      audioFileUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'audio_file_url'
      },
      audioDurationSeconds: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'audio_duration_seconds'
      },
      translatorName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'translator_name'
      },
      qualityStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'quality_status'
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
      modelName: 'ContentTranslation',
      tableName: 'content_translations',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return ContentTranslation;
};
