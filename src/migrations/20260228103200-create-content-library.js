'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('content_library', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
      content_type: { type: Sequelize.STRING, allowNull: false },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'content_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      reference: { type: Sequelize.STRING, allowNull: true },
      arabic_text: { type: Sequelize.TEXT, allowNull: true },
      source: { type: Sequelize.STRING, allowNull: true },
      difficulty_level: { type: Sequelize.STRING, allowNull: true },
      estimated_duration_seconds: { type: Sequelize.INTEGER, allowNull: true },
      repetitions_default: { type: Sequelize.INTEGER, allowNull: true },
      tags: { type: Sequelize.JSONB, allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "content_library_category_id_idx" ON "content_library" ("category_id")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('content_library');
  }
};
