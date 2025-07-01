import React, { useState } from "react";
import {Form, Alert, Spinner, Button, Container, Row, Col, Card, InputGroup} from "react-bootstrap";
import { FaInfoCircle, FaLandmark, FaChevronLeft, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Select from 'react-select';
import axios from 'axios';

const Create = ({establishments, skills, conditions, benefits, requirements, contracts, times, user}) => {
  // États pour les champs du formulaire
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState({
    description: "Aucune description",
    establishment_id: "",
    user_id: user.id,
    requirements: "",
    experience: "",
    condition: "",
    reference: "",
    deadline: "",
    contract: "",
    benefits: "",
    skills: "",
    phone: "",
    temps: "",
    name: ""
  });

  const [errors, setErrors] = useState({});

  // Validation du formulaire
  const validateForm = () => {
    let formErrors = {};
    if (!data.establishment_id) formErrors.establishment_id = "Veuillez remplir ce champ.";
    if (!data.requirements) formErrors.requirements = "Veuillez remplir ce champ.";
    if (!data.description) formErrors.description = "Veuillez remplir ce champ.";
    if (!data.experience) formErrors.experience = "Veuillez remplir ce champ.";
    if (!data.reference) formErrors.reference = "Veuillez remplir ce champ.";
    if (!data.condition) formErrors.condition = "Veuillez remplir ce champ.";
    if (!data.deadline) formErrors.deadline = "Veuillez remplir ce champ.";
    if (!data.contract) formErrors.contract = "Veuillez remplir ce champ.";
    if (!data.benefits) formErrors.benefits = "Veuillez remplir ce champ.";
    if (!data.skills) formErrors.skills = "Veuillez remplir ce champ.";
    if (!data.phone) formErrors.phone = "Veuillez remplir ce champ.";
    if (!data.temps) formErrors.temps = "Veuillez remplir ce champ.";
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
            setMessage('L\'Offre à été créée!');
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

  const establishment_option = establishments.map(item => ({
    // Use 'id' as value
    label: `${item.name}`, // Display name
    value: item.id,
  }));

  const skills_option = skills.map(item => ({
    // Use 'id' as value
    label: `${item.titre}`, // Display name
    value: item.titre,
  }));

  const condition_option = conditions.map(item => ({
    // Use 'id' as value
    label: `${item.titre}`, // Display name
    value: item.titre,
  }));

  const requirements_option = requirements.map(item => ({
    // Use 'id' as value
    label: `${item.titre}`, // Display name
    value: item.titre,
  }));

  const benefits_option = benefits.map(item => ({
    // Use 'id' as value
    label: `${item.titre}`, // Display name
    value: item.titre,
  }));

  const contracts_option = contracts.map(item => ({
    // Use 'id' as value
    label: `${item.titre}`, // Display name
    value: item.titre,
  }));

  const times_option = times.map(item => ({
    // Use 'id' as value
    label: `${item.titre}`, // Display name
    value: item.titre,
  }));

  const numbers = Array.from({ length: 12 }, (_, i) => {
    const value = (i + 1).toString();
    return { value, label: value };
  });

  const handleChangeExperience = selected => {
    selected ? data.experience = selected.value : "";
  };

  const handleChangeCondition = selected => {
    selected ? data.condition = selected.value : "";
  };

  const handleChangeEstabliss = selected => {
    selected ? data.establishment_id = selected.value : "";
  };

  const handleChangeRequirements = (selectedOptions) => {
    const valuesOnly = selectedOptions?.map(option => option.value) || [];
    data.requirements = valuesOnly.join(',');
  };

  const handleChangeBenefits = (selectedOptions) => {
    const valuesOnly = selectedOptions?.map(option => option.value) || [];
    data.benefits = valuesOnly.join(',');
  };

  const handleChangeSkiils = (selectedOptions) => {
    const valuesOnly = selectedOptions?.map(option => option.value) || [];
    data.skills = valuesOnly.join(',');
  };

  const handleChangeContract = selected => {
    selected ? data.contract = selected.value : "";
  };

  const handleChangeTemps = selected => {
    selected ? data.temps = selected.value : "";
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
                  <h3 className="fw-bold">Ajouter une offre !</h3>
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
                <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-semibold">Etablissement qui emet la candidature</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaLandmark />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="establishment_id"
                            options={establishment_option}
                            className="form-control"
                            onChange={handleChangeEstabliss}
                            placeholder="Etablissements..." 
                            />
                        <Form.Control.Feedback type="invalid">
                          {errors.establishment_id}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                </Col>

                <Row className="mb-3">
                  {/* Nom de l'activité */}
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Compétences</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaLandmark />
                        </InputGroup.Text>
                            <Select
                            isMulti
                            required 
                            id="skills"
                            options={skills_option}
                            className="form-control"
                            onChange={handleChangeSkiils}
                            placeholder="Competen..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.status}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  
                  {/* Nom de l'activité */}
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Avantages</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaLandmark />
                        </InputGroup.Text>
                            <Select
                            isMulti
                            required 
                            id="benefits"
                            options={benefits_option}
                            className="form-control"
                            onChange={handleChangeBenefits}
                            placeholder="Choisir le type..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.benefits}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  {/* Nom de l'activité */}
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Exigences</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaLandmark />
                        </InputGroup.Text>
                            <Select
                            isMulti
                            required 
                            id="requirements"
                            options={requirements_option}
                            className="form-control"
                            onChange={handleChangeRequirements}
                            placeholder="Choisir..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.requirements}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  {/* Nom de l'activité */}
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Condition</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaLandmark />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="condition"
                            options={condition_option}
                            className="form-control"
                            onChange={handleChangeCondition}
                            placeholder="Condition..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.condition}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  
                  {/* Nom de l'activité */}
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Temps de travail</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaLandmark />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="temps"
                            options={times_option}
                            className="form-control"
                            onChange={handleChangeTemps}
                            placeholder="Choisir..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.temps}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  {/* Nom de l'activité */}
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Contrat</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaLandmark />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="contract"
                            options={contracts_option}
                            className="form-control"
                            onChange={handleChangeContract}
                            placeholder="Choisir..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.contract}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  {/* Nom de l'activité */}
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Experience</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaLandmark />
                        </InputGroup.Text>
                            <Select
                            required 
                            id="experience"
                            options={numbers}
                            className="form-control"
                            onChange={handleChangeExperience}
                            placeholder="Choix..."/>
                        <Form.Control.Feedback type="invalid">
                          {errors.experience}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                

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
