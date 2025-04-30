const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.HOSTNAME_BD,
  port: 21811,
  user: process.env.USER_BD,
  password: process.env.PASSWORD_BD,
  database: process.env.DATABASE_DB,
});

const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(connection);
    });
  });
};

const dbquery = async (sql, values) => {
  let connection;
  try {
    connection = await getConnection();
    const results = await util
      .promisify(connection.query)
      .call(connection, sql, values);
    connection.release();
    return results;
  } catch (error) {
    if (connection) connection.release(); // Asegúrate de liberar la conexión en caso de error
    throw error;
  }
};

module.exports = {
  dbquery,
};
