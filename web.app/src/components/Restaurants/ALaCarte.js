import React, { useState } from 'react';
import {Col, Row } from 'react-bootstrap';
import image1 from '../../assets/images/alacarte.jpg'
import image2 from '../../assets/images/alacarte2.jpg'
import { Modal, Button } from "react-bootstrap";





export const ALaCarte = () => {

    const [show, setShow] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

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
                            <h1>A la carte restaurant</h1>
                            <p>
                                Enjoy a fine dining experience with a variety of gourmet dishes prepared by our top chefs.
                                Our menu includes a selection of local and international cuisine to satisfy every palate.
                            </p>
                        </div>
                        <div className='text-container'>
                            <h4>Work time</h4>
                            <p>Every day from 11 am to 10 pm</p>
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
    );
};
