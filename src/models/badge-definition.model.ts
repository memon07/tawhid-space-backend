import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class BadgeDefinition extends Model<
  InferAttributes<BadgeDefinition>,
  InferCreationAttributes<BadgeDefinition>
> {
  declare id: CreationOptional<number>;
  declare badgeKey: string;
  declare nameKey: string;
  declare descriptionKey: CreationOptional<string | null>;
  declare iconUrl: CreationOptional<string | null>;
  declare tier: CreationOptional<string | null>;
  declare category: CreationOptional<string | null>;
  declare criteria: CreationOptional<Record<string, unknown> | null>;
  declare pointsValue: CreationOptional<number>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initBadgeDefinitionModel = (sequelize: Sequelize): typeof BadgeDefinition => {
  BadgeDefinition.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      badgeKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'badge_key'
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
      iconUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'icon_url'
      },
      tier: {
        type: DataTypes.STRING,
        allowNull: true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      criteria: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      pointsValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'points_value'
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
      modelName: 'BadgeDefinition',
      tableName: 'badge_definitions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return BadgeDefinition;
};
