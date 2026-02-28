'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('interventions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      module_type: { type: Sequelize.STRING, allowNull: false },
      intervention_key: { type: Sequelize.STRING, allowNull: false },
      name_key: { type: Sequelize.STRING, allowNull: false },
      content_ids: { type: Sequelize.JSONB, allowNull: true },
      duration_days: { type: Sequelize.INTEGER, allowNull: true },
      recommended_frequency: { type: Sequelize.STRING, allowNull: true },
      target_conditions: { type: Sequelize.JSONB, allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('interventions');
  }
};
