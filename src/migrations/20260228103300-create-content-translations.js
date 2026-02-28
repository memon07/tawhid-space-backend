'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('content_translations', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
      content_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'content_library', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      language_code: { type: Sequelize.STRING, allowNull: false },
      translation: { type: Sequelize.TEXT, allowNull: true },
      transliteration: { type: Sequelize.TEXT, allowNull: true },
      audio_file_url: { type: Sequelize.TEXT, allowNull: true },
      audio_duration_seconds: { type: Sequelize.INTEGER, allowNull: true },
      translator_name: { type: Sequelize.STRING, allowNull: true },
      quality_status: { type: Sequelize.STRING, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "content_translations_content_id_language_code_uk" ON "content_translations" ("content_id", "language_code")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('content_translations');
  }
};
