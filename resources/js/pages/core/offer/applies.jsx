import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Alert,
  Modal,
  Image,
} from 'react-bootstrap';
import { FaInfoCircle, FaLandmark, FaChevronLeft, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Swal from 'sweetalert2';
import axios from 'axios';

const candidatesData = [
  {
    id: 1,
    email: 'john.doe@example.com',
    cv: '/storage/uploads/cv1.pdf',
    letter: '/storage/uploads/letter1.pdf',
    diploma: '/storage/uploads/diploma1.pdf',
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    cv: '/storage/uploads/cv2.pdf',
    letter: '/storage/uploads/letter2.pdf',
    diploma: '/storage/uploads/diploma2.pdf',
  },
];

const CandidateList = ({applies}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [candidates, setCandidates] = useState(applies);
  const [modalDocUrl, setModalDocUrl] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState('');
  const [request, setRequest] = useState({
      comment: "No comment !",
    });

  function handleApprovalApply(element){
    Swal.fire({
      title: "Êtes vous sûre?",
      text: "Vous approuvé la candidature de "+element.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, approuver !",
      cancelButtonText: 'Non, annuler !',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get('/applies/approval/'+element.id).then(res => {
          if (res.status == 200) {
            setCandidates(res.data);
            setMessage(`Candidature de ${element.name} acceptée.`);
            
          }
         }).catch(err => {
           console.log(err.message);
        });
      }
    });
    //const candidate = candidates.find(c => c.id === id);
    //if (!candidate) return;
    
  };

  function handleRejectedApply(element) {
    Swal.fire({
      inputAttributes: {autocapitalize: "off"},
      title: "Dites la cause du rejet.",
      confirmButtonText: "Enregistré",
      cancelButtonText: "Annulé",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      input: "text",
      //onChange: setRequest,
      preConfirm: async (comment) => {
        request.comment = comment;
        axios.put('/applies/rejected/'+element.id, request).then(res => {
          if (res.status == 200) {
            setCandidates(res.data);
            setMessage(`Candidature de ${element.name} rejetée.`, );
          }
         }).catch(err => {
          Swal.fire('Une erreur s\'est produite! Renvoyer');
        });
      },
    });
  }

  const openModal = (title, docUrl) => {
    setModalTitle(title);
    setModalDocUrl(docUrl);
    setModalVisible(true);
  };

  const filteredCandidates = candidates.filter(c =>
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  // Icônes génériques pour les documents
  const docImages = {
    cv: '/assets/images/cv-icon.png',
    letter: '/assets/images/letter-icon.png',
    diploma: '/assets/images/diploma-icon.png',
  };

  return (
    <Container className="my-4">
       <Row>
        <Col>
          <h3 className="fw-bold">Tous les postulants !</h3>
        </Col>
        <Col className="text-end">              
          <Button variant="danger" onClick={() => window.history.back()}>
            <FaChevronLeft className="me-2" /> retour
          </Button>
        </Col>
       </Row>
       <hr />

      {message && (
        <Alert variant="info" onClose={() => setMessage(null)} dismissible>
          {message}
        </Alert>
      )}

      <InputGroup className="mb-4">
        <Form.Control
          placeholder="Rechercher par email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Row>
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map(candidate => (
            <Col key={candidate.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="fs-6 text-muted mb-3">
                      <strong>Email :</strong> {candidate.email}
                    </Card.Title>

                    <div className="d-flex justify-content-between">
                      {/* CV */}
                      <div
                        className="m-1 border rounded"
                        style={{ width: '32%', cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => openModal('CV', `https://projet-univloango.cg/storage/uploads/`+candidate.cv)}
                      >
                        <embed
                          src={`https://projet-univloango.cg/storage/uploads/`+candidate.cv}
                          type="application/pdf"
                          width="100%"
                          height="120px"
                          style={{ borderRadius: '6px' }}
                        />
                        <small>CV</small>
                      </div>

                      {/* Lettre de motivation */}
                      <div
                        className="m-1 border rounded"
                        style={{ width: '32%', cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => openModal('Lettre de motivation', `https://projet-univloango.cg/storage/uploads/`+candidate.letter)}
                      >
                        <embed
                          src={`https://projet-univloango.cg/storage/uploads/`+candidate.letter}
                          type="application/pdf"
                          width="100%"
                          height="120px"
                          style={{ borderRadius: '6px' }}
                        />
                        <small>Lettre</small>
                      </div>

                      {/* Diplôme */}
                      <div
                        className="m-1 border rounded"
                        style={{ width: '32%', cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => openModal('Diplôme', `https://projet-univloango.cg/storage/uploads/`+candidate.diploma)}
                      >
                        <embed
                          src={`https://projet-univloango.cg/storage/uploads/`+candidate.diploma}
                          type="application/pdf"
                          width="100%"
                          height="120px"
                          style={{ borderRadius: '6px' }}
                        />
                        <small>Diplôme</small>
                      </div>
                    </div>
                  </div>
                  
                  {candidate.approval == 0 ? <div>
                    <hr />
                      <div className="d-flex justify-content-between">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApprovalApply(candidate)}
                      >
                        Approuver
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRejectedApply(candidate)}
                      >
                        Rejeter
                      </Button>
                    </div>
                  </div> : <span></span>}
                  {candidate.approval == 1 ? <Alert key={candidate.id} variant={'danger'}>
                    Cette candidature à été réjétée !
                  </Alert> : <span></span>}

                  {candidate.approval == 2 ? <Alert key={candidate.id} variant={'success'}>
                    Candidature approuvé !
                  </Alert> : <span></span>}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">Aucune candidature trouvée.</p>
          </Col>
        )}
      </Row>

      {/* Modal pour afficher les documents */}
      <Modal
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed src={modalDocUrl} type="application/pdf" width="100%" height="500px" />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CandidateList;