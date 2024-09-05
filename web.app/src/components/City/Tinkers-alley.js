import { Col, Row } from "react-bootstrap"
import image from '../../assets/images/TinkersAlley2.jpg'
import image1 from '../../assets/images/TinkersAlley3.jpg'
import { useEffect } from "react";




export const TinkersAlley = ()=>{

        useEffect(() => {
          window.scrollTo(0, 0);
        }, []);

    return (
        <div className="containerImage">

        <div className="fullscreen-backgroundTinkersAlley"></div>
        <Col md={12}>
                <div className="text-container">
                    <h1>Tinkers Alley</h1>
                    <p>
                    Tinkers Alley ( also known as Coppersmith Alley) is the last preserved street of the former Niš bazaar. 
                    At the beginning of the 19th century, it was a craftsmen alley and until the last years of the 20th century, old shops and several hoses from the Ottoman period were preserved. 
                    These buildings have been renovated over time and redesigned as restaurants, bars, taverns and hotels still preserving the spirit of the old architecture.
                    </p>
                </div>
                <Row className="image-row">
                <Col xs={12} md={6}>
                        <div className="city1-photo">
                            <img src={image}
                                alt="Photo1"
                                className="city-photo" />
                        </div>
                </Col>
                <Col xs={12} md={6}>
                        <div className="city1-photo">
                            <img src={image1}
                                alt="Photo1"
                                className="city-photo" />
                        </div>
                </Col>
                </Row>
            </Col>

        </div>

    )
}