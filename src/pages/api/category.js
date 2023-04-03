import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const category = req.query.category;

  try {
    await client.connect();
    const result = await client.query(`SELECT DISTINCT room.viewortype, hotel.hotelname, hotel.imageUrl, hotel.city, hotel.state FROM room JOIN hotel ON room.belongsto = hotel.hotelName WHERE room.viewortype = '${category}'`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
}