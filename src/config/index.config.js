/*
conexion a la base de datos
 */

 const { Pool } = require('pg');
 const dotenv = require('dotenv');
 
 dotenv.config();
 
 // ==> conexion con base de datos:
 const pool = new Pool({
   connectionString: process.env.DATABASE_CITUS_DATA_URL
 });
 
 pool.on('error', (err, client) => {
   console.log('error en la conexion', err)
   process.exit(-1);
 });
 
 pool.on('connect', () => {
   console.log('Base de datos conectada!')
 });
 
 module.exports = {
   query: (text, params) => pool.query(text, params),
 };