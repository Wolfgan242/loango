import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tooltip,
  ListGroup,
  OverlayTrigger,
} from "react-bootstrap";
import { FaDna, FaUser, FaTh, FaStream, FaChevronLeft, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaEdit, FaTrash, FaUniversity} from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import { motion } from 'framer-motion'; // Optionnel pour animation fluide

export default function UniversityDetails({institution}) {        
    
  return (
    <Container fluid className="py-4">

      {/* Titre de la page et bouton retour */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="fw-bold"><FaUniversity className="me-2" /> {institution.name}</h2>
          </Col>
          <Col className="text-end">
            <OverlayTrigger
                                placement='bottom'
                                overlay={
                                  <Tooltip id={`tooltip-bottom`}>
                                    Page précedente.
                                  </Tooltip>
                                }
                              > 
                                <Button variant="danger" onClick={() => window.history.back()}>
                                  <FaChevronLeft className="me-2" /> retour
                                </Button>
            </OverlayTrigger>
          </Col>
        </Row>

      {/* Informations principales de l'université */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="shadow-sm border-0 mb-4">
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{institution.name}</h5>
            <div>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-modifier">Modifier</Tooltip>}>
                <a href={`/institutions/edit/${institution.id}`} className="text-decoration-none">
                  <Button variant="light" size="sm" className="me-2">
                    <FaEdit />
                  </Button>
                </a>
              </OverlayTrigger>
            </div>
          </Card.Header>

          <Card.Body>
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  
                  <ListGroup.Item><FaDna className="me-2" /><strong>Statut Juridique :</strong> {institution.status}</ListGroup.Item>
                  <ListGroup.Item><FaUser className="me-2" /><strong>Crée par :</strong> {institution.user.name}</ListGroup.Item>
                  <ListGroup.Item><FaTh className="me-2" /><strong>Code :</strong> {institution.code}</ListGroup.Item>
                  <ListGroup.Item><FaStream className="me-2" /><strong>Type :</strong> {institution.type}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item><FaMapMarkerAlt className="me-2" />{`${institution.address}, ${institution.city.name}, ${institution.city.country.name_fr}`}</ListGroup.Item>
                  <ListGroup.Item>
                    <FaGlobe className="me-2" />
                    <a href={institution.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      {institution.website}
                    </a>
                  </ListGroup.Item>
                  <ListGroup.Item><FaEnvelope className="me-2" />{institution.email}</ListGroup.Item>
                  <ListGroup.Item><FaPhone className="me-2" />{institution.phone}</ListGroup.Item>
                  
                </ListGroup>
              </Col>
            </Row>

            {/* Description */}
            {institution.description && (
              <Row className="mt-4">
                <Col>
                  <h5>Description :</h5>
                  <p className="text-muted">{institution.description}</p>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      </motion.div>

      {/* Facultés et Départements */}
      {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-dark text-white">
            <h5 className="mb-0">Facultés et Départements</h5>
          </Card.Header>
          <Card.Body>
            {university.facultés.length > 0 ? university.facultés.map((faculté, index) => (
              <Card key={index} className="mb-3 border-0">
                <Card.Header className="bg-light fw-bold">
                  {faculté.nom}
                </Card.Header>
                <Card.Body>
                  {faculté.departements.length > 0 ? (
                    <ListGroup variant="flush">
                      {faculté.departements.map((dept, idx) => (
                        <ListGroup.Item key={idx}>{dept.nom}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted">Aucun département enregistré.</p>
                  )}
                </Card.Body>
              </Card>
            )) : (
              <p className="text-muted">Aucune faculté disponible pour cette université.</p>
            )}
          </Card.Body>
        </Card>
      </motion.div> */}

    </Container>
  );
}