require('dotenv').config();


module.exports = {
  development: {
    database: 'voiceer_dev',
    url: process.env.DB_DEV_URL,
    dialect: 'postgres',
  },
  test: {
    database: 'voiceer_test',
    use_env_variable: process.env.DB_TEST_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    database: 'voiceer_prod',
    use_env_variables: 'DB_PROD_URL',
    dialect: 'postgres',
  },
};
