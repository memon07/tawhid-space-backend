'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_streaks', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      streak_type: { type: Sequelize.STRING, allowNull: false },
      current_streak: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      longest_streak: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      last_activity_date: { type: Sequelize.DATEONLY, allowNull: true },
      streak_started_at: { type: Sequelize.DATEONLY, allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "user_streaks_user_id_streak_type_uk" ON "user_streaks" ("user_id", "streak_type")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_streaks');
  }
};
