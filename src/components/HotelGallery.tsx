import HotelCard from "../components/HotelCard";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
import Filter from "../components/Filter";
import hotels from "../components/DummyData.json"; // Replace with DB shit
import { useRouter } from 'next/router';

export default function HotelGallery() {
  const [isHovered, setIsHovered] = useState(false);

  const outerStyle = {
    marginTop: "40px",
  };

  const [filters, setFilters] = useState({
    minRatePerNight: 0,
    maxRatePerNight: Infinity,
  });

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.ratePerNight >= filters.minRatePerNight &&
      hotel.ratePerNight <= filters.maxRatePerNight
  );

  const router = typeof window !== 'undefined' ? useRouter() : null;

  const handleClick = (hotelName: string) => {
    router?.push({
      pathname: '/HotelDetails',
      query: { hotelName }
    });
  };

  return (
    <Container
      maxWidth="lg"
      style={outerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ padding: 0 }}
    >
      <Filter onFiltersChange={handleFiltersChange} />

      <Grid container spacing={0} marginBottom="80px" sx={{ width: '100%' }}>

        {filteredHotels.map((hotel) => (
          <Grid item key={hotel.name} xs={15} sm={6} md={4}>
            <HotelCard onClick={() => handleClick(hotel.name)} hotelName={hotel.name} {...hotel} />
          </Grid>
        ))} 

      </Grid>
    </Container>
  );
}
