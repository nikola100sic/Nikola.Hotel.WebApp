import { useState } from "react"
import { Button, Col, Modal, Row } from "react-bootstrap";
import image1 from '../../assets/images/pansion1.jpg'
import image2 from '../../assets/images/pansion2.jpg'

export const PansionRestaurant = ()=>{

    const [show, setShow] = useState(false)
    const [selectedPhoto,setSelectedPhoto]= useState(null)
    
    const handleClose = () => setShow(false);
    const handleShow = (photo) => {
        setSelectedPhoto(photo);
        setShow(true);
    };
    return (
    <div className="containerImage">
            <div className="fullscreen-backgroundPansion"></div>
            <div className="content-container">
                <Row>
                    <Col md={6}>
                        <div className="text-container">
                            <h1>Pansion restaurant</h1>
                            <p>
                            Our boarding house restaurant offers a delightful buffet experience for breakfast, lunch, and dinner.
                             Each meal features a wide variety of dishes, including fresh salads, warm pastries, and hearty main courses, 
                             all prepared with locally sourced ingredients. Guests can enjoy a diverse selection of flavors, 
                             catering to different tastes and dietary preferences, ensuring a satisfying dining experience throughout the day.
                            </p>
                            </div>
                            <div className="text-container">
                            <h4>Work time</h4>
                            <ul>
                                <li>Breakfast: 6 am - 9 am</li>
                                <li>Lunch : 13 pm - 16 pm</li>
                                <li>Dinner : 18 pm - 21 pm</li>

                            </ul>
                            <i>Welcome!</i>

                            </div>
                    </Col>
                    <Col md={6}>
                        <div className="restaurants-photo">
                            <img src={image1} 
                            alt="Photo1"
                            className="restaurant-photo" 
                            onClick={() => handleShow(image1)}/>
                            <img src={image2} 
                            alt="Photo2" 
                            className="restaurant-photo"
                            onClick={() => handleShow(image2)} />
                        </div>
                    </Col>
                </Row>

                <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={selectedPhoto}
                        alt="Selected"
                        className="img-fluid"
                        style={{ maxHeight: '75vh' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    )
}