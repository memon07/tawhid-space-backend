'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_assessments', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true, allowNull: false },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      template_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'assessment_templates', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      completed_at: { type: Sequelize.DATE, allowNull: true },
      total_score: { type: Sequelize.DECIMAL, allowNull: true },
      interpretation: { type: Sequelize.TEXT, allowNull: true },
      responses: { type: Sequelize.JSONB, allowNull: true },
      follow_up_recommended: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "user_assessments_user_id_idx" ON "user_assessments" ("user_id")'
    );
    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "user_assessments_template_id_idx" ON "user_assessments" ("template_id")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_assessments');
  }
};
