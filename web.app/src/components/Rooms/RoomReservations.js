import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import hotelAxios from "../../apis/HotelAxios";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";


export const RoomReservations = () => {
    const routeParams = useParams()
    const [reservations, setReservations] = useState([]);

    const roomId = routeParams.id
    const navigate = useNavigate()

    const fetchReservations = () => {
        hotelAxios.get(`/reservations/${roomId}`)
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                console.error("Error fetching reservations:", error);
            });
    };
    

    useEffect(() => {
        fetchReservations();
    }, []);

    function date(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}.`;
    }

    const goBack = () => {
        navigate("/rooms");
    };

    return (
        <div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
            <div className="contentImageReservationRooms">
                <h2 style={{ color: 'green' }}><strong>Reservation for room </strong></h2>
                {reservations.length > 0 ? (
                    <Row className="g-4">
                        {reservations.map(reservation => (
                            <Col md={4} key={reservation.id}>
                                <Card className="reservation-card">
                                    <Card.Body>
                                        <Card.Title>Room № {reservation.roomNumber}</Card.Title>
                                        <Card.Text>
                                            <strong>Start Date:</strong> {date(reservation.startDate)}
                                            <br />
                                            <strong>End Date:</strong> {date(reservation.endDate)}
                                            <br />
                                            <strong>Total Price:</strong> {reservation.totalPrice} €
                                            <br />
                                            <strong>User:</strong> {reservation.username}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>No reservations found.</p>
                )}
                <br />
                <Button className="btn btn-primary me-1" style={{ position: "fixed", bottom: 20, left: 50 }} onClick={() => goBack()}>
                    <FontAwesomeIcon icon={faBackward} /> Back
                </Button>
            </div>
        </div>
    )
}