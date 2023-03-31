import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aj2654816",
    database: "postgres"
  });

  const city = req.query.city;
  const state = req.query.state;

  try {
    await client.connect();
    const result = await client.query(`SELECT hotelName, imageUrl, city, state FROM hotel WHERE city = '${city}' OR state = '${state}'`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
}
