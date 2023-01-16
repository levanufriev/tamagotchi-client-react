import React,{Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/account-details">Account details</Nav.Link>
                    <Nav.Link href="/farms-overview">Farms overview</Nav.Link>
                    <Nav.Link href="/farm-details">Farm details</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
    
} 