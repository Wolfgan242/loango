import React, { useState } from "react";
import {Form, Alert, Spinner, Button, Container, Row, Col, Card, InputGroup} from "react-bootstrap";
import { FaChevronLeft, FaClipboardList, FaCheckCircle, FaGlobeAfrica } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Select from 'react-select';
import axios from 'axios';

const Create = () => {
  // États pour les champs du formulaire
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setDatas] = useState({
    description: "Aucune descruption",
    niveau: "Intermediaire",
    titre: "",
    type: "",
  });

  // Validation du formulaire
  const validateForm = () => {
    let formErrors = {};
    if (!data.description) formErrors.description = "Ce champs est obligatoire.";
    if (!data.titre) formErrors.titre = "Ce champs est obligatoire.";
    if (!data.type) formErrors.type = "Ce champs est obligatoire.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChangeCriteria = selected => {
    selected ? data.type = selected.value : "";
    // Set price input field based on selection
  };

  const options = [
    
    { value: 'competence', label: 'Competence' },
    { value: 'condition', label: 'Condition' },
    { value: 'avantage', label: 'Avantage' },
    { value: 'exigence', label: 'Exigence' },
    { value: 'contrat', label: 'Contrat' },
    { value: 'temps', label: 'Temps' },
  ]

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        setLoading(true);
        axios.post('store', data).then(res => {
            if (res.data == 'saved') {
                setMessage('Critère enregistré!');
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
                  <h3 className="fw-bold">Ajouter un critère !</h3>
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
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Choisir le type de critère</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaGlobeAfrica />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="type"
                            options={options}
                            //value={selectedSocialCase}
                            className="form-control"
                            onChange={handleChangeCriteria}
                            placeholder="Choisir le pays..." 
                            />
                        <Form.Control.Feedback type="invalid">
                          {errors.type}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                    {/* Nom de l'activité */}
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Titre du critère</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control 
                          id="titre"
                          type="text"  
                          value={data.titre}
                          onChange={handleChange}
                          isInvalid={!!errors.titre} 
                          placeholder="comptence..." />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.titre}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
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