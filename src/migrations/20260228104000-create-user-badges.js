'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_badges', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      badge_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'badge_definitions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      achieved_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      progress_percentage: { type: Sequelize.DECIMAL, allowNull: false, defaultValue: 0 },
      is_showcased: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "user_badges_user_id_badge_id_uk" ON "user_badges" ("user_id", "badge_id")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_badges');
  }
};
