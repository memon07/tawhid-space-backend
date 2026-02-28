'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('daily_progress', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      progress_date: { type: Sequelize.DATEONLY, allowNull: false },
      sessions_completed: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      target_sessions: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      completion_percentage: { type: Sequelize.DECIMAL, allowNull: true },
      streak_day_number: { type: Sequelize.INTEGER, allowNull: true },
      color_code: { type: Sequelize.STRING, allowNull: true },
      mood_summary: { type: Sequelize.JSONB, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "daily_progress_user_id_progress_date_uk" ON "daily_progress" ("user_id", "progress_date")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('daily_progress');
  }
};
