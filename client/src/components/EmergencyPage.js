import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useContrast } from '../contexts/ContrastContext'; // Ensure this is imported correctly

const EmergencyPage = () => {
    const { isHighContrast } = useContrast(); // Using the useContrast hook

    const cardStyle = {
        direction: 'rtl',
        backgroundColor: isHighContrast ? '#343a40' : '#fff',
        color: isHighContrast ? '#fff' : '#000',
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center mb-4">
                <Col xs={12} className="text-center">
                    <h1>מקרי חירום</h1>
                    <h3>טלפונים לשעת חירום</h3>
                </Col>
            </Row>

            <Row className="justify-content-center mb-5">
                <Col xs={12} md={6}>
                    <Card className="text-center" style={cardStyle}>
                        <Card.Body>
                            <div>
                                <p>משטרה: 100</p>
                                <p>מגן דוד אדום: 101</p>
                                <p>כבאות והצלה: 102</p>
                                <p>מרכזי הרעלה: 04-7771900</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs={12} className="text-center">
                    <h3>התנהגות במקרי חירום</h3>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6} className="mb-4">
                    <Card className="h-100" style={cardStyle}>
                        <Card.Body>
                            <Card.Title>רעידת אדמה</Card.Title>
                            <div>
                                <ul>
                                    <li>צאו לשטח פתוח</li>
                                    <li>אם אינכם יכולים לצאת, היכנסו לממ"ד</li>
                                    <li>התרחקו מקירות חיצוניים וחלונות</li>
                                </ul>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={8} lg={6} className="mb-4">
                    <Card className="h-100" style={cardStyle}>
                        <Card.Body>
                            <Card.Title>שריפה</Card.Title>
                            <div>
                                <ul>
                                    <li>התקשרו מיד ל-102</li>
                                    <li>עזבו את המבנה בהקדם</li>
                                    <li>הימנעו משימוש במעלית</li>
                                </ul>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EmergencyPage;
