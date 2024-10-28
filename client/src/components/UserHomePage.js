import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardButton from './CardButton'; // Adjust the import path as needed
import { useUser } from '../contexts/UserProvider'; // Make sure to import useUser

const UserHomePage = () => {
  const { user } = useUser();
  const hobbies = user?.hobbies || [];

  return (
    <Container>
      <Row className="justify-content-center my-3">
        <h1 className="fs-1 fw-bold text-center " dir="rtl">
          שלום {user?.username}! &#128075;
        </h1>
      </Row>

      <Row dir="rtl">
        {hobbies.map(hobby => (
          <Col
            md={4}
            className="mb-4 d-flex align-items-center justify-content-center"
            key={hobby}
          >
            <CardButton hobby={hobby} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserHomePage;
