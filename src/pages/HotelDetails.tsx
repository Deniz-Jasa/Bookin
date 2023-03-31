import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavbarFull';
import { useRouter } from 'next/router';
import { Props } from 'next/script';
import { Container, Button, Grid } from '@mui/material';
import Reserve from '../components/Reserve'

const HotelDetails: React.FC<Props> = () => {

    const router = useRouter();
    const [hotelDt, setHotelsDetails] = useState([]);
    const hotelName = router.query.hotelName as string;

    const handleBackButtonClick = () => {
        router.push("/");
    };

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                let url = `/api/details?hotelName=${hotelName}`;

                // Hotels api to fetch data from postgres:
                const res = await fetch(url);
                const data = await res.json();
                console.log(data);
                setHotelsDetails(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchHotelDetails();
    }, []);

    const buttonStyle = {
        marginBottom: "30px",
        backgroundColor: "#3C44CE",
        color: "#white",
        fontWeight: "500",
        boxShadow: "none",
    }

    const pStyle = {
        marginTop: "40px",
        marginBottom: "40px",
    }

    return (
        <div className="hotel-details">
            <Navbar />
            <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
                <Button variant="contained" onClick={handleBackButtonClick} style={buttonStyle}>Previous Page</Button>
                <h2>{hotelName}</h2>

                <h3 style={pStyle}>Available Room Options:</h3>

                <Grid container spacing={8}>
                    {hotelDt.map(room => (
                        <Grid item xs={12} sm={6} md={4} key={room.number}>
                            <div>
                                <p>Room number: {room.number}</p>
                                <p>Price: {room.price}</p>
                                <p>Beds: {room.capacity}</p>
                                <p>Amenities: {room.amenities}</p>
                                <p>View: {room.viewortype}</p>
                            </div>
                        </Grid>
                    ))}
                </Grid>

                <Reserve />

            </Container>
        </div>
    );
};

export default HotelDetails;