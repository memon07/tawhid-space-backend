'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('badge_definitions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      badge_key: { type: Sequelize.STRING, allowNull: false, unique: true },
      name_key: { type: Sequelize.STRING, allowNull: false },
      description_key: { type: Sequelize.STRING, allowNull: true },
      icon_url: { type: Sequelize.TEXT, allowNull: true },
      tier: { type: Sequelize.STRING, allowNull: true },
      category: { type: Sequelize.STRING, allowNull: true },
      criteria: { type: Sequelize.JSONB, allowNull: true },
      points_value: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('badge_definitions');
  }
};
