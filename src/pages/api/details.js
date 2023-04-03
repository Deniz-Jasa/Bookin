import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    host: "database-1.ceggncemxkaj.us-east-2.rds.amazonaws.com",
    user: "postgres",
    port: 5432,
    password: "Pswd#123",
    database: "postgres"
  });
  
  const hotelName = req.query.hotelName;

  try {
    await client.connect();
    const result = await client.query(`SELECT number, price, capacity, amenities, viewortype FROM room WHERE belongsto = '${hotelName}'`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.end();
  }
}