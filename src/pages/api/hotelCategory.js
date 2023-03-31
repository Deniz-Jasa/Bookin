import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aj2654816",
    database: "postgres"
  });

  const hotelName = req.query.hotelName;
  const hotelCategory = req.query.hotelCategory;

  try {
    await client.connect();
    const result = await client.query(`SELECT hotelName, imageUrl FROM hotel WHERE hotelCategory = '${hotelCategory}'`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
}