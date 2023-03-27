import HotelCard from "../components/HotelCard";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
import Filter from "../components/Filter";
import hotels from "../components/DummyData.json"; // Replace with DB shit


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

  return (
    <Container
      maxWidth="xl"
      style={outerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Filter onFiltersChange={handleFiltersChange} />

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {filteredHotels.map((hotel) => (
          <Grid item key={hotel.name} xs={12} sm={6} md={4}>
            <HotelCard hotelName={hotel.name} {...hotel} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
