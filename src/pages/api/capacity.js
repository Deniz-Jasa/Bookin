import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aj2654816",
    database: "postgres"
  });

  const capacity = req.query.capacity;

  try {
    await client.connect();
    const result = await client.query(`SELECT DISTINCT room.capacity, hotel.hotelname, hotel.imageUrl, hotel.city, hotel.state FROM room JOIN hotel ON room.belongsto = hotel.hotelName WHERE room.capacity = '${capacity}'`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
}