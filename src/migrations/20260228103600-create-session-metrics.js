'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('session_metrics', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
      session_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'activity_sessions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      metric_type: { type: Sequelize.STRING, allowNull: false },
      metric_value: { type: Sequelize.DECIMAL, allowNull: false },
      recorded_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "session_metrics_session_id_idx" ON "session_metrics" ("session_id")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('session_metrics');
  }
};
