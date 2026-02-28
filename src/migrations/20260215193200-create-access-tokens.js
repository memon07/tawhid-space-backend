'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('access_tokens', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      },
      device_info: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      is_revoked: {
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
      'CREATE INDEX IF NOT EXISTS "access_tokens_user_id_idx" ON "access_tokens" ("user_id")'
    );
    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "access_tokens_is_revoked_idx" ON "access_tokens" ("is_revoked")'
    );
    await queryInterface.sequelize.query(
      'CREATE INDEX IF NOT EXISTS "access_tokens_expires_at_idx" ON "access_tokens" ("expires_at")'
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('access_tokens');
  }
};
