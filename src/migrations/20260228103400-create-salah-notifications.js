'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salah_notifications', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      salah_type: { type: Sequelize.STRING, allowNull: false },
      notification_offset_minutes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_enabled: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      sound_preference: { type: Sequelize.STRING, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "salah_notifications_user_id_salah_type_uk" ON "salah_notifications" ("user_id", "salah_type")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('salah_notifications');
  }
};
