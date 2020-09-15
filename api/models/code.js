module.exports = (sequelize, DataTypes) => {
    const Code = sequelize.define('Code', {
      code: DataTypes.INTEGER
    }, {});
    Code.associate = (/* models */) => {
      // associations can be defined here
    };

    return Code;
  };