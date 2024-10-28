import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from '../contexts/UserProvider';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { isHighContrast, setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/auth/login`,
        { username, password }
      );
      // Assuming the API returns all user data on successful login
      setUser(response.data.user); // Set the user context with all retrieved user info
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage =
        error?.response?.data?.message || 'An unexpected error occurred';
      alert(`Failed to log in: ${errorMessage}`);
    }
  };

  return (
    <Container
      className={`my-5 ${isHighContrast ? 'bg-dark text-white' : ''}`}
      dir="rtl"
    >
      <h1 className="text-center mb-3">כניסה למערכת</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>שם משתמש:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onInvalid={e => e.target.setCustomValidity('נא למלא שם משתמש')}
                onInput={e => e.target.setCustomValidity('')}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Form.Group>
              <Form.Label>סיסמא:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onInvalid={e => e.target.setCustomValidity('נא למלא סיסמא')}
                onInput={e => e.target.setCustomValidity('')}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button variant="primary" type="submit">
              התחבר
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <span style={{ marginLeft: '5px' }}>עדיין לא רשום?</span>
            <Nav.Link
              as={Link}
              to="/register"
              className="text-primary"
              style={{ display: 'inline' }}
            >
              לחץ כאן
            </Nav.Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default LoginForm;
