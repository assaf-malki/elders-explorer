import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardButton from './CardButton'; // Adjust the import path as needed

const BanksPage = () => {
  const banks = [
    'בנק לאומי',
    'בנק הפועלים',
    'בנק מזרחי',
    'בנק דיסקונט',
    'בנק יהב',
    'בנק הבינלאומי',
  ];

  return (
    <Container>
      <Row className="justify-content-center my-3">
        <h1 className="text-center" dir="rtl">
          בנקים
        </h1>
      </Row>

      <Row dir="rtl">
        {banks.map(bank => (
          <Col
            md={4}
            className="mb-4 d-flex align-items-center justify-content-center"
            key={bank}
          >
            <CardButton hobby={bank} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BanksPage;
