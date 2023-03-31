import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const Reserve = () => {
  const [guests, setGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);

  const handleGuestsChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
    setGuests(event.target.value);
  };

  const handleDateChange = (date: React.SetStateAction<Date>) => {
    setSelectedDate(date);
  };

  const handleReserveClick = () => {
    // logic to reserve room
  };

  const handleCalculatePrice = () => {
    // logic to calculate total price based on number of days selected
    const startDate = selectedDate;
    const endDate = new Date(startDate.getTime() + guests * 86400000);
    const days = (endDate - startDate) / 86400000;
    setTotalPrice(days * 100); // $100 per day
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="guests-label">Number of guests</InputLabel>
          <Select
            labelId="guests-label"
            id="guests"
            value={guests}
            onChange={handleGuestsChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Select dates"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleCalculatePrice}>
          Calculate price
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="total-price"
          label="Total price"
          value={totalPrice}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleReserveClick}>
          Reserve
        </Button>
      </Grid>
    </Grid>
  );
};

export default Reserve;