import React, { useState } from "react";
import {Form, Alert, Spinner, Button, Container, Row, Col, Card, InputGroup} from "react-bootstrap";
import { FaChevronLeft, FaClipboardList, FaCheckCircle, FaGlobeAfrica } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Select from 'react-select'
import axios from 'axios';

const Create = ({cities, user}) => {
  // États pour les champs du formulaire
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setDatas] = useState({
    city_id: "",
    adresse: "",
    phone: "",
    email: "",
    name: "",
  });

  // Validation du formulaire
  const validateForm = () => {
    let formErrors = {};
    if (!data.city_id) formErrors.city_id = "Veuillez remplir ce champ.";
    if (!data.adresse) formErrors.adresse = "Veuillez remplir ce champ.";
    if (!data.phone) formErrors.phone = "Veuillez remplir ce champ.";
    if (!data.email) formErrors.email = "Veuillez remplir ce champ.";
    if (!data.name) formErrors.name = "Veuillez remplir ce champ.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      axios.post('store', data).then(res => {
          if (res.data == 'saved') {
              setMessage('Utilisateur créée!');
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

  const handleChangeCity = selected => {
    selected ? data.city_id = selected.value : "";
    // Set price input field based on selection
  };

  const options = cities.map(item => ({
    label: `${item.name}`, // Display name
    value: item.id,
  }));

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
                  <h3 className="fw-bold">Ajouter un Utilisateur !</h3>
                </Col>
                <Col className="text-end">
                  
                    <Button variant="danger" onClick={() => window.history.back()}>
                      <FaChevronLeft className="me-2" /> retour
                    </Button>
                  
                </Col>
              </Row>
              <small>Attention, un email sera envoyé a l'adresse de l'utilisateur. Vuillez utilisez un mail valide !</small>
              <hr />
              {alert ? <Alert variant={variant} onClose={() => setAlert(false)} dismissible>
                {message}</Alert> : <div></div>}
              <Form onSubmit={handleSubmit}>
                <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-semibold">Choisir une ville</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaGlobeAfrica />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="city_id"
                            options={options}
                            className="form-control"
                            onChange={handleChangeCity}
                            placeholder="Choisir le statut..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.city_id}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                </Col>

                <Row className="mb-3">
                                  {/* Nom de l'activité */}
                                  <Col md={6}>
                                    <Form.Group>
                                      <Form.Label className="fw-semibold">Nom de l'utilisateur.</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control
                                            placeholder="Nom et prénom..."
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
                
                                  {/* Nom de l'activité */}
                                  <Col md={6}>
                                    <Form.Group>
                                      <Form.Label className="fw-semibold">Téléphone</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control
                                            placeholder="Ex: 0X XXX..."
                                            isInvalid={!!errors.phone} 
                                            onChange={handleChange}
                                            value={data.phone}
                                            type="tel"
                                            id="phone"
                                          />
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.phone}
                                        </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>
                                  
                </Row>

                <Row className="mb-3">
                                  {/* Nom de l'activité */}
                                  <Col md={6}>
                                    <Form.Group>
                                      <Form.Label className="fw-semibold">Adresse E-mail</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control 
                                          isInvalid={!!errors.email}
                                          onChange={handleChange}
                                          value={data.email}
                                          type="email"
                                          id="email" 
                                          placeholder="univ@..." />
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.email}
                                        </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>

                                  <Col md={6}>
                                    <Form.Group>
                                      <Form.Label className="fw-semibold">Adresse Physique</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control 
                                          isInvalid={!!errors.adresse}
                                          onChange={handleChange}
                                          value={data.adresse}
                                          type="text"
                                          id="adresse" 
                                          placeholder="adres..." />
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.adresse}
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