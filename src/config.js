const {config} = require('dotenv');

config();

module.exports = {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbHost: process.env.DB_HOST || "",
    dbDatabase: process.env.DB_DATABASE || "",
    dbPort: process.env.DB_PORT || "",
};