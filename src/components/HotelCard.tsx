import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';

type HotelCardProps = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  imageurl: string;
  hotelName: string;
  city: string;
  state: string;
  ratePerNight: number;
};

const HotelCard = ({ imageurl, hotelName, city, state, ratePerNight, onClick }: HotelCardProps) => {
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
            {`$${ratePerNight} per night`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HotelCard;