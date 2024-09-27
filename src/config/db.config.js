require('dotenv').config();

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: process.env.DIALECT,
    pool: {
        max: parseInt(process.env.POOL_MAX, 10),
        min: parseInt(process.env.POOL_MIN, 10),
        acquire: parseInt(process.env.POOL_ACQUIRE, 10),
        idle: parseInt(process.env.POOL_IDLE, 10)
    }
};