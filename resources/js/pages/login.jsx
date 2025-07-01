import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaRegEyeSlash } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import React, { useState } from "react";
import axios from 'axios';
import "../../css/style.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [values, setValues] = useState({ 
    // Form fields
    password: "",
    email: "",
  });

  function handleChange(e) {
    const value = e.target.value
    const key = e.target.id;
    setValues(values => ({
        ...values,
        [key]: value,
    }))
  }

  // This function will send our form data to
    // store function of PostContoller
    function handleSubmit(e) {
      setLoading(true);
      e.preventDefault()
      axios.post('/connexion', values).then(res => {
          if(res.data == 'connected'){
              location.href='/dashboard';
              setLoading(false);
          }else{
              setVariant('warning');
              setMessage(res.data);
              setShowAlert(true);
              setLoading(false); 
          }
      }).catch(err => {
          setVariant('danger');
          setShowAlert(true);
          setLoading(false);
          setMessage(err);
      });
  }

  return ( 
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <div className="wrapper bg-white p-4 shadow rounded">
            <h2 className="text-center">Université de Loango</h2>
            <h4 className="text-muted text-center pt-2">Portail de Connexion</h4>
            {showAlert && (
              <Alert variant={variant} dismissible onClose={() => setShowAlert(false)}>
                {message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="form-group py-2">
                <div className="input-field d-flex align-items-center border p-2">
                  <FaUser className="me-2" />
                  <Form.Control type="email" id="email" value={values.email} onChange={handleChange} placeholder="Adresse e-mail..." required />
                </div>
              </Form.Group>
              <Form.Group className="form-group py-1 pb-2">
                <div className="input-field d-flex align-items-center border p-2">
                  <FaLock className="me-2" />
                  <Form.Control type={showPassword ? "password" : "text"} id="password" value={values.password} onChange={handleChange} placeholder="Mot de passe..." required />
                  <Button variant="light" className="border-0 bg-white text-muted"
                   onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye className="text-muted" /> : <FaRegEyeSlash className="text-muted" />}
                    
                  </Button>
                </div>
              </Form.Group>
              <div className="d-flex align-items-start justify-content-between">
                <Form.Check type="radio" label="Se souvenir" className="text-muted" />
                <a href="#" id="forgot">Mot de passe, oublié?</a>
              </div>
              {loading ? <div className="text-center">
              <Spinner animation="border" variant="secondary" />
              </div> :
              <Button className="btn btn-block text-center my-3 w-100" variant="primary" type="submit">Connexion</Button>}
              {/* <div className="text-center pt-3 text-muted">Not a member? <a href="#">Sign up</a></div> */}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;