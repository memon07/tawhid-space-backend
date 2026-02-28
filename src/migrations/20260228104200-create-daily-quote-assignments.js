'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('daily_quote_assignments', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      content_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'content_library', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      assigned_date: { type: Sequelize.DATEONLY, allowNull: false },
      emotion_match_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'emotions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      is_viewed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      viewed_at: { type: Sequelize.DATE, allowNull: true },
      is_favorited: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "daily_quote_assignments_user_id_assigned_date_idx" ON "daily_quote_assignments" ("user_id", "assigned_date")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('daily_quote_assignments');
  }
};
