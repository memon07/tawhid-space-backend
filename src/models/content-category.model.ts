import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class ContentCategory extends Model<
  InferAttributes<ContentCategory>,
  InferCreationAttributes<ContentCategory>
> {
  declare id: CreationOptional<number>;
  declare nameKey: string;
  declare parentCategoryId: CreationOptional<number | null>;
  declare displayOrder: CreationOptional<number>;
  declare iconUrl: CreationOptional<string | null>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initContentCategoryModel = (sequelize: Sequelize): typeof ContentCategory => {
  ContentCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nameKey: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name_key'
      },
      parentCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'parent_category_id'
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'display_order'
      },
      iconUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'icon_url'
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
      modelName: 'ContentCategory',
      tableName: 'content_categories',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return ContentCategory;
};
