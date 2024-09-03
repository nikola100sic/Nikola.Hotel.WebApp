import React from 'react';
import { createRoot } from 'react-dom/client';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import Login from './components/authorization/Login';
import { logout } from './components/services/auth';
import Logo from './components/Logo';
import { Registration } from './components/authorization/Registration';
import { Rooms } from './components/Rooms/Rooms';
import { Reservation } from './components/Reservation/Reservation';
import { Info } from './components/Info/Info';
import { Contact } from './components/Contact/Contact';
import { Photo } from './components/Photo/Photo';
import { jwtDecode } from 'jwt-decode';
import MyReservationsPage from './components/Reservation/MyReservationPage';
import { RoomReservations } from './components/Rooms/RoomReservations';
import { ALaCarte } from './components/Restaurants/ALaCarte';

const getUsernameFromToken = () => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.sub; // pretpostavljamo da je korisničko ime u `sub` polju
        } catch (error) {
            console.error("Unable to decode token", error);
            return null;
        }
    }
    return null;
};

const App = function () {
    const username = getUsernameFromToken();

    if (window.localStorage["jwt"]) {
        return (
            <div>
                <Router>
                    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="sticky-top">
                        <Navbar.Brand as={Link} to="/">
                            <Logo />
                            Nicola's hotel
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"  >
                                <Nav.Link as={Link} to="rooms" style={{ color: 'white', fontFamily: 'sans-serif' }}> Rooms </Nav.Link>
                                <Nav.Link as={Link} to="reservations" style={{ color: 'white', fontFamily: 'sans-serif' }}> Reservations </Nav.Link>

                            </Nav>
                            <Nav className="ms-auto">
                                <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'revert-layer' }}>
                                <Dropdown align="end">
                                        <Dropdown.Toggle variant="dark" id="dropdown" style={{ fontFamily: 'sans-serif' }}>
                                            Restaurants
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/alacarteRestaurant">A la carte restaurant </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/pansionRestaurant">Pansion restaurant</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/nicolasRestaurant">Nicola's restaurant</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Nav.Link as={Link} to="/info" style={{ color: 'white', fontFamily: 'sans-serif' }}>Info</Nav.Link>
                                    <Nav.Link as={Link} to="/photo" style={{ color: 'white', fontFamily: 'sans-serif' }}>Gallery</Nav.Link>
                                    <Nav.Link as={Link} to="/contact" style={{ color: 'white', fontFamily: 'sans-serif' }}>Contact</Nav.Link>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ fontFamily: 'sans-serif' }}>
                                            Hi, {username}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Container style={{ paddingTop: "10px", textAlign: "center" }}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/rooms' element={<Rooms />} />
                            <Route path='/reservations' element={<Reservation />} />
                            <Route path='/alacarteRestaurant' element={<ALaCarte />} />
                            <Route path='/info' element={<Info />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route path='/photo' element={<Photo />} />
                            <Route path="/my-reservations" element={<MyReservationsPage />} />
                            <Route path='/rooms/:id/reservations' element={<RoomReservations />} />
                        </Routes>
                    </Container>
                </Router>
            </div>
        );
    } else {
        return (
            <Router>
                <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="sticky-top">
                    <Navbar.Brand as={Link} to="/">
                        <Logo />
                        Nicola's hotel
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="rooms"> Rooms </Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <div className="d-flex align-items-center">
                            <Dropdown align="end">
                                        <Dropdown.Toggle variant="dark" id="dropdown" style={{ fontFamily: 'sans-serif' }}>
                                            Restaurants
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/alacarteRestaurant">A la carte restaurant </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/pansionRestaurant">Pansion restaurant</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/nicolasRestaurant">Nicola's restaurant</Dropdown.Item>
                                        </Dropdown.Menu>
                            </Dropdown>
                                <Nav.Link as={Link} to="/info" style={{ color: 'white' }}>Info</Nav.Link>
                                <Nav.Link as={Link} to="/photo" style={{ color: 'white' }}>Gallery</Nav.Link>
                                <Nav.Link as={Link} to="/contact" style={{ color: 'white' }}>Contact</Nav.Link>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/login"> Login </Nav.Link>
                                <Nav.Link style={{ color: "white" }} as={Link} to="/registration"> Registration </Nav.Link>

                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container style={{ paddingTop: "10px", textAlign: "center" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path='/rooms' element={<Rooms />} />
                        <Route path='/reservation' element={<Reservation />} />
                        <Route path="*" element={<Navigate replace to="/login" />} />
                        <Route path='/info' element={<Info />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/photo' element={<Photo />} />
                        <Route path='/alacarteRestaurant' element={<ALaCarte />} />
                    </Routes>
                </Container>
            </Router>
        );
    }
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App />
);
