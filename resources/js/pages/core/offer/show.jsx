import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaCheckCircle, FaRegTimesCircle, FaPlus, FaInfoCircle, FaEdit, FaTrash, FaPlay, FaPause, FaEye, FaFilePdf } from "react-icons/fa";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Image } from "react-bootstrap";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";

const Show = ({offer}) => {
    const requirements = offer.requirements.split(',').map(requirement => requirement.trim());
    const benefits = offer.benefits.split(',').map(benefit => benefit.trim());
    const skills = offer.skills.split(',').map(skill => skill.trim());
   
    const normal = (text) => {
        let formattedDate = new Date(text).toLocaleString();
        return formattedDate; 
    }
    
    return (
        <Container className="py-4">
            {/* Titre et bouton d'ajout */}
            
            <Card className="shadow-lg border-0 rounded-4 p-4">
                <Row className="mb-4 align-items-center">
                    <Col>
                    <h1 className="fw-bold mb-1">{offer.name}</h1>
                    </Col>
                    <Col className="text-end">
                    
                        <Button variant="danger" onClick={() => window.history.back()}>
                        <FaChevronLeft className="me-2" /> retour
                        </Button>
                    
                    </Col>
                </Row>
                <hr />
                <Row className="g-4">
                {/* Main content */}
                <Col lg={8}>
                    <div className="d-flex align-items-center mb-4">
                    {/* <Image
                        src={job.logo}
                        alt={`${job.company} logo`}
                        width={70}
                        height={70}
                        className="me-4 rounded-3 border"
                    /> */}
                    <div>
                        
                        <h5 className="text-muted mb-1">{offer.establishment.institution.name}</h5>
                        <a href={offer.establishment.institution.website} className="text-primary text-decoration-none" target="_blank" rel="noopener noreferrer">
                        {offer.establishment.institution.website}
                        </a>
                    </div>
                    </div>

                    <div className="mb-4 d-flex flex-wrap gap-2">
                    <Badge bg="warning">🎓 {offer.condition}</Badge>
                    <Badge bg="primary">{offer.temps}</Badge>
                    <Badge bg="success" text="white"> {offer.contract}</Badge>
                    <Badge bg="secondary">{offer.experience} +</Badge>
                    </div>

                    <div className="mb-3">
                    <p className="mb-1"><strong>📍 Location:</strong> {offer.establishment.address}</p>
                    <p className="mb-1"><strong>💰 Salary:</strong> {'A définir'}</p>
                    </div>

                    <hr />

                    <section className="mb-4">
                    <h4 className="mb-3">📝 Description</h4>
                    <p className="text-muted">{offer.description}</p>
                    </section>

                    <section className="mb-4">
                        <h4 className="mb-3">✅ Exigences de l'offre</h4>
                        <ListGroup variant="flush">
                            {requirements.map((req, index) => (
                            <ListGroup.Item key={index} className="border-0 ps-0">
                                ✔️ {req}
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </section>

                    <section className="mb-4">
                        <h4 className="mb-3">🎁 Les avantages</h4>
                        <ul className="text-muted">
                            {benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="mb-4">
                        <h4 className="mb-3">💡 Compétences</h4>
                        <div className="d-flex flex-wrap gap-2">
                            {skills.map((tech, index) => (
                                <Badge bg="dark" key={index}>{tech}</Badge>
                            ))}
                        </div>
                    </section>
                </Col>

                {/* Side panel */}
                <Col lg={4}>
                    <Card className="bg-light border-0 rounded-4 p-4">
                    <h6 className="fw-bold text-uppercase text-muted mb-3">Details</h6>
                    
                    <Row>
                    <Col className="6">
                    <div className="mb-3">
                        <strong>📅 Publication:</strong>
                        <div>{normal(offer.created_at)}</div>
                    </div>
                    </Col>
                    <Col className="6">
                    <div className="mb-3">
                        <strong>📅 Clôture:</strong>
                        <div>{normal(offer.deadline)}</div>
                    </div>
                    </Col>
                    </Row>
                    <div className="mb-3">
                        <strong>🏢 Etablissement:</strong>
                        <div>{offer.establishment.name}</div>
                    </div>
                    <div className="mb-3">
                        <strong>📄 Reference:</strong>
                        <div>{offer.reference}</div>
                    </div>
                    <div className="mb-1">
                        <strong>📞 Contact:</strong>
                        <div>{offer.phone}</div>
                    </div>
                    </Card>
                </Col>
                </Row>
            </Card>
        </Container>
    );
};
export default Show;