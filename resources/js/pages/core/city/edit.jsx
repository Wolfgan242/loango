import React, { useState } from "react";
import {Form, Alert, Spinner, Button, Container, Row, Col, Card, InputGroup} from "react-bootstrap";
import { FaChevronLeft, FaClipboardList, FaCheckCircle, FaGlobeAfrica } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Select from 'react-select'
import axios from 'axios';

const Edit = ({city, countries}) => {
  // États pour les champs du formulaire
  const defaultUser = { value: city.country_id, label: city.country.name_fr };
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setDatas] = useState({
    country_id: city.country_id,
    name: city.name,
  });

  // Validation du formulaire
  const validateForm = () => {
    let formErrors = {};
    if (!data.country_id) formErrors.country_id = "Ce champs est obligatoire.";
    if (!data.name) formErrors.name = "Ce champs est obligatoire.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChangeCountry = selected => {
    selected ? data.country_id = selected.value : "";
    // Set price input field based on selection
  };

  const options = countries.map(item => ({
    // Use 'id' as value
    label: `${item.name_fr}`, // Display name
    value: item.id,
  }));

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        setLoading(true);
        axios.put('/cities/update/'+city.id, data).then(res => {
            if (res.data == 'saved') {
                setMessage('La ville à été modifiée!');
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
                  <h3 className="fw-bold">Ajouter une ville!</h3>
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
                      <Form.Label className="fw-semibold">Choisir le pays de la ville</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaGlobeAfrica />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="country_id"
                            options={options}
                            isDisabled={true}
                            className="form-control"
                            defaultValue={defaultUser}
                            onChange={handleChangeCountry}
                            placeholder="Choisir le pays..." 
                            />
                        <Form.Control.Feedback type="invalid">
                          {errors.country_id}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  {/* Nom de l'activité */}
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Nom de la ville</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClipboardList />
                        </InputGroup.Text>
                        <div className="input-field d-flex align-items-center border col p-2">
                          <Form.Control 
                          id="name"
                          type="text"  
                          value={data.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name} 
                          placeholder="brazzaville..." />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
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