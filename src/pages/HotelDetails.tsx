import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavbarFull';
import { useNavigate } from 'react-router-dom';
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

    // const history = useNavigate();

    // const handleBackButtonClick = () => {
    //     history(-1);
    // };

    const buttonStyle = {
        marginBottom: "30px",
        backgroundColor: "#FFE600",
        color: "#3C44CE",
        fontWeight: "500",
        boxShadow: "none",
    }

    return (
        <div className="hotel-details">
            <Navbar />
            <Container maxWidth="lg" sx={{marginTop:"80px"}}>
                <Button variant="contained" style={buttonStyle}>Return</Button>
                <h2>{hotelName}</h2>
                <p>{description}</p>
            </Container>
        </div>
    );
};

export default HotelDetails;