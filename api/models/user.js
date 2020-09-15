module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname:DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.BIGINT,
    gender: DataTypes.STRING,
    bankdetails: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'voter'),
    referralCount: DataTypes.INTEGER,
    amountByReferral: DataTypes.INTEGER,
    sponsor: DataTypes.STRING,
    codeReg: DataTypes.STRING,
    status: DataTypes.STRING,
    totalearning: DataTypes.INTEGER,
    availableincome: DataTypes.INTEGER,
    link: DataTypes.STRING,
  }, {});
  User.associate = (/* models */) => {
    // associations can be defined here
  };

  // Prevent password from being returned
  User.prototype.toJSON = function () {
    const values = { ...this.get() };

    delete values.password;
    return values;
  };
  return User;
};
