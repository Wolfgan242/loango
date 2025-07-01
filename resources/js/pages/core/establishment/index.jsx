import React, { useState } from "react";
import {
  Container,
  Badge,
  Form,
  Row,
  Col,
  Card,
  Button,
  Table,
  Tooltip,
  Pagination,
  Modal,
  ListGroup,
  OverlayTrigger,
} from "react-bootstrap";
import { FaChevronLeft, FaCheckCircle, FaRegTimesCircle, FaPlus, FaInfoCircle, FaEdit, FaTrash, FaPlay, FaPause, FaEye, FaFilePdf } from "react-icons/fa";
import { motion } from 'framer-motion';
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Swal from 'sweetalert2';
import axios from 'axios';

const Index = ({establishments, user}) => {
  // Exemple de données pour les cartes
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [datas, setDatas] = useState(establishments);
  const [request, setRequest] = useState({
    comment: "No comment !",
  });

  const filteredActivity = (datas || []).filter(item => 
    item.institution.city.name.toLowerCase().includes(filterText.toLowerCase()) ||
    item.institution.status.toLowerCase().includes(filterText.toLowerCase()) ||
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedActivity = [...filteredActivity].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedActivity.length / itemsPerPage);
  const paginatedActivity = sortedActivity.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  // store function of PostContoller
  function handleDelete(id, name) {
    Swal.fire({
      title: "Êtes vous sûre?",
      text: "Vous allez supprimer "+name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez !",
      cancelButtonText: 'Non, annulez',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get('establishments/destroy/'+id).then(res => {
          if (res.status == 200) {
            //console.log(res.data);
            setDatas(res.data);
          }
         }).catch(err => {
           console.log(err.message);
        });
      }
    });
    
  }

  // store function of PostContoller
  function handleRejected(id) {
    Swal.fire({
      inputAttributes: {autocapitalize: "off"},
      title: "Dites la cause du rejet.",
      confirmButtonText: "Enregistré",
      cancelButtonText: "Annulé",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      input: "text",
      onChange: setRequest,
      preConfirm: async (comment) => {
        request.comment = comment;
        axios.put('establishments/rejected/'+id, request).then(res => {
          if (res.status == 200) {
            setDatas(res.data);
          }
         }).catch(err => {
          Swal.fire('Une erreur s\'est produite! Renvoyer');
        });
      },
    });
  }

  // store function of PostContoller
  function handleActives(id) {
    axios.get('establishments/actives/'+id).then(res => {
      if (res.status == 200) {
        setDatas(res.data);
      }
     }).catch(err => {
       console.log(err.message);
    });
  }

  // store function of PostContoller
  function handleApproval(id) {
    axios.get('establishments/approval/'+id).then(res => {
      if (res.status == 200) {
        setDatas(res.data);
      }
     }).catch(err => {
       console.log(err.message);
    });
  }

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + ' ...' : text;
  };

  const normal = (text) => {
    let formattedDate = new Date(text).toLocaleString();
    return formattedDate; 
  }

  return (
    <Container fluid className="py-4">
      {/* Titre et bouton d'ajout */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold">Gestion d'Etablissements</h2>
        </Col>
        <Col className="text-end">
          <OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        Créez une ici.
                      </Tooltip>
                    }
                  > 
                    <a href="establishments/create">
                    <span className="px-2"><Button variant="primary" className="px-2">
                      <FaPlus className="me-2" /> Ajouter une establishment
                    </Button></span>
                    </a>
            </OverlayTrigger>

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

      {/* Liste des cartes */}
      <Row className="mb-4"> 
        <Col md={3} key={1}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card p-3 text-center">
                    <h5>👨‍🏫 Enseignants recrutés</h5>
                    <h3>80</h3>
                </div>
              </Card.Body>
            </Card>
        </Col>
        
        <Col md={3} key={2}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card p-3 text-center">
                    <h5>📚 Étudiants inscrits</h5>
                    <h3>3500</h3>
                </div>
              </Card.Body>
            </Card>
        </Col>

        <Col md={3} key={3}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card p-3 text-center">
                    <h5>📄 Candidatures en attente</h5>
                    <h3>45</h3>
                </div>
              </Card.Body>
            </Card>
        </Col>

        <Col md={3} key={4}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card p-3 text-center">
                    <h5>✅ Candidatures acceptées</h5>
                    <h3>120</h3>
                </div>
              </Card.Body>
            </Card>
        </Col>

      </Row>

      {/* Tableau des activités */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-dark text-white">
          <Row>
            <Col>
              Liste d'etablissements
            </Col>
            <Col className="text-end">
            <FaInfoCircle className="me-2" />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Rechercher..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </Col>
            <Col md={6}></Col>
            <Col md={3} className="text-end">
              <Form.Select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value={10}>10</option>
              </Form.Select>
            </Col>
          </Row>
          <hr />
          <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>#</th>
              <th onClick={() => handleSort("actives")} style={{ cursor: "pointer" }}>statut</th>
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Nom</th>
              <th onClick={() => handleSort("city")} style={{ cursor: "pointer" }}>Ville</th>
              <th onClick={() => handleSort("phone")} style={{ cursor: "pointer" }}>Phone</th>
              <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>Email</th>
              <th onClick={() => handleSort("type")} style={{ cursor: "pointer" }}>Type</th>
              <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>Status</th>
              <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>Institution</th>
              <th onClick={() => handleSort("created_at")} style={{ cursor: "pointer" }}>Création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedActivity.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  {item.approval == 0 && <Badge bg="warning">Validation...</Badge>}
                  {item.approval == 1 && <OverlayTrigger
                      placement='top'
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          {item.comment}
                        </Tooltip>
                      }
                      > 
                        <Badge bg="danger">Rejeté</Badge>
                  </OverlayTrigger>}
                  {item.approval == 2 && item.actives == 0 && <Badge bg="secondary">En pause</Badge>}
                  {item.approval == 2 && item.actives == 1 && <Badge bg="success">Approuvée</Badge>}
                </td>
                <td>{truncate(item.name, 25)}</td>
                <td>{item.institution.city.name}</td>
                <td>{item.phone}</td>
                <td>{truncate(item.email, 20)}</td>
                <td>{item.institution.type}</td>
                <td>{item.institution.status}</td>
                <td>{truncate(item.institution.name, 20)}</td>
                <td>{normal(item.created_at)}</td>
                <td>

                  
                    <OverlayTrigger
                        placement='bottom'
                        overlay={
                          <Tooltip id={`tooltip-bottom`}>
                            Details
                          </Tooltip>
                        }
                        > 
                        <a href={'establishments/show/'+item.id}>
                          <FaEye className="mx-2 text-secondary"/>
                        </a>
                    </OverlayTrigger>

                  <a href={'establishments/edit/'+item.id}>
                    <OverlayTrigger
                        placement='bottom'
                        overlay={
                          <Tooltip id={`tooltip-bottom`}>
                            Modifier
                          </Tooltip>
                        }
                        > 
                          <FaEdit className="mx-2 text-secondary"/>
                    </OverlayTrigger>
                  </a>

                  {item.approval < 1 ? <OverlayTrigger
                      placement='bottom'
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          Approuver
                        </Tooltip>
                      }
                      > 
                        <a type="button" className="mx-2" onClick={() => handleApproval(item.id)}><FaCheckCircle className="text-success"/></a>
                  </OverlayTrigger> : <span></span>}

                  {item.approval < 1 ? <OverlayTrigger
                      placement='bottom'
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          Rejeter
                        </Tooltip>
                      }
                      > 
                        <a type="button" className="mx-2" onClick={() => handleRejected(item.id)}><FaRegTimesCircle className="text-danger"/></a>
                  </OverlayTrigger> : <span></span>}
                
                  {item.approval >= 2 ?(user.role_id >= 3 ? <a type="button" onClick={() => handleActives(item.id)}>{item.actives == 0 ? <OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        Activer
                      </Tooltip>
                    }
                    > 
                      <FaPlay className="mx-2 text-success"/>
                    </OverlayTrigger> : <OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        Suspendre
                      </Tooltip>
                    }
                    > 
                      <FaPause className="mx-2 text-warning"/>
                    </OverlayTrigger>}</a> : <span></span>) : <span></span>
                  }
                  
                  {user.role_id >= 4 ? <a type="button" onClick={() => handleDelete(item.id, item.name)}><OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        Supprimer
                      </Tooltip>
                    }
                    > 
                      <FaTrash className="mx-2 text-danger"/>
                    </OverlayTrigger></a> : <span></span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
          </Table>
          {/* Pagination */}
          <Pagination className="justify-content-center">
            <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
          </Pagination>
        </Card.Body>
      </Card>
      </motion.div>
      

      {/* Modal des détails */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Détails de l'Activité</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity && (
            <>
              <h5 className="mb-3">{selectedActivity.title}</h5>
              <ListGroup>
                {modalDetails.map((item, index) => (
                  <ListGroup.Item key={index}>{item}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Index;