'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_sessions', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      session_type: { type: Sequelize.STRING, allowNull: false },
      salah_type: { type: Sequelize.STRING, allowNull: true },
      content_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: { model: 'content_library', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      started_at: { type: Sequelize.DATE, allowNull: true },
      completed_at: { type: Sequelize.DATE, allowNull: true },
      duration_seconds: { type: Sequelize.INTEGER, allowNull: true },
      repetitions_completed: { type: Sequelize.INTEGER, allowNull: true },
      quality_rating: { type: Sequelize.INTEGER, allowNull: true },
      emotion_before_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'emotions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      emotion_after_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'emotions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      location: { type: Sequelize.JSONB, allowNull: true },
      notes: { type: Sequelize.TEXT, allowNull: true },
      is_completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "activity_sessions_user_id_idx" ON "activity_sessions" ("user_id")'
    );
    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "activity_sessions_content_id_idx" ON "activity_sessions" ("content_id")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('activity_sessions');
  }
};
