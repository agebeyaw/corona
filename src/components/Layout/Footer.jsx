import React from "react";
import {Card, Container, Row, Col} from "react-bootstrap";

export default function Footer() {
    return (
        <div className='mt-5 border-top' style={{'background': '#dee2e6'}}>
            <footer className="p-5 footer">
                <Container>
                    <Row>
                        <Col>
                            <h3 className={'mb-3'}>የአስቸኳይ ጊዜ ቁጥሮች</h3>
                            <Row>
                                <Col md={6}>
                                    <ul className="list-group">
                                        <li className="d-flex justify-content-between align-items-center">
                                            አዲስ አበባ
                                            <span className="badge badge-primary badge-pill">8335/952</span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            ድሬ ዳዋ
                                            <span className="badge badge-primary badge-pill">6407</span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            ትግራይ
                                            <span className="badge badge-primary badge-pill">6244</span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            ኦሮሚያ
                                            <span className="badge badge-primary badge-pill">6955</span>
                                        </li>
                                    </ul>
                                </Col>
                                <Col md={6}>
                                    <ul className="list-group">
                                        <li className="d-flex justify-content-between align-items-center">
                                            አማራ
                                            <span className="badge badge-primary badge-pill">6981</span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            ሱማሊ
                                            <span className="badge badge-primary badge-pill">6599</span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            አፋር
                                            <span className="badge badge-primary badge-pill">6220</span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                            ደቡብ
                                            <span className="badge badge-primary badge-pill">6929</span>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                        <Col className={'mt-auto mr-auto'}>
                            <div className="container">
                                <div className="row">
                                    <div className="text-center col-md-12">
                                        <a href="https://www.ambapu.org" target={'_blank'} rel="noopener noreferrer"
                                           className={'text-decoration-none'}>
                                            <Card.Img className={'img-fluid mb-3'} style={{'max-width': '103px'}}
                                                      src="images/logo.png"/>
                                            <div>
                                                አማራ ምሁራን ማህበር
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

