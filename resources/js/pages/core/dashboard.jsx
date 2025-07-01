import React, { useState } from "react";
import { Navbar, Dropdown, Card, Table, Pagination, Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import { FaRegCheckCircle, FaRegTimesCircle, FaBullseye, FaMoneyBillWave, FaTimesCircle } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import "../../../css/dashboard.css";
import "../../../css/style.css";

const Dashboard = ({user}) => {
  const cardsData = [
    {
      title: '',
      totalIncome: '$5000',
      unpaidPayments: 10,
      receivedPayments: 30,
      detailsLink: '#',
    },
    {
      title: '',
      totalIncome: '$4500',
      unpaidPayments: 8,
      receivedPayments: 25,
      detailsLink: '#',
    },
    {
      title: '',
      totalIncome: '$6000',
      unpaidPayments: 5,
      receivedPayments: 35,
      detailsLink: '#',
    },
  ];

  const data = [
    { month: 'Jan', income: 5000, spend: 3000 },
    { month: 'Fev', income: 4500, spend: 2800 },
    { month: 'Mar', income: 6000, spend: 3500 },
    { month: 'Avr', income: 500, spend: 900 },
    { month: 'Mai', income: 8000, spend: 7000 },
    { month: 'Juin', income: 9000, spend: 4200 },
    { month: 'Juil', income: 6500, spend: 4800 },
    { month: 'Août', income: 8500, spend: 9000 },
    { month: 'Sept', income: 4000, spend: 3000 },
    { month: 'Oct', income: 1000, spend: 500 },
    { month: 'Nov', income: 5500, spend: 4500 },
    { month: 'Dec', income: 7000, spend: 14000 },
  ];

  // Example data
  const transactions = [
    { id: 1, date: "2025-02-10", type: "Income", amount: 1500 },
    { id: 2, date: "2025-02-12", type: "Expense", amount: -400 },
    { id: 3, date: "2025-02-14", type: "Expense", amount: -250 },
  ];

  const futurePayments = [
    { id: 1, title: "Electricity Bill", amount: "120", dueDate: "Feb 20", icon: <FaMoneyBillWave /> },
    { id: 2, title: "Internet Subscription", amount: "50", dueDate: "Feb 25", icon: <FaMoneyBillWave /> },
  ];

  const socialPayments = [
    { id: 1, name: "John Doe", amount: "300", img: "https://geniuses.club/public/storage/192/144/044/165/360_360_60714dbc090a6.jpg" },
    { id: 2, name: "Jane Smith", amount: "450", img: "https://geniuses.club/public/storage/192/144/044/165/360_360_60714dbc090a6.jpg" },
  ];

  // Sample data for user categories
  const userCategories = ['Mediathèque', ' Utilisateur', ' Article', ' Offre'];


  
  return (
    
    <Container fluid className="dashboard-container">
      <Navbar bg="light" expand="lg" className="px-3">
        <Container fluid>
          {/* Nom d'utilisateur */}
          <Navbar.Brand>Bienvenue, <strong>{user.name}.</strong></Navbar.Brand>
          
          {/* Photo de profil avec menu déroulant */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" className="d-flex align-items-center border-0">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/9706/9706583.png"
                roundedCircle
                width="40"
                height="40"
                className="me-2"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">👤 Profil</Dropdown.Item>
              <Dropdown.Item href="#">🔒 Niveau d'accès : Administrateur</Dropdown.Item>
              <Dropdown.Item href="#">⚙ Paramètres</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" className="text-danger">🚪 Déconnexion</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      {/* Chart Section */}
      <Card className="money-report my-3">
        <Card.Body>
            
                  <Row>
                    <Col md={12}>
                      <Card className="shadow-sm border-light">
                        <Card.Header className="bg-primary text-white text-center">
                          <h5>Rapport des candidatures et approbations</h5>
                        </Card.Header>
                        <Card.Body>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="income" fill="#28a745" name="Income" />
                              <Bar dataKey="spend" fill="#dc3545" name="Spend" />
                            </BarChart>
                          </ResponsiveContainer>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
        </Card.Body>
      </Card>
      {/* Horizontal List of User Categories */}
      <Row className="mt-4">
        <Col md={12}>
          <Card className="shadow-sm border-light">
            <Card.Body className="d-flex justify-content-between">
              
              <a href="establishments"><h6 className="text-primary">{'Etablissements'}</h6></a>
              <a href="institutions"><h6 className="text-primary">{'Institutions'}</h6></a>
              
              <a href="users"><h6 className="text-primary">{'Utilisateurs'}</h6></a>
              {/* <a href=""><h6 className="text-primary">{'Actualités'}</h6></a> */}
              
              <a href="criterias"><h6 className="text-primary">{'Critères'}</h6></a>
              {/* <a href=""><h6 className="text-primary">{'Articles'}</h6></a> */}
              <a href="offers"><h6 className="text-primary">{'Offres'}</h6></a>
              <a href="cities"><h6 className="text-primary">{'Villes'}</h6></a>
              <a href="countries"><h6 className="text-primary">{'Pays'}</h6></a>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      {/* Money Report Card */}
      <Card className="money-report">
        <Card.Body>
          <Row>
            <Col>
              <h4 className="text-primary fw-bold">Approbations et Rejets</h4>
              <p className="text-muted">Votre aperçu</p>
            </Col>
            <Col className="text-end">
              <FaBullseye className="wallet-icon" />
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <div className="report-box income">
                <FaRegCheckCircle className="report-icon up" />
                <h5>5,000</h5>
                <p>Approuvées</p>
              </div>
            </Col>
            <Col>
              <div className="report-box expenses">
                <FaRegTimesCircle className="report-icon down" />
                <h5>3,200</h5>
                <p>Rejets</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Social Payments List */}
      <Card className="social-payments mt-4">
        <Card.Body>
          {/* Horizontal List of Social Case Payments */}
          <Row className="mt-4">
                  <Col md={12}>
                    <Card className="shadow-sm border-light">
                      <Card.Header className="bg-info text-white">Gestion des publications</Card.Header>
                      <Card.Body className="d-flex justify-content-around">
                        {socialPayments.map((payment, index) => (
                          <div key={index} className="text-center">
                            <Image src={payment.image} roundedCircle width={50} className="mb-2" />
                            <h6>{payment.name}</h6>
                            <p className="text-muted">{payment.amount}</p>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Social Payments List */}
      <Card className="social-payments mt-4">
        <Card.Body>
          {/* Horizontal List of Future Payments */}
                <Row className="mt-4">
                  <Col md={12}>
                    <Card className="shadow-sm border-light">
                      <Card.Header className="bg-warning text-dark">Les actualités</Card.Header>
                      <Card.Body className="d-flex justify-content-around">
                        {futurePayments.map((payment, index) => (
                          <div key={index} className="text-center">
                            <div className="mb-2">{payment.icon}</div>
                            <h6>{payment.title}</h6>
                            <p className="text-muted">{payment.amount}</p>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
        </Card.Body>
      </Card>

      {/* Future Payments List */}
      <Card className="future-payments mt-4">
        <Card.Body>
          <ListGroup horizontal>
            {futurePayments.map((payment) => (
              <ListGroup.Item key={payment.id} className="future-payment-item mx-1">
                <div className="">{payment.icon} <span>{payment.title} - {payment.amount} (Due: {payment.dueDate})</span></div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
