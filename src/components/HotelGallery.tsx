import { Container, Grid, Select, MenuItem, Slider } from "@mui/material";
import { useState, useEffect } from "react";
import HotelCard from "../components/HotelCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

export default function HotelGallery() {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [chain, setChain] = useState('');
  const [cap, setCap] = useState('');
  const [category, setCategory] = useState('');
  const [rooms, setRooms] = useState(5); // default value for number of rooms is 5
  const [price, setPrice] = useState([50, 200]);

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
        let url = '/api/allHotels';

        // Add location filter to the URL if city and state are not empty
        if (city !== '' || state !== '') {
          url = `/api/location?city=${city}&state=${state}`;
        }

        if (chain !== '') {
          url = `/api/hotelBrand?hotelBrand=${chain}`;
        }

        if (cap !== '') {
          url = `/api/capacity?capacity=${cap}`;
        }

        if (category !== '') {
          url = `/api/category?category=${category}`;
        }

        if (rooms.toString() !== '') {
          url = `/api/rooms?rooms=${rooms.toString()}`;
        }

        if (price.length !== 0) {
          url = `/api/price?minPrice=${price[0]}&maxPrice=${price[1]}`;
        }

        // Hotels api to fetch data from postgres:
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setHotels(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHotels();
  }, [city, state, chain, cap, category, rooms, price]);

  const handleCityChange = (event: any) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event: any) => {
    setState(event.target.value);
  };

  const handleChainChange = (event: any) => {
    setChain(event.target.value);
  };

  const handleCapChange = (event: any) => {
    setCap(event.target.value);
  }

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  }

  const handleRoomsChange = (event: any, newValue: number | number[]) => {
    const newRooms = Array.isArray(newValue) ? newValue[0] : newValue;
    setRooms(newRooms);
  };

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  }

  const h1Styles = {
    fontSize: "22pt",
    marginBottom: "20px",
    marginTop: "0px",
  }

  const h1StylesB = {
    fontSize: "22pt",
    marginTop: "40px",
  }

  return (
    <Container
      maxWidth="lg"
      style={outerStyle}
      sx={{ padding: 0 }}
    >
      <h1 style={h1Styles}>Filters:</h1>

      {/* Location Filter: */}
      <label htmlFor="city">City:</label>
      <input id="city" type="text" value={city} onChange={handleCityChange} />
      <label htmlFor="state">State:</label>
      <input id="state" type="text" value={state} onChange={handleStateChange} />

      {/* Chain Filter */}
      <Select
        id="chain"
        value={chain}
        onChange={handleChainChange}
        style={{ minWidth: "120px", marginLeft: "10px" }}
      >
        <MenuItem value="">All Chains</MenuItem>
        <MenuItem value="Chain1">Chain1</MenuItem>
        <MenuItem value="Chain2">Chain2</MenuItem>
        <MenuItem value="Chain3">Chain3</MenuItem>
        <MenuItem value="Chain4">Chain4</MenuItem>
        <MenuItem value="Chain5">Chain5</MenuItem>
      </Select>

      {/* Room Capacity Filter */}
      <Select
        id="capacity"
        value={cap}
        onChange={handleCapChange}
        style={{ minWidth: "120px", marginLeft: "10px" }}
      >
        <MenuItem value="">Any Capacity</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="4">4</MenuItem>
      </Select>

      {/* Catagory Filter */}
      <Select
        id="category"
        value={category}
        onChange={handleCategoryChange}
        style={{ minWidth: "120px", marginLeft: "10px" }}
      >
        <MenuItem value="">Any View</MenuItem>
        <MenuItem value="sea view">Sea Side View</MenuItem>
        <MenuItem value="mountain view">Mountain Side View</MenuItem>
        <MenuItem value="downtown view">Downtown View</MenuItem>
      </Select>

      {/* Room Range Filter: */}
      <br></br>
      <br></br>
      <label htmlFor="rooms">Number of Available Rooms:</label>
      <br></br>
      <Slider
        id="rooms"
        value={rooms}
        onChange={handleRoomsChange}
        min={1}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        sx={{ width: '30%' }}
      />


      {/* Price Filter */}
      <br></br>
      <br></br>
      <label htmlFor="rooms">Max Price Range ($USD):</label>
      <br></br>
      <Slider
        value={price}
        onChange={handlePriceChange}
        min={1}
        max={2000}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        sx={{ width: '100%' }}
      />



      <h1 style={h1StylesB}>Results:</h1>

      <Grid container spacing={0} marginBottom="80px" sx={{ width: '100%' }}>

        {Array.isArray(hotels) ? hotels.map((hotel: any) => (
          <Grid item key={hotel.hotelname} xs={12} sm={6} md={4}>
            <HotelCard onClick={() => handleClick(hotel.hotelname)} hotelName={hotel.hotelname} {...hotel} />
          </Grid>
        )) : null}

      </Grid>
    </Container>
  );
}