import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import image1 from '../../assets/images/alacarte.jpg'
import image2 from '../../assets/images/alacarte2.jpg'


export const ALaCarte = () => {
    return (
        <div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
            <div className="content-container">
                <Row>
                    {/* Tekst sa leve strane */}
                    <Col md={6}>
                        <div className="text-container">
                            <h1>A La Carte Restaurant</h1>
                            <p>
                                Enjoy a fine dining experience with a variety of gourmet dishes prepared by our top chefs.
                                Our menu includes a selection of local and international cuisine to satisfy every palate.
                            </p>
                        </div>
                        <div className='text-container'>
                            <h4>Work time</h4>
                            <p>Every day from 11am to 10pm</p>
                        </div>
                    </Col>
                    
                    <Col md={6}>
                        <div className="restaurants-photo">
                            <img src={image1} alt="Dish 1" className="restaurant-photo" />
                            <img src={image2} alt="Dish 2" className="restaurant-photo" />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
