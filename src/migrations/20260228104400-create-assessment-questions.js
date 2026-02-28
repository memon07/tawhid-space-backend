'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assessment_questions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      template_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'assessment_templates', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      question_key: { type: Sequelize.STRING, allowNull: false },
      question_type: { type: Sequelize.STRING, allowNull: false },
      options: { type: Sequelize.JSONB, allowNull: true },
      scoring_weight: { type: Sequelize.DECIMAL, allowNull: true },
      display_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      is_required: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
    });

    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "assessment_questions_template_id_question_key_uk" ON "assessment_questions" ("template_id", "question_key")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('assessment_questions');
  }
};
