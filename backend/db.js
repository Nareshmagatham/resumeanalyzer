const { Pool } = require("pg");


const pool = new Pool({
  user: "postgres",          
  host: "localhost",
  database: "resume_analyzer", 
  password: "8980",       
  port: 5432,                  
});

module.exports = pool;
