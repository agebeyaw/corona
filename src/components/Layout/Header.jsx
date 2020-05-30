import React, {useState} from 'react';

import {Navbar, Nav, NavDropdown} from "react-bootstrap";

export default function Header() {
    return (
        <div className='mb-5'>
            <Navbar className='pd-sm-1' collapseOnSelect expand="lg" bg="primary" variant="primary" fixed="top">
                <Navbar.Brand  className="mr-2 mt-1" href="#home">
                    <a href="/" style={{'text-decoration': 'none'}}>
                       {/* <img src="/images/logo.png" width="40" height="40"/>*/}
                       <h4>የኮሮና ቫይረስ ክትትል</h4>
                    </a>
                </Navbar.Brand>
                {/*<Navbar.Toggle aria-controls="responsive-navbar-nav"  />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mt-2 mr-auto">
                        <Nav.Link href="#features">Menu1</Nav.Link>
                        <Nav.Link href="#pricing">Menu2</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">ያግኙን</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            መነሻ
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>*/}
            </Navbar>
        </div>
    );
};

