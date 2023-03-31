import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { MouseEventHandler, useEffect, useState } from 'react';

type HotelCardProps = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  imageurl: string;
  hotelName: string;
  city: string;
  state: string;
};

const HotelCard = ({ imageurl, hotelName, city, state, onClick }: HotelCardProps) => {
  const [prices, setPrices] = useState([]);

  // Fetch all prices of the hotel:
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(`/api/startingPrices?hotelName=${hotelName}`);
        const data = await res.json();
        console.log(data);
        setPrices(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrices();
  }, []);

  // Get the smallest price:
  const ratePerNight = prices.reduce((min, item) => {
    const price = parseFloat(item.price.replace(/[$,]/g, ''));
    return price < min ? price : min;
  }, Infinity);

  return (
    <Box sx={{ border: '0px solid #ccc', borderRadius: '0px', p: 2, cursor: 'pointer' }} onClick={onClick}>
      <Card>
        <CardMedia component="img" image={imageurl} alt={hotelName} sx={{ width: '400px', height: '250px' }} />
        <CardContent>
          <Typography variant="h5" component="h2">
            {hotelName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {city}, {state}
          </Typography>
          <Typography variant="body2" component="p">
            {`Starting from USD $${ratePerNight} per night`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HotelCard;