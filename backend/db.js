/** Database connection for Microblog. */

const { Client } = require("pg");

const client = new Client(process.env.DATABASE_URL || "postgresql:///passion-proj");

client.connect();


module.exports = client;
