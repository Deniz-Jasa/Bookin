import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const rooms = req.query.rooms;

  try {
    await client.connect();
    const result = await client.query(`SELECT numberofrooms, hotelName, city, state, imageUrl from hotel WHERE numberofrooms = '${rooms}'`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
}