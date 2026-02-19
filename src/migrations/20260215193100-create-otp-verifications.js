'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otp_verifications', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      otp_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      purpose: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      verified_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      attempt_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "otp_verifications_phone_purpose_is_used_idx" ON "otp_verifications" ("phone_number", "purpose", "is_used")'
    );
    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "otp_verifications_user_id_idx" ON "otp_verifications" ("user_id")'
    );
    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "otp_verifications_expires_at_idx" ON "otp_verifications" ("expires_at")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('otp_verifications');
  }
};
