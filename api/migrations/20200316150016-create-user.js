module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    bankdetails: {
      type: Sequelize.STRING,
      allowNull: false
    },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('admin', 'voter'),
      allowNull: false,
      defaultValue: 'voter'
    },
    tel: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    totalearning: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    referralCount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    amountByReferral: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    availableincome: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    sponsor: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    codeReg: {
      type: Sequelize.INTEGER,
      allowNull: false
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
  down: (queryInterface) => {
    return queryInterface.sequelize.transaction(t => {
        return Promise.all([
            queryInterface.dropTable('Users'),
            queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";'),
            queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_Regstatus";'),
        ]);
    });
}
};
