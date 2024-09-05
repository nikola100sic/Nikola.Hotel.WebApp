import { Col, Row } from "react-bootstrap";
import image1 from '../../assets/images/Tinkers Alley.jpg'
import image2 from '../../assets/images/BubanjMemorialSite.jpg'
import image3 from '../../assets/images/TheFortress.jpg'

import { useEffect} from "react";
import {useNavigate } from "react-router-dom";


export const City = () => {

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const goToTinkerAlley = () => {
        navigate("/city/tinkers-alley")
    }
    const goToBubanjMemorialSite = () => {
        navigate("/city/bubanj-memorial-site")
    }
    const goToFortress = () => {
        navigate("/city/the-fortress")
    }


    return (
        <div className="containerImage">
            <div className="fullscreen-backgroundCity"></div>

            <Col md={12}>
                <div className="text-container">
                    <h1>City of Nis</h1>
                    <p>
                        Niš is one of the oldest cities in Europe and the third-largest city in Serbia, located in the southern part of the country. With a rich history that spans more than two millennia, Niš has been a key cultural, economic, and political center throughout the ages. The city is famously known as the birthplace of Constantine the Great, the Roman Emperor who legalized Christianity in the Roman Empire.

                        Niš Fortress, a well-preserved Ottoman structure, is one of the city's most prominent landmarks, attracting tourists and locals alike. The city is also home to numerous cultural events and festivals, such as the Nišville Jazz Festival, which brings together artists from all over the world. In addition to its cultural significance, Niš is an important transportation hub, connecting major European and regional routes.

                        Surrounded by picturesque mountains and rivers, Niš offers a blend of natural beauty and urban living. Its warm and welcoming atmosphere, coupled with a vibrant food scene featuring traditional Serbian cuisine, makes it a charming destination for visitors.
                    </p>
                </div>
            </Col>
            <Row className="image-row">
                <Col xs={12} md={4}>
                    <div className="city-photo" onClick={() => goToTinkerAlley()}>
                        <img src={image1}
                            alt="Photo1"
                            className="city-photo" />
                    </div>
                    <p className="image-caption">Tinkers Alley (Kazandzijsko sokace)</p>
                </Col>
                <Col xs={12} md={4}>
                    <div className="city-photo" onClick={() => goToBubanjMemorialSite()}>
                        <img src={image2}
                            alt="Photo2"
                            className="city-photo" />
                    </div>
                    <p className="image-caption">Bubanj Memorial Site</p>
                </Col>
                <Col xs={12} md={4}>
                    <div className="city-photo" onClick={() => goToFortress()}>
                        <img src={image3}
                            alt="Photo1"
                            className="city-photo" />
                    </div>
                    <p className="image-caption">The Fortress</p>
                </Col>
            </Row>
        </div>
    );
};
