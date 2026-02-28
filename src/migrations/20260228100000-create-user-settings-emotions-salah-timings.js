'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emotions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name_key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      icon_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      color_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.createTable('user_settings', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      setting_key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      setting_value: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.createTable('salah_timings', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 7),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(10, 7),
        allowNull: true
      },
      calculation_method: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fajr_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      dhuhr_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      asr_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      maghrib_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      isha_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      effective_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      is_custom: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.createTable('user_emotions', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      emotion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'emotions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      selected_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      context: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_current: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "user_settings_user_id_idx" ON "user_settings" ("user_id")'
    );
    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "user_settings_user_id_setting_key_uk" ON "user_settings" ("user_id", "setting_key")'
    );
    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "salah_timings_user_id_effective_date_idx" ON "salah_timings" ("user_id", "effective_date")'
    );
    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "user_emotions_user_id_idx" ON "user_emotions" ("user_id")'
    );
    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "user_emotions_emotion_id_idx" ON "user_emotions" ("emotion_id")'
    );
    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "user_emotions_user_id_current_uk" ON "user_emotions" ("user_id") WHERE is_current = true'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_emotions');
    await queryInterface.dropTable('salah_timings');
    await queryInterface.dropTable('user_settings');
    await queryInterface.dropTable('emotions');
  }
};
