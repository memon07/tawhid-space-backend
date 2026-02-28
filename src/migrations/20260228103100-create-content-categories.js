'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('content_categories', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      name_key: { type: Sequelize.STRING, allowNull: false },
      parent_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'content_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      display_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      icon_url: { type: Sequelize.TEXT, allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "content_categories_parent_category_id_idx" ON "content_categories" ("parent_category_id")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('content_categories');
  }
};
