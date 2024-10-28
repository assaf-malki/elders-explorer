import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardButton from './CardButton'; // Adjust the import path as needed

const HmosPage = () => {
    const hmos = ['כללית', 'מכבי', 'מאוחדת', 'לאומית'];

    return (
        <Container>
            <Row className="justify-content-center my-3">
                <h1 className="text-center" dir="rtl">
                    קופות חולים
                </h1>
            </Row>

            <Row dir="rtl">
                {hmos.map(hmo => (
                    <Col
                        md={4}
                        className="mb-4 d-flex align-items-center justify-content-center"
                        key={hmo}
                    >
                        <CardButton hobby={hmo} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HmosPage;
