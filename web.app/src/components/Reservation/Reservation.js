import { useState, useEffect } from "react";
import { Button, Card, Col, FormControl, FormLabel, FormSelect, Row, Table } from 'react-bootstrap';
import hotelAxios from "../../apis/HotelAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faR } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


export const Reservation = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [capacity, setCapacity] = useState("");
    const [capacities, setCapacities] = useState([]); // State for capacities
    const [availableRooms, setAvailableRooms] = useState([]);
    const [error, setError] = useState("");
    const [numberOfNights, setNumberOfNights] = useState("");




    const navigate = useNavigate();

    const getCapacities = () => {
        hotelAxios.get('/rooms/capacities')
            .then(res => {
                const uniqueCapacities = Array.from(new Set(res.data)).sort((a, b) => a - b);
                setCapacities(uniqueCapacities);
                console.log("Capacities:", uniqueCapacities);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCapacities();
    }, [availableRooms]);

    useEffect(() => {
        document.title = "Reservation- Hotel Nicola's"; // Postavlja naslov kada se komponenta montira
    }, []);


    const handleSearch = async () => {
        let dateNow = new Date();
        let today = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()); // Početak dana

        if (!startDate || !endDate) {
            setError("Please select both start and end dates.");
            return;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            setError("Start date cannot be after end date.");
            return;
        }

        if (start < today) {
            setError("Start date must be today or in the future.");
            return;
        }

        if (end <= today) {
            setError("End date must be in the future.");
            return;
        }

        if (start.getTime() === end.getTime()) {
            setError("Start date and end date cannot be the same.");
            return;
        }

        try {
            const response = await hotelAxios.get('/rooms/available', {
                params: { startDate, endDate, capacity }
            });
            setAvailableRooms(response.data);
            setError("");

            var timeDiff = Math.abs(start.getTime() - end.getTime());
            var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            setNumberOfNights(numberOfNights)

            console.log(startDate, endDate, capacity);
        } catch (error) {
            console.error("Error fetching available rooms:", error);
            setError("Error fetching available rooms.");
        }
    };

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
    
    const username = isLoggedIn ? extractInfoFromToken().sub : null; // `sub` is often used for the username

    console.log("Username:", username);


    const goToReservation = (roomId) => {
    const isConfirmed = window.confirm("Are you sure you want to make a reservation?");

    if (isConfirmed) {
        const dto = {
            startDate: startDate,
            endDate: endDate,
            roomId: roomId,
            username: username,
        };
        console.log(dto);

        hotelAxios.post('/reservations', dto)
            .then(res => {
                console.log(res);
                alert("Successful booking");
                navigate("/my-reservations");
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        alert("User canceled the action.");
    }
};

    const handleMyReservations = async () => {
        navigate("/my-reservations");
    }


    return (

        <div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
            <Col className="contentImageReservationRooms">
                <Col></Col>
                <Row className="d-flex align-items-left">
                    <Col>
                        <FormLabel>Start Date:</FormLabel>
                        <FormControl
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <FormLabel>End Date:</FormLabel>
                        <FormControl
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <FormLabel>Select capacity:</FormLabel>
                        <FormSelect
                            style={{ width: '100%' }}
                            name="capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        >
                            <option value={""}>All</option>
                            {capacities.map((capacity, index) => (
                                <option key={index} value={capacity}>{capacity} bed{capacity > 1 ? 's' : ''}</option>
                            ))}
                        </FormSelect>
                    </Col>
                    <Col className="d-flex align-items-end">
                        <Button onClick={handleSearch}>Find available rooms</Button>
                    </Col>

                </Row>
                <br />
                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                <Row>
                    <Col>
                        <Button onClick={handleMyReservations} variant="primary" className="my-3">
                            My Reservations
                        </Button>
                        {availableRooms.length > 0 && (
                            <Row className="g-4">
                                {availableRooms.map(room => (
                                    <Col md={4} key={room.id}>
                                        <Card className="room-card">
                                            <Card.Img variant="top" src={`/roomImages/${room.number}.jpg`} alt={`Room ${room.number}`} />
                                            <Card.Body>
                                                <Card.Title>Room № {room.number}</Card.Title>
                                                <Card.Text>
                                                    <strong>Capacity:</strong> {room.capacity} bed{room.capacity > 1 ? 's' : ""}
                                                    <br />
                                                    <strong>Price per night:</strong> {room.price} €
                                                    <br/>
                                                    <strong>Total nights:</strong> {numberOfNights} {numberOfNights> 1 ? 'nights' : "night"}
                                                    <br/>
                                                    <strong>Total price:</strong> {room.price * numberOfNights}€

                                                    <br />
                                                    <Button className="btn btn-primary me-1" onClick={() => goToReservation(room.id)}><FontAwesomeIcon icon={faR} /> Reservation</Button>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row> 
                        )}
                    </Col>
                </Row>
            </Col>
        </div>
    );
};
