import React from 'react';

import {Card, Col, Row} from "react-bootstrap";

export default function Symptoms() {
    return (
        <div>
            <h1 className={'text-center mb-5'}>የኮሮና ምልክቶች</h1>
            <Row className="cards">
                <Col md={2}>
                    <Card>
                        <Card.Img src="images/symptoms/cauthing.png"/>
                        <Card.Body>
                            <Card.Title className={'font-weight-bold'}>ደረቅ ሳል</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Img src="images/symptoms/headache.png"/>
                        <Card.Body>
                            <Card.Title className={'font-weight-bold'}>ትኩሳት</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Img src="images/symptoms/throat.png"/>
                        <Card.Body>
                            <Card.Title className={'font-weight-bold'}>የጉሮሮ ቁስለት</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Img src="images/symptoms/shortness-of-breath.jpg"/>
                        <Card.Body>
                            <Card.Title className={'font-weight-bold'}>የእስትንፋስ እጥረት</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
