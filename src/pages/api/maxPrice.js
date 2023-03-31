import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "postgres"
  });

  const hotelName = req.query.hotelName;
  const maxPrice = req.query.maxPrice;

  try {
    await client.connect();
    const result = await client.query(`SELECT room FROM hotel WHERE price < '${maxPrice}'`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
}