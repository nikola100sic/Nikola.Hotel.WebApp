import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Row, Col } from 'react-bootstrap';
import hotelAxios from "../../apis/HotelAxios";
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const MyReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const extractInfoFromToken = () => {
        const token = localStorage.getItem("jwt");
        if (token) {
            try {
                return jwtDecode(token);
            } catch (error) {
                console.error('Unable to decode token', error);
                return {};
            }
        }
        return {};
    };

    const isLoggedIn = !!localStorage.getItem("jwt");

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const username = isLoggedIn ? extractInfoFromToken().sub : null;

        if (!username) {
            setError("User not logged in.");
            return;
        }

        try {
            const response = await hotelAxios.get(`/reservations/user/${username}`);
            setReservations(response.data);
            setError("");
        } catch (error) {
            console.error("Error fetching reservations:", error);
            setError("Error fetching reservations.");
        }
    };

    const goBack = () => {
        navigate("/reservations");
    };

    function date(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}.`;
    }

    useEffect(() => {
        document.title = "My reservation- Hotel Nicola's";
    }, []);

    const getStatusClass = (startDate, endDate) => {
        const now = new Date();
        const end = new Date(endDate);

        if (end<now) {
            return 'status-indicator past'; 
        } else if (end>now) {
            return 'status-indicator active'; 
        }
        return ''; 
    };

    return (
        <div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
            <div className="contentImageReservationRooms">
                <h2 style={{ color: 'black' }}>My Reservations</h2>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {reservations.length > 0 ? (
                    <Row className="g-4">
                        {reservations.map(reservation => (
                            <Col md={4} key={reservation.id}>
                                <Card className="reservation-card">
                                    <div className="card-img-wrapper">
                                        <Card.Img variant="top" src={`/roomImages/${reservation.roomNumber}.jpg`} alt={`Room ${reservation.roomNumber}`} />
                                        <div className={getStatusClass(reservation.startDate, reservation.endDate)}></div>
                                    </div>
                                    <Card.Body>
                                        <Card.Title>Room № {reservation.roomNumber}</Card.Title>
                                        <Card.Text>
                                            <strong>Start Date:</strong> {date(reservation.startDate)}
                                            <br />
                                            <strong>End Date:</strong> {date(reservation.endDate)}
                                            <br />
                                            <strong>Total Price:</strong> {reservation.totalPrice} €
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>No reservations found.</p>
                )}
                <Button className="btn btn-primary me-1" onClick={() => goBack()}>
                    
                    <FontAwesomeIcon icon={faBackward} /> Back
                </Button>
            </div>
        </div>
    );
};

export default MyReservationsPage;
