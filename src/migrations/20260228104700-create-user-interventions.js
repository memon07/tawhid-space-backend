'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_interventions', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      intervention_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'interventions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      started_at: { type: Sequelize.DATE, allowNull: true },
      target_completion_date: { type: Sequelize.DATEONLY, allowNull: true },
      completion_percentage: { type: Sequelize.DECIMAL, allowNull: false, defaultValue: 0 },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      completed_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "user_interventions_user_id_intervention_id_uk" ON "user_interventions" ("user_id", "intervention_id")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_interventions');
  }
};
