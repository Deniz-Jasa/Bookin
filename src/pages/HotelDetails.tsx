import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavbarFull';
import { useRouter } from 'next/router';
import { Props } from 'next/script';
import { Container, Button } from '@mui/material';
import Reserve from '../components/Reserve'

const HotelDetails: React.FC<Props> = () => {

    const router = useRouter();
    const hotelName = router.query.hotelName as string;

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

    const pStyle = {
        marginTop:"40px"
    }

    return (
        <div className="hotel-details">
            <Navbar />
            <Container maxWidth="lg" sx={{marginTop:"80px"}}>
                <Button variant="contained" onClick={handleBackButtonClick} style={buttonStyle}>Previous Page</Button>
                <h2>{hotelName}</h2>

                <p style={pStyle}>Room Options:</p>

                {/* <Reserve /> */}
            </Container>
        </div>
    );
};

export default HotelDetails;