import React, { useState } from "react";
import {Form, Alert, Spinner, Button, Container, Row, Col, Card, InputGroup} from "react-bootstrap";
import { FaChevronLeft, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import axios from 'axios';

const Edit = ({country}) => {
  // États pour les champs du formulaire
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [alert, setAlert] = useState(false);
  const [data, setDatas] = useState({
    name_fr: country.name_fr,
    name_en: country.name_en,
    alpha: country.alpha,
    phone: country.phone,
    alph: country.alph,
    iso: country.iso,
  });

  const [errors, setErrors] = useState({});

  // Validation du formulaire
  const validateForm = () => {
    let formErrors = {};
    if (!data.name_fr) formErrors.name_fr = "Ce champs est obligatoire.";
    if (!data.name_en) formErrors.name_en = "Ce champs est obligatoire.";
    if (!data.phone) formErrors.phone = "Ce champs est obligatoire.";
    if (!data.alpha) formErrors.alpha = "Ce champs est obligatoire.";
    if (!data.alph) formErrors.alph = "Ce champs est obligatoire.";
    if (!data.iso) formErrors.iso = "Ce champs est obligatoire.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      axios.put('/countries/update/'+country.id, data).then(res => {
          if (res.data == 'saved') {
              setMessage('Le pays à été modifiée!');
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
    setDatas({ ...data, [e.target.id]: e.target.value });
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
                            value={data.name_fr}
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
                          value={data.name_en}
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
                            value={data.alpha}
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
                          value={data.alph}
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
                            value={data.phone}
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
                          value={data.iso}
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

export default Edit;
