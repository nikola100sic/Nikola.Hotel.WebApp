
import { useState } from "react"
import { Button, Col, Modal, Row } from "react-bootstrap";
import image1 from '../../assets/images/nicolas3.jpg'
import image2 from '../../assets/images/nicolas1.jpg'

export const NicolasRestaurant = ()=>{

    const [show, setShow] = useState(false)
    const [selectedPhoto,setSelectedPhoto]= useState(null)
    
    const handleClose = () => setShow(false);
    const handleShow = (photo) => {
        setSelectedPhoto(photo);
        setShow(true);
    };
    return (
<div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
            <div className="content-container">
                <Row>
                    <Col md={6}>
                        <div className="text-container">
                            <h1>Nicola's restaurant</h1>
                            <p>
                            "Nicola's Restaurant, located at the top of our hotel, offers stunning panoramic views and is the perfect setting for special events.
                             Whether it's a lunch, celebration, or conference, our elegant venue provides a sophisticated atmosphere and exceptional service. 
                             Guests can enjoy a diverse menu of gourmet dishes, tailored to suit various occasions and preferences, making each event truly memorable."
                            </p>
                        </div>
                        <div className='text-container'>
                            <h4>Work time</h4>
                            <p>Every day from 17 pm to 12 am</p>
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