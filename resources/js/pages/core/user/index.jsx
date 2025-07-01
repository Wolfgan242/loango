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
  Alert,
  InputGroup,
  OverlayTrigger,
} from "react-bootstrap";
import { FaChevronLeft, FaUserShield, FaGlobeAfrica, FaPlus, FaInfoCircle, FaBan, FaTrash, FaPlay, FaPause, FaEye, FaFilePdf } from "react-icons/fa";
import { motion } from 'framer-motion';
import "../../../../css/dashboard.css";
import "../../../../css/style.css";
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';

const Index = ({users, roles, user}) => {
  // Exemple de données pour les cartes
  //const defaultInstitute = { value: users.role.id, label: users.role.display };
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [selectedRole, setSelectedRole] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [variant, setVariant] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);
  const [datas, setDatas] = useState(users);
  const [user_, setUser_] = useState(null);
  const [role, setRole] = useState({
      role_id: "",
  });
  const [request, setRequest] = useState({
    comment: "No comment !",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const filteredActivity = (datas || []).filter(item => 
    item.city.name.toLowerCase().includes(filterText.toLowerCase()) ||
    item.phone.toLowerCase().includes(filterText.toLowerCase()) ||
    item.email.toLowerCase().includes(filterText.toLowerCase()) ||
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
        axios.get('users/destroy/'+id).then(res => {
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
  function handleActives(id) {
    axios.get('users/actives/'+id).then(res => {
      if (res.status == 200) {
        setDatas(res.data);
      }
     }).catch(err => {
       console.log(err.message);
    });
  }

  const handleChangeRole = selected => {
    role.role_id= selected.value;
    setAlert(false);
    axios.put('users/update/role/'+user_.id, role).then(res => {
      if (res.status == 200) {
        setMessage('Niveau d\'accès mise à jour !');
        setVariant('success');
        setAlert(true);
        setDatas(res.data);
      }
     }).catch(err => {
      setMessage('Erreur de mise à jour !');
      setVariant('danger');
      setAlert(true);
    });
  };

  const options = roles.map(item => ({
    label: `${item.display}`, // Display name
    value: item.id,
  }));

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + ' ...' : text;
  };

  const normal = (text) => {
    let formattedDate = new Date(text).toLocaleString();
    return formattedDate; 
  }

  const openModalWithCity = (item) => {
    setSelectedRole({ value: item.role.id, label: item.role.display }); // stocke la ville
    setShowModal(true);   // affiche le modal
    setUser_(item);
    
  };

  return (
    <Container fluid className="py-4">
      {/* Titre et bouton d'ajout */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold">Gestion des Utilisateurs</h2>
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
                    <a href="users/create">
                    <span className="px-2"><Button variant="primary" className="px-2">
                      <FaPlus className="me-2" /> Ajouter un Utilisateur
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
                    <h5>👨‍🏫 Utilisateurs</h5>
                    <h3>80</h3>
                </div>
              </Card.Body>
            </Card>
        </Col>
        
        <Col md={3} key={2}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card p-3 text-center">
                    <h5>📚 Admins</h5>
                    <h3>3500</h3>
                </div>
              </Card.Body>
            </Card>
        </Col>

        <Col md={3} key={3}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card p-3 text-center">
                    <h5>📄 Super</h5>
                    <h3>45</h3>
                </div>
              </Card.Body>
            </Card>
        </Col>

        <Col md={3} key={4}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card p-3 text-center">
                    <h5>✅ DG</h5>
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
              Liste des institutions
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
              <th onClick={() => handleSort("code")} style={{ cursor: "pointer" }}>Identifiant</th>
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Nom</th>
              <th onClick={() => handleSort("city")} style={{ cursor: "pointer" }}>Ville</th>
              <th onClick={() => handleSort("phone")} style={{ cursor: "pointer" }}>Phone</th>
              <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>Email</th>
              <th onClick={() => handleSort("type")} style={{ cursor: "pointer" }}>Accès</th>
              <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>Status</th>
              <th onClick={() => handleSort("created_at")} style={{ cursor: "pointer" }}>Création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedActivity.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td><Badge bg={item.actives == 1 ? "success":"warning"}>{item.actives == 1 ? "Actif" : "Inactif"}</Badge></td>
                <td>{item.identifiant}</td>
                <td>{item.name}</td>
                <td>{item.city.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.role.display}</td>
                <td>{truncate(item.adresse, 30)}</td>
                <td>{normal(item.created_at)}</td>
                <td>

                  {user.role_id >= item.role.access ? <a onClick={() => openModalWithCity(item)}>
                    <OverlayTrigger
                        placement='bottom'
                        overlay={
                          <Tooltip id={`tooltip-bottom`}>
                            Accès
                          </Tooltip>
                        }
                        > 
                          <FaUserShield className="mx-2 text-secondary"/>
                    </OverlayTrigger>
                  </a> :  <OverlayTrigger
                        placement='bottom'
                        overlay={
                          <Tooltip id={`tooltip-bottom`}>
                            Vous ne pouvez modifiez !
                          </Tooltip>
                        }
                        > 
                          <FaUserShield className="mx-2 text-secondary"/>
                    </OverlayTrigger>}
                
                  {(user.role_id >= 3 && user.role_id >= item.role.access ? <a type="button" onClick={() => handleActives(item.id)}>{item.actives == 0 ? <OverlayTrigger
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
                    </OverlayTrigger>}</a> : <OverlayTrigger
                    placement='bottom'
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        Vous ne pouvez !
                      </Tooltip>
                    }
                    > 
                      <FaBan className="mx-2 text-danger"/>
                    </OverlayTrigger>)
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Informations supplémentaires</Modal.Title>
          
        </Modal.Header>
        
        <Modal.Body>
        {alert? <Alert variant={variant} onClose={() => setAlert(false)} dismissible>
        {message}</Alert> : <span></span>}
                    <Form.Group>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaGlobeAfrica />
                        </InputGroup.Text>
                            <Select
                            required 
                            options={options}
                            className="form-control"
                            onChange={handleChangeRole}
                            defaultValue={selectedRole}
                            placeholder="Choisir le role..."/>
                        <Form.Control.Feedback type="invalid">
                          
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Index;