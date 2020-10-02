module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Codes', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
    }),
    down: (queryInterface) => queryInterface.dropTable('Codes')
  };