import React from 'react';
import { Col } from 'react-bootstrap';

export const Info = () => {
    const hotelAddress = "Obrenovićeva 210, Niš";
    const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11610.708991562657!2d21.8966148!3d43.3210154!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b15da5a21b31%3A0xc2495c6481033d10!2sAmbasador%20Hotel!5e0!3m2!1ssr!2srs!4v1722855082857!5m2!1ssr!2srs";

    return (
        <div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
            <div className="text-containerInfo">
                <h1 style={{color:'black'}}>Hotel Information</h1>
                <p style={{color:'black', fontFamily:'revert-layer', fontSize:'110%'}}>
                    Hotel Nicola's is located in the heart of the city. The excellent location is not the only thing that sets this hotel apart from others. <br/>
                    Our friendly staff will ensure that every moment of your stay with us is delightful, <br/>
                    and you will be able to enjoy our spa and wellness center as well as the delicious food prepared by our chefs. <br/>
                </p>
                <h2>Hotel Address</h2>
                <p>{hotelAddress}</p>
                <h4>Location on Google Maps</h4>
                <iframe
                    src={googleMapsUrl}
                    width="300"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title='Google map location'
                ></iframe>
            </div>
        </div>
    );
};
