require('dotenv').config

const {
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  DB_NAME
} = process.env

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": 'meet_doctor',
    "host": '127.0.0.1',
    "dialect": "mysql"
  },
  "test": {
    "username": DB_NAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database":DB_NAME,
    "host": DB_HOST,
    "dialect": "mysql"
  }
}
