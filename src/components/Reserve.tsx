import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(4),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(2),
    },
    textField: {
      margin: theme.spacing(1),
      width: '30ch',
    },
    calendar: {
      margin: theme.spacing(2),
    },
  }),
);

const styles = {
  reactDateRange: {
    display: 'block',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    border: '1px solid #ccc',
    marginTop: '0.5rem',
  },
  definedRangesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '0.5rem',
    marginBottom: '0.5rem',
  },
  definedRangesWrapperItem: {
    padding: '0.25rem 0.5rem',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },
  definedRangesWrapperItemHover: {
    backgroundColor: '#ccc',
  },
  dateDisplayItem: {
    marginRight: '0.5rem',
    fontWeight: 'bold',
  },
};

interface ReserveFormData {
  fullName: string;
  address: string;
  sin: string;
  creditCard: string;
  roomNumber: string;
  reservationDate: Date;
}

const ReserveComponent = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    sin: "",
    creditCard: "",
    roomNumber: "",
    reservationRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  });

  const handleRangeChange = (range: any) => {
    setFormData({
      ...formData,
      reservationRange: range.selection,
    });
    console.log(formData)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log('Reservation created!');
    } else {
      console.error('Failed to create reservation.');
    }
  };

  const classes = useStyles();

  return (
    <div>

      <br></br>
      <br></br>
      <br></br>
      <h1>Reserve a room</h1>

      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <TextField
              className={classes.textField}
              label="Full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <TextField
              className={classes.textField}
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <TextField
              className={classes.textField}
              label="SIN"
              name="sin"
              value={formData.sin}
              onChange={handleChange}
              required
            />
            <TextField
              className={classes.textField}
              label="Credit card"
              name="creditCard"
              value={formData.creditCard}
              onChange={handleChange}
              required
            />
            <TextField
              className={classes.textField}
              label="Room number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />

          </Grid>

          <Grid item xs={4}>
            <div>
              <DateRange
                onChange={handleRangeChange}
                ranges={[formData.reservationRange]}
                className="react-date-range"
                sx={styles}
              />
            </div>
          </Grid>
          <br></br>

          <Grid item xs={4}>
            <Button type="submit" variant="contained" color="primary">
              Reserve
            </Button>
          </Grid>
        </Grid>
      </form>

      <br></br>
      <br></br>
    </div >
  );
};

export default ReserveComponent;
