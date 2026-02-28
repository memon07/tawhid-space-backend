import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from 'sequelize';

export class SalahTiming extends Model<InferAttributes<SalahTiming>, InferCreationAttributes<SalahTiming>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare timezone: CreationOptional<string | null>;
  declare latitude: CreationOptional<string | null>;
  declare longitude: CreationOptional<string | null>;
  declare calculationMethod: CreationOptional<string | null>;
  declare fajrTime: CreationOptional<string | null>;
  declare dhuhrTime: CreationOptional<string | null>;
  declare asrTime: CreationOptional<string | null>;
  declare maghribTime: CreationOptional<string | null>;
  declare ishaTime: CreationOptional<string | null>;
  declare effectiveDate: string;
  declare isCustom: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initSalahTimingModel = (sequelize: Sequelize): typeof SalahTiming => {
  SalahTiming.init(
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
      timezone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true
      },
      longitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true
      },
      calculationMethod: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'calculation_method'
      },
      fajrTime: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'fajr_time'
      },
      dhuhrTime: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'dhuhr_time'
      },
      asrTime: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'asr_time'
      },
      maghribTime: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'maghrib_time'
      },
      ishaTime: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'isha_time'
      },
      effectiveDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'effective_date'
      },
      isCustom: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_custom'
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
      modelName: 'SalahTiming',
      tableName: 'salah_timings',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return SalahTiming;
};
