import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavbarFull';
import { useRouter } from 'next/router';
import { Props } from 'next/script';
import hotels from "../components/DummyData.json";
import { Container, Button } from '@mui/material';

const HotelDetails: React.FC<Props> = () => {

    const router = useRouter();
    const hotelName = router.query.hotelName as string;

    // Extract hotel description (Replace with DB stuff):
    const selectedHotel = hotels.find(hotel => hotel.name === hotelName);
    const description = selectedHotel ? selectedHotel.description : '';

    const handleBackButtonClick = () => {
        router.push("/");
    };

    const buttonStyle = {
        marginBottom: "30px",
        backgroundColor: "#3C44CE",
        color: "#white",
        fontWeight: "500",
        boxShadow: "none",
    }

    return (
        <div className="hotel-details">
            <Navbar />
            <Container maxWidth="lg" sx={{marginTop:"80px"}}>
                <Button variant="contained" onClick={handleBackButtonClick} style={buttonStyle}>Previous Page</Button>
                <h2>{hotelName}</h2>
                <p>{description}</p>
            </Container>
        </div>
    );
};

export default HotelDetails;