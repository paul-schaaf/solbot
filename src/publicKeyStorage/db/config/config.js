module.exports = {
  development: {
    username: 'tipping-bot',
    password: 'tipping-bot-postgresql',
    database: 'tipping-bot-postgresql',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgres',
  },
};
