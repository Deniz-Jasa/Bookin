import { Box, TextField } from "@mui/material";

interface Props {
  filters?: {
    location: string;
    hotelBrand: string;
    minRatePerNight: number,
    maxRatePerNight: number
  },
  onFiltersChange: (newFilters: Partial<{
    minRatePerNight: number,
    maxRatePerNight: number
  }>) => void
}

export default function Filters({ filters = { minRatePerNight: 0, maxRatePerNight: Infinity }, onFiltersChange }: Props) {
  const handleMinRatePerNightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinRatePerNight = parseFloat(event.target.value);
    onFiltersChange({ minRatePerNight: newMinRatePerNight });
  };

  const handleMaxRatePerNightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxRatePerNight = parseFloat(event.target.value);
    onFiltersChange({ maxRatePerNight: newMaxRatePerNight });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ location: e.target.value });
  };

  const handleHotelBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ hotelBrand: e.target.value });
  };

  return (
    <div>
      <h2 style={{marginBottom:"20px"}}>Filters</h2>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Location"
          value={filters.location}
          onChange={handleLocationChange}
          variant="outlined"
          sx={{ mr: 2 }}
        />
        <TextField
          label="Hotel Brand"
          value={filters.hotelBrand}
          onChange={handleHotelBrandChange}
          variant="outlined"
          sx={{ mr: 2 }}
        />
        <TextField
          label="Min Rate per Night"
          value={filters.minRatePerNight}
          onChange={handleMinRatePerNightChange}
          variant="outlined"
          type="number"
          inputProps={{ min: 0 }}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Max Rate per Night"
          value={filters.maxRatePerNight === Infinity ? '' : filters.maxRatePerNight}
          onChange={handleMaxRatePerNightChange}
          variant="outlined"
          type="number"
          inputProps={{ min: 0 }}
        />
      </Box>

      <h2 style={{marginTop:"40px"}}>Results</h2>
    </div>
  );
}
