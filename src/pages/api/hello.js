const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CSI2132Project',
  password: '1234',
  port: 5432,
});

app.get('/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM mytable');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
