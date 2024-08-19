import { useEffect, useState } from "react";
import { Button, Col, FormCheck, FormControl, FormLabel, FormSelect, Row, Card } from 'react-bootstrap';
import hotelAxios from "../../apis/HotelAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [capacities, setCapacities] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [searchParams, setSearchParams] = useState({});
    const [showSearch, setShowSearch] = useState(false);
    const [selectedCapacity, setSelectedCapacity] = useState("");
    const [sortCriteria, setSortCriteria] = useState("price-asc");

    const navigate = useNavigate();


    const getRooms = () => {
        hotelAxios.get(`/rooms?pageNo=${pageNo}`, {
            params: { ...searchParams }
        })
            .then(res => {
                setPageCount(Number(res.headers["total-pages"]));
                setRooms(res.data);
                console.log("Rooms:", res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

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
        getRooms();
    }, [pageNo]);

    useEffect(() => {
        getCapacities();
    }, []);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;

        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));

        if (name === "capacity") {
            setSelectedCapacity(value);
        }

        console.log("Updated Search Params:", { ...searchParams, [name]: value });
        setPageNo(0);
    };

    const sortRooms = (rooms) => {
        return rooms.sort((a, b) => {
            const [sortBy, sortOrder] = sortCriteria.split("-");
            if (sortBy === "price") {
                return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
            } else if (sortBy === "capacity") {
                return sortOrder === "asc" ? a.capacity - b.capacity : b.capacity - a.capacity;
            }
            return 0;
        });
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    useEffect(() => {
        document.title = "Rooms- Hotel Nicola's"; // Postavlja naslov kada se komponenta montira
    }, []);

    const extractInfoFromTokenAdmin = () => {
        const token = localStorage.getItem("jwt")
        const decoded = jwtDecode(token)
        console.log(decoded.role.authority)

        if (decoded.role.authority === "ADMIN") {
            return true
        }
        return false;
    }

    const isLoggedIn = !!localStorage.getItem("jwt");
    const isAdmin = isLoggedIn ? extractInfoFromTokenAdmin() : false;

    const roomReservations = (roomId) => {
        navigate("/rooms/" + roomId + "/reservations")
    };

    return (
        <div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
            <Col className="contentImageReservationRooms">
                <Col></Col>
                <div className="checkbox-label">
                    <FormCheck type="checkbox" checked={showSearch} onChange={() => setShowSearch(!showSearch)} />
                    <FormLabel className="form-check-label">Show/hide search</FormLabel>
                </div>
                <br />
                {showSearch && (
                    <Row className="d-flex align-items-center">
                        <Col>
                            <FormLabel>Rooms capacity:</FormLabel>
                            <FormSelect
                                style={{ width: '100%' }}
                                name="capacity"
                                value={selectedCapacity}
                                onChange={handleSearchChange}
                            >
                                <option value={""}>All</option>
                                {capacities.map((capacity, index) => (
                                    <option key={index} value={capacity}>{capacity} bed{capacity > 1 ? 's' : ''}</option>
                                ))}
                            </FormSelect>
                        </Col>
                        <Col>
                            <FormLabel>Price from</FormLabel>
                            <FormControl style={{ width: '100%' }} name="priceFrom" type="number" placeholder="enter price from" onChange={handleSearchChange} />
                        </Col>
                        <Col>
                            <FormLabel>Price to</FormLabel>
                            <FormControl style={{ width: '100%' }} name="priceTo" type="number" placeholder="enter price to" onChange={handleSearchChange} />
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button onClick={getRooms}>Search</Button>
                        </Col>
                    </Row>
                )}
                <Row className="mt-4 d-flex justify-content-end align-items-center">
                    <Col xs="auto" className="d-flex align-items-center">
                        Sort by:<FormSelect value={sortCriteria} onChange={handleSortChange} className="small-dropdown">
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="capacity-asc">Capacity: Low to High</option>
                            <option value="capacity-desc">Capacity: High to Low</option>
                        </FormSelect>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {sortRooms(rooms).map((room) => (
                        <Col key={room.id} md={4} className="mb-3">
                            <Card>
                                <Card.Img variant="bottom" src={`/roomImages/${room.number}.jpg`} alt={`Room ${room.number}`} />
                                <Card.Body>
                                    <Card.Title>Room № {room.number}</Card.Title>
                                    <Card.Text>
                                        <strong>Capacity:</strong> {room.capacity} bed{room.capacity > 1 ? 's' : ''}
                                        <br />
                                        <strong>Price per night:</strong> {room.price} €
                                    </Card.Text>
                                    {isAdmin ? <Button onClick={() => roomReservations(room.id)}> <FontAwesomeIcon icon={faFile} /> Report</Button> : ""}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {rooms.length !== 0 && (
                    <div className="page mt-4">
                        <Button style={{ marginRight: '10px' }} onClick={() => setPageNo(pageNo - 1)} disabled={pageNo === 0}> Previous</Button>
                        <Button onClick={() => setPageNo(pageNo + 1)} disabled={pageNo === pageCount - 1}>Next</Button>
                    </div>
                )}
            </Col>
        </div>
    );
};
