import React, { useState } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { photos } from '../../assets/images';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = (photo) => {
    setSelectedPhoto(photo);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedPhoto(null);
  };

  

  return (
    <div className="gallery">
      <h2 style={{color:'white'}}>Gallery</h2>
      <Row>
        {photos.map((photo, index) => (
          <Col md={4} key={index} className="mb-3">
            <img
              src={photo}
              alt={`Gallery ${index}`}
              className="img-thumbnail"
              onClick={() => handleShow(photo)}
              style={{ cursor: 'pointer' }}
            />
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedPhoto}
            alt="Selected"
            className="img-fluid"
            style={{ maxHeight: '80vh' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PhotoGallery;
