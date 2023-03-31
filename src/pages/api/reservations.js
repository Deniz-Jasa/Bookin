const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Initialize PostgreSQL client
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'Aj2654816',
  database: 'postgres',
  port: 5432,
});
client.connect();

// Define the API endpoint for creating reservations
app.post('/api/reservations', async (req, res) => {
  const { fullName, address, sin, creditCard, roomNumber, reservationRange } = req.body;

  try {
    // Insert the reservation data into the bookingrentinghistory table
    const result = await client.query(
      'INSERT INTO bookingrentinghistory (full_name, address, sin, credit_card, room_number, reservation_range) VALUES ($1, $2, $3, $4, $5, $6)',
      [fullName, address, sin, creditCard, roomNumber, JSON.stringify(reservationRange)]
    );
    console.log(result);
    res.status(201).send({ message: 'Reservation created' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to create reservation' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});