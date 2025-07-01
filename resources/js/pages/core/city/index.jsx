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
import { FaChevronLeft, FaPlus, FaInfoCircle, FaEdit, FaTrash, FaPlay, FaPause } from "react-icons/fa";
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Swal from 'sweetalert2';
import axios from 'axios';

const Index = ({cities, user}) => {
  // Exemple de données pour les cartes
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [datas, setDatas] = useState(cities);

  const filteredTypes = (datas || []).filter(item => 
    //item.amount.toLowerCase().includes(filterText.toLowerCase()) ||
    item.country.name_fr.toLowerCase().includes(filterText.toLowerCase()) ||
    item.country.name_en.toLowerCase().includes(filterText.toLowerCase()) ||
    item.country.phone.toLowerCase().includes(filterText.toLowerCase()) ||
    item.country.alpha.toLowerCase().includes(filterText.toLowerCase()) ||
    item.country.alph.toLowerCase().includes(filterText.toLowerCase()) ||
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedTypes = [...filteredTypes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTypes.length / itemsPerPage);
  const paginatedTypes = sortedTypes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  // store function of PostContoller
  function handleDeleteCity(id, name) {
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
        axios.get('cities/destroy/'+id).then(res => {
          if (res.status == 200) {
            setDatas(res.data);
            console.log(res.data);
          }
         }).catch(err => {
           console.log(err.message);
        });
      }
    });
    
  }

  // store function of PostContoller
  function handleActivesCity(id) {
    axios.get('cities/actives/'+id).then(res => {
      if (res.status == 200) {
        setDatas(res.data);
      }
     }).catch(err => {
       console.log(err.message);
    });
  }

  return (
    <Container fluid className="py-4">
      {/* Titre et bouton d'ajout */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold">Gestion des villes</h2>
        </Col>
        <Col className="text-end">
            <a href="cities/create" className="px-2">
              <Button variant="primary">
                <FaPlus className="me-2" /> Ajouter une ville
              </Button>
            </a>
          
            <Button variant="danger" onClick={() => window.history.back()}>
              <FaChevronLeft className="me-2" /> retour
            </Button>
          
        </Col>
      </Row>

      {/* Tableau des activités */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-dark text-white">
          <Row>
            <Col>
            Les villes enregistrées
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
          <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>#</th>
              <th onClick={() => handleSort("actives")} style={{ cursor: "pointer" }}>Statut</th>
              <th onClick={() => handleSort("phone")} style={{ cursor: "pointer" }}>Code Pays</th>
              <th onClick={() => handleSort("name_fr")} style={{ cursor: "pointer" }}>Pays en Français</th>
              <th onClick={() => handleSort("name_en")} style={{ cursor: "pointer" }}>Pays en Anglais</th>
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Nom de la ville</th>
              <th onClick={() => handleSort("created_at")} style={{ cursor: "pointer" }}>Création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTypes.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td><Badge bg={item.actives == 1 ? "success":"warning"}>
                  {item.actives == 1 ? "Actif" : "Inactif"}</Badge></td>
                <td>{item.country.phone}</td>
                <td>{item.country.name_fr}</td>
                <td>{item.country.name_en}</td>
                <td>{item.name}</td>
                <td>{item.created_at}</td>
                <td>
                                    {<a type="button" onClick={() => handleActivesCity(item.id)}>{item.actives == 0 ? <OverlayTrigger
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
                                      </OverlayTrigger>}</a>
                                    }
                                  <a href={'cities/edit/'+item.id}>
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
                                  
                                  {user.role_id >= 4 ? <a type="button" onClick={() => handleDeleteCity(item.id, item.name)}><OverlayTrigger
                                    placement='bottom'
                                    overlay={
                                      <Tooltip id={`tooltip-bottom`}>
                                        Supprimer
                                      </Tooltip>
                                    }
                                    > 
                                      <FaTrash className="mx-2 text-danger"/>
                                    </OverlayTrigger></a> : <div></div>
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
