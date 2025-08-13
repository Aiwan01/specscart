
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true }
    });

    await queryInterface.createTable('attributes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      data_type: { type: Sequelize.STRING(50), allowNull: false },
      unit: { type: Sequelize.STRING(50) }
    });

    await queryInterface.createTable('category_attributes', {
      category_id: { type: Sequelize.INTEGER, references: { model: 'categories', key: 'id' }, onDelete: 'CASCADE' },
      attribute_id: { type: Sequelize.INTEGER, references: { model: 'attributes', key: 'id' }, onDelete: 'CASCADE' },
      primaryKey: true
    });

    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      category_id: { type: Sequelize.INTEGER, references: { model: 'categories', key: 'id' }, onDelete: 'CASCADE' },
      name: { type: Sequelize.STRING(255), allowNull: false },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      search_vector: { type: 'TSVECTOR' }
    });

    await queryInterface.createTable('product_attributes', {
      product_id: { type: Sequelize.INTEGER, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
      attribute_id: { type: Sequelize.INTEGER, references: { model: 'attributes', key: 'id' }, onDelete: 'CASCADE' },
      value_string: { type: Sequelize.TEXT },
      value_number: { type: Sequelize.DECIMAL },
      value_boolean: { type: Sequelize.BOOLEAN },
      primaryKey: true
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('product_attributes');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('category_attributes');
    await queryInterface.dropTable('attributes');
    await queryInterface.dropTable('categories');
  }
};