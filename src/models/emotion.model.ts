import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class Emotion extends Model<InferAttributes<Emotion>, InferCreationAttributes<Emotion>> {
  declare id: CreationOptional<number>;
  declare nameKey: string;
  declare iconUrl: CreationOptional<string | null>;
  declare colorCode: CreationOptional<string | null>;
  declare category: CreationOptional<string | null>;
  declare displayOrder: CreationOptional<number>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initEmotionModel = (sequelize: Sequelize): typeof Emotion => {
  Emotion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nameKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'name_key'
      },
      iconUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'icon_url'
      },
      colorCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'color_code'
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'display_order'
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
      modelName: 'Emotion',
      tableName: 'emotions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Emotion;
};
