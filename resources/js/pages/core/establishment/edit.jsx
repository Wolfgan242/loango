import React, { useState } from "react";
import {Form, Alert, Spinner, Button, Container, Row, Col, Card, InputGroup} from "react-bootstrap";
import { FaChevronLeft, FaClipboardList, FaCheckCircle, FaGlobeAfrica } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Select from 'react-select'
import axios from 'axios';

const Create = ({establishment, institutions}) => {
  // États pour les champs du formulaire
  const defaultInstitute = { value: establishment.institution.id, label: establishment.institution.name };
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setDatas] = useState({
    institution_id: establishment.institution_id,
    description: establishment.description,
    address: establishment.address,
    user_id: establishment.user.id,
    website: establishment.website,
    phone: establishment.phone,
    email: establishment.email,
    name: establishment.name,
    approval: 0,
  });

  // Validation du formulaire
  const validateForm = () => {
    let formErrors = {};
    if (!data.description) formErrors.reference = "Veuillez remplir ce champ.";
    if (!data.website) formErrors.website = "Veuillez remplir ce champ.";
    if (!data.address) formErrors.address = "Veuillez remplir ce champ.";
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
      axios.put('/establishments/update/'+establishment.id, data).then(res => {
          if (res.data == 'saved') {
              setMessage(establishment.name+' modifié!');
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

  const handleChangeInstitution = selected => {
    selected ? data.institution_id = selected.value : "";
    // Set price input field based on selection
  };

  const options = institutions.map(item => ({
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
                  <h3 className="fw-bold">Modifié {establishment.name} !</h3>
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
                <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-semibold">Choisir une institution</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaGlobeAfrica />
                        </InputGroup.Text>
                            <Select
                            required 
                            options={options}
                            id="institution_id"
                            className="form-control"
                            defaultValue={defaultInstitute}
                            onChange={handleChangeInstitution}
                            placeholder="Choisir l'institut..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.institution_id}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                </Col>

                <Row className="mb-3">
                                  {/* Nom de l'activité */}
                                  <Col md={6}>
                                    <Form.Group>
                                      <Form.Label className="fw-semibold">Nom de l'établissement.</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control
                                            placeholder="Ex: Etablissem..."
                                            isInvalid={!!errors.name} 
                                            onChange={handleChange}
                                            value={establishment.name}
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
                                      <Form.Label className="fw-semibold">Adresse</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control 
                                          isInvalid={!!errors.address}
                                          onChange={handleChange}
                                          value={establishment.address}
                                          type="text"
                                          id="address" 
                                          placeholder="adresse..." />
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.address}
                                        </Form.Control.Feedback>
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>
                                  
                </Row>

                <Row className="mb-3">
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
                                            placeholder="Ex: université de..."
                                            isInvalid={!!errors.phone} 
                                            onChange={handleChange}
                                            value={establishment.phone}
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
                
                                  {/* Nom de l'activité */}
                                  <Col md={6}>
                                    <Form.Group>
                                      <Form.Label className="fw-semibold">E-mail</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control 
                                          isInvalid={!!errors.email}
                                          onChange={handleChange}
                                          value={establishment.email}
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
                                  
                </Row>

                <Row className="mb-3">
                                  {/* Nom de l'activité */}
                                  <Col md={6}>
                                    <Form.Group>
                                      <Form.Label className="fw-semibold">Website</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control
                                            placeholder="Ex: université de..."
                                            isInvalid={!!errors.website} 
                                            onChange={handleChange}
                                            value={establishment.website}
                                            type="text"
                                            id="website"
                                          />
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.phone}
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
                    value={establishment.description}
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