import React, { useState } from "react";
import {Form, Alert, Spinner, Button, Container, Row, Col, Card, InputGroup} from "react-bootstrap";
import { FaInfoCircle, FaChevronLeft, FaClipboardList, FaCheckCircle, FaGlobeAfrica } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Select from 'react-select'
import axios from 'axios';

const Edit = ({institution, cities}) => {
  // États pour les champs du formulaire
  
  const defaultCity = { value: institution.city.id, label: institution.city.name };
  const defaultStatus = { value: institution.status, label: institution.status };
  const defaultType = { value: institution.type, label: institution.type };
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setDatas] = useState({
    website: institution.website,
    description: institution.description,
    user_id: institution.user.id,
    city_id: institution.city_id,
    address: institution.address,
    status: institution.status,
    phone: institution.phone,
    email: institution.email,
    name: institution.name,
    code: institution.code,
    type: institution.type,
    approval: 0,
  });

  // Validation du formulaire
  const validateForm = () => {
    let formErrors = {};
    if (!data.description) formErrors.reference = "Veuillez remplir ce champ.";
    if (!data.website) formErrors.website = "Veuillez remplir ce champ.";
    if (!data.city_id) formErrors.city_id = "Veuillez remplir ce champ.";
    if (!data.address) formErrors.address = "Veuillez remplir ce champ.";
    if (!data.status) formErrors.status = "Veuillez remplir ce champ.";
    if (!data.phone) formErrors.phone = "Veuillez remplir ce champ.";
    if (!data.email) formErrors.email = "Veuillez remplir ce champ.";
    if (!data.name) formErrors.name = "Veuillez remplir ce champ.";
    if (!data.type) formErrors.type = "Veuillez remplir ce champ.";
    if (!data.code) formErrors.code = "Veuillez remplir ce champ.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      axios.put('/institutions/update/'+institution.id, data).then(res => {
          if (res.data == 'saved') {
              setMessage(institution.name+' modifié!');
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

  const handleChangeStatus = selected => {
    selected ? data.status = selected.value : "";
    // Set price input field based on selection
  };

  const handleChangeCity = selected => {
    selected ? data.city_id = selected.value : "";
    // Set price input field based on selection
  };

  const handleChangeType = selected => {
    selected ? data.type = selected.value : "";
    // Set price input field based on selection
  };

  const options = cities.map(item => ({
    label: `${item.name}`, // Display name
    value: item.id,
  }));

  const status = [
    { value: 'Ecole Communautaire', label: 'Ecole Communautaire' },
    { value: 'Université privée', label: 'Université privée' },
    { value: 'Université d’État', label: 'Université d’État' },
    
  ];

  const types = [
    { value: 'Fondation', label: 'Fondation' },
    { value: 'Publique', label: 'Publique' },
    { value: 'Privée', label: 'Privée' },
    
  ];

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
                  <h3 className="fw-bold">Modifier {institution.name} !</h3>
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
                      <Form.Label className="fw-semibold">Choisir une ville</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaGlobeAfrica />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="city_id"
                            options={options}
                            isDisabled={true}
                            className="form-control"
                            defaultValue={defaultCity}
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
                      <Form.Label className="fw-semibold">Choisir un statut</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaGlobeAfrica />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="status"
                            options={status}
                            className="form-control"
                            defaultValue={defaultStatus}
                            onChange={handleChangeStatus}
                            placeholder="statut..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.status}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  
                  {/* Nom de l'activité */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Choisir un type</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaGlobeAfrica />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="city_id"
                            options={types}
                            className="form-control"
                            defaultValue={defaultType}
                            onChange={handleChangeType}
                            placeholder="Choisir le type..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.city_id}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                                  {/* Nom de l'activité */}
                                  <Col md={6}>
                                    <Form.Group>
                                      <Form.Label className="fw-semibold">Nom de l'institut.</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control
                                            placeholder="Ex: université de..."
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
                                      <Form.Label className="fw-semibold">Adresse</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control 
                                          isInvalid={!!errors.address}
                                          onChange={handleChange}
                                          value={data.address}
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
                                            value={data.website}
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
                
                                  {/* Nom de l'activité */}
                                  <Col md={6}>
                                    <Form.Group>
                                      <Form.Label className="fw-semibold">Code</Form.Label>
                                      <InputGroup>
                                        <InputGroup.Text>
                                          <FaClipboardList />
                                        </InputGroup.Text>
                                        <div className="input-field d-flex align-items-center border col p-2">
                                          <Form.Control 
                                          isInvalid={!!errors.code}
                                          onChange={handleChange}
                                          value={data.code}
                                          type="text"
                                          id="code" 
                                          placeholder="ndh..." />
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.code}
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

export default Edit;