import { Client } from 'pg';

export default async function handler(req, res) {
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: 5432,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

    const { sin, roomNumber, reservationRange, fullName, address, creditCard, hotelName } = req.body;

    try {
        await client.connect();
        const result = await client.query(`INSERT INTO customerrentinghistory (customer_sin, room_number, dates, customer_fullname, customer_address, creditCard, hotelName) 
                                       VALUES ('${sin}', '${roomNumber}', '${JSON.stringify(reservationRange)}', '${fullName}', '${address}', '${creditCard}', '${hotelName}')`);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        await client.end();
    }
}