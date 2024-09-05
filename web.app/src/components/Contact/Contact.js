import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Uvezite Instagram ikonu


export const Contact = () => {
    return (
        <div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
            <div className="text-containerContact">
                <h1 style={{color:'black'}}>Contact Us</h1>
                <p style={{color:'black' , fontFamily:'revert-layer', fontSize:'110%'}}>If you have any questions, you can contact us via email or phone call.</p>

                <div className="contact-info">
                    <p><FontAwesomeIcon icon={faPhone} /> Phone: +381 018 374 382</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> Email: nicolasHotel@gmail.com</p>
                    <p><FontAwesomeIcon icon={faFacebook} /> Nicolas Hotel Nis</p>
                    <p><FontAwesomeIcon icon={faInstagram} /> nicolas.hotel.official</p>
                    <p><FontAwesomeIcon icon={faTwitter} /> hotelNick</p>


                </div>
            </div>
        </div>
    );
};
