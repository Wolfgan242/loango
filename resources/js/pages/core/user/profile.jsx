// ChangePassword.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmation) {
      setAlert('Les mots de passe ne correspondent pas.');
      return;
    }
    // Envoyer les données à l'API
    console.log({ oldPassword, newPassword });
    setAlert('Mot de passe changé avec succès.');
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow">
        <h4>Changer le mot de passe</h4>
        {alert && <Alert variant="info">{alert}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Mot de passe actuel</Form.Label>
            <Form.Control type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nouveau mot de passe</Form.Label>
            <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmer le mot de passe</Form.Label>
            <Form.Control type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">Mettre à jour</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ChangePassword;
