import React, { useState } from "react";
import {Form, Alert, Spinner, Button, Container, Row, Col, Card, InputGroup} from "react-bootstrap";
import { FaInfoCircle, FaChevronLeft, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import axios from 'axios';

const Create = ({offer}) => {
  // États pour les champs du formulaire
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState({
    description: offer.description,
    reference: offer.reference,
    deadline: offer.deadline,
    comment: 'No comment',
    phone: offer.phone,
    name: offer.name,
    approval: 0,
    actives: 0,
  });

  const [errors, setErrors] = useState({});

  // Validation du formulaire
  const validateForm = () => {
    let formErrors = {};
    if (!data.reference) formErrors.reference = "Le nom de l'activité est requis.";
    if (!data.deadline) formErrors.deadline = "Veuillez remplir ce champ.";
    if (!data.phone) formErrors.phone = "Veuillez remplir ce champ.";
    if (!data.name) formErrors.name = "Veuillez remplir ce champ.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      axios.put('/offers/update/'+offer.id, data).then(res => {
          if (res.data == 'saved') {
              setMessage('L\'offre à été modifiée!');
              setVariant('success');
              setLoading(false);
              setAlert(true);

          }else{
            setVariant('warning');
            setMessage(res.data);
            setLoading(false);
            setAlert(true);

        }
          
       }).catch(err => {
          setVariant('danger');
          setLoading(false);
          setMessage(err)
          setAlert(true);

      });
    }
  };

  // Gestion du changement des valeurs des champs
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-lg border-0 p-4">
            <Card.Body>
              <Row>
                <Col>
                  <h3 className="fw-bold">Modifier {offer.name} !</h3>
                </Col>
                <Col className="text-end">
                  
                    <Button variant="danger" onClick={() => window.history.back()}>
                      <FaChevronLeft className="me-2" /> retour
                    </Button>
                  
                </Col>
              </Row>
              <hr />
              {alert ? <Alert variant={variant} onClose={() => setAlert(false)} dismissible>
                {message}</Alert> : <div></div>}
              <Form onSubmit={handleSubmit}>
                {/* Nom de l'activité */}
                
                <Row className="mb-3">
                  <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="fw-semibold">Réference de l'offre</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FaInfoCircle />
                          </InputGroup.Text>
                          <div className="input-field d-flex align-items-center border col p-2">
                            <Form.Control
                            isInvalid={!!errors.reference}
                            placeholder="DR30R0..."
                            value={data.reference}
                            onChange={handleChange}
                            id="reference"
                            type="text"/>
                          </div>
                          <Form.Control.Feedback type="invalid">
                            {errors.reference}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                  </Col>

                  {/* Nom de l'activité */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Titre de l'offre</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control
                            placeholder="Ex: récrutement de..."
                            isInvalid={!!errors.name} 
                            onChange={handleChange}
                            value={data.name}
                            type="text"
                            id="name"
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  {/* Nom de l'activité */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Télephone de contact</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control
                            isInvalid={!!errors.phone}
                            onChange={handleChange}
                            value={data.phone}
                            type="phone"
                            id="phone"
                            placeholder="00 000 00 00..." 
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  {/* Nom de l'activité */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Dâte de clôture</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control 
                          isInvalid={!!errors.deadline}
                          onChange={handleChange}
                          value={data.deadline}
                          id="deadline"
                          type="date"
                          placeholder="Choisir une date..." />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.deadline}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  
                </Row>
                
                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Description</Form.Label>
                  <div className="input-field d-flex align-items-center border col p-2">
                  <Form.Control
                    placeholder="Décrir ici..."
                    isInvalid={!!errors.description}
                    value={data.description}
                    onChange={handleChange}
                    id="description"
                    as="textarea"
                    rows={3}
                  />
                  
                  </div>
                  
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Bouton Soumettre */}
                {loading ? <div className="text-center">
                  <Spinner animation="border" />
                </div> : <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold">
                  <FaCheckCircle className="me-2" /> Enregistrer
                </Button>}
                
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
