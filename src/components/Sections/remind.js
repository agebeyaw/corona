import React, {useState} from 'react';

import {Card, Row, Col} from "react-bootstrap";

export default function Remind() {
    return (
        <div>
            <h1 className={'text-center mb-5'}>ያስታውሱ ...</h1>
            <Row className="cards">
                <Col md={2}>
                    <Card>
                        <Card.Img src="images/reminder/distance.png"/>
                        <Card.Body>
                            <Card.Title className={'font-weight-bold'}>እርቀትዎን ይጠብቁ !</Card.Title>
                            <Card.Text>
                                በሚንቀሳቀሱበት ወይም በሚቀመጡበት ወቅት፣ ከሌሎች ሰዎች ቢያንስ የ 2 ሜትር እርቀት ይጠብቁ።
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Img height="250px" src="images/reminder/mask.png"/>
                        <Card.Body>
                            <Card.Title className={'font-weight-bold'}>የአፍ ጭምብል ይጠቀሙ !</Card.Title>
                            <Card.Text>
                                ከቤትዎ ውጭ በሚንቀሳቀሱ ጊዜ፣ አፍዎን እና አፍንጫዎን በጭምብል ወይም በጋቢ ይሸፍኑ።
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Img height="250px" src="images/reminder/stay_home.png"/>
                        <Card.Body>
                            <Card.Title className={'font-weight-bold'}>እቤትዎ ይቆዩ !</Card.Title>
                            <Card.Text>
                                የቫይረሱ ስርጭት እስኪቀንስ ወይም እስኪቆም ድረስ፣ በተቻለዎ አቅም ሁሉ እቤትዎ ለመቀመጥ ይሞክሩ።
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Img height="250px" src="images/reminder/wash.jpg"/>
                        <Card.Body>
                            <Card.Title className={'font-weight-bold'}>እጅዎትን ይታጠቡ !</Card.Title>
                            <Card.Text>
                                አፍዎን፣ አፍንጫዎን እና ዐይኖችዎን ከመንካትዎ በፊት፣ እጅዎን ከ 20 - 40 ሰከንዶች በሳሙና እና በውሃ ይታጠቡ።
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
