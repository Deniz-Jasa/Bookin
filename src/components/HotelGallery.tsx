import { Container, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import HotelCard from "../components/HotelCard";
import Filter from "../components/Filter";
import { useRouter } from 'next/router';

export default function HotelGallery() {
  const [hotels, setHotels] = useState([]);

  const outerStyle = {
    marginTop: "40px",
  };

  const router = typeof window !== 'undefined' ? useRouter() : null;

  const handleClick = (hotelName: string) => {
    router?.push({
      pathname: '/HotelDetails',
      query: { hotelName }
    });
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // Hotels api to fetch data from postgres:
        const res = await fetch('/api/allHotels');
        const data = await res.json();
        console.log(data);
        setHotels(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHotels();
  }, []);

  return (
    <Container
      maxWidth="lg"
      style={outerStyle}
      sx={{ padding: 0 }}
    >
      <Grid container spacing={0} marginBottom="80px" sx={{ width: '100%' }}>
        {hotels.map((hotel: any) => (
          <Grid item key={hotel.hotelname} xs={12} sm={6} md={4}>
            <HotelCard onClick={() => handleClick(hotel.hotelname)} hotelName={hotel.hotelname} {...hotel} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}