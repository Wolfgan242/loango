import React, { useState } from "react";
import {Form, Alert, Spinner, Button, Container, Row, Col, Card, InputGroup} from "react-bootstrap";
import { FaChevronLeft, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import axios from 'axios';

const Create = () => {
  // États pour les champs du formulaire
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [alert, setAlert] = useState(false);
  const [country, setCountry] = useState({
    name_fr: "",
    name_en: "",
    alpha: "",
    phone: "",
    alph: "",
    iso: "",
  });

  const [errors, setErrors] = useState({});

  // Validation du formulaire
  const validateForm = () => {
    let formErrors = {};
    if (!country.name_fr) formErrors.name_fr = "Ce champs est obligatoire.";
    if (!country.name_en) formErrors.name_en = "Ce champs est obligatoire.";
    if (!country.phone) formErrors.phone = "Ce champs est obligatoire.";
    if (!country.alpha) formErrors.alpha = "Ce champs est obligatoire.";
    if (!country.alph) formErrors.alph = "Ce champs est obligatoire.";
    if (!country.iso) formErrors.iso = "Ce champs est obligatoire.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        setLoading(true);
        axios.post('store', country).then(res => {
            if (res.data == 'saved') {
                setMessage('Pays enregistré!');
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
    setCountry({ ...country, [e.target.id]: e.target.value });
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-lg border-0 p-4">
            <Card.Body>
              <Row>
                <Col>
                  <h3 className="fw-bold">Ajouter un pays!</h3>
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
                <Row className="mb-3">
                  {/* Nom de l'activité */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Nom en français</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control
                            id="name_fr" 
                            type="text" 
                            value={country.name_fr}
                            onChange={handleChange}
                            isInvalid={!!errors.name_fr} 
                            placeholder="république..." 
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.name_fr}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  {/* Nom de l'activité */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Nom en Anglais</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control 
                          id="name_en"
                          type="text"  
                          value={country.name_en}
                          onChange={handleChange}
                          isInvalid={!!errors.name_en} 
                          placeholder="republic..." />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.name_en}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  {/* Nom de l'activité */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Code Alpha 3</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control
                            id="alpha" 
                            type="text" 
                            value={country.alpha}
                            onChange={handleChange}
                            isInvalid={!!errors.alpha} 
                            placeholder="cog..." 
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.alpha}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  {/* Nom de l'activité */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Code Alpha 2</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control 
                          id="alph"
                          type="text"  
                          value={country.alph}
                          onChange={handleChange}
                          isInvalid={!!errors.alph} 
                          placeholder="cg..." />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.alph}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  {/* Nom de l'activité */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Code Phone</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control
                            id="phone" 
                            type="number" 
                            value={country.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone} 
                            placeholder="+000" 
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
                      <Form.Label className="fw-semibold">Code Iso</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control 
                          id="iso"
                          type="number"  
                          value={country.iso}
                          onChange={handleChange}
                          isInvalid={!!errors.iso} 
                          placeholder="178" />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.iso}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

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
