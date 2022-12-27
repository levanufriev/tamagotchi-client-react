import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Farm.css';

export default function Farm() {
    return (
        <Row className="align-items-center">
            <Col>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Col>
            <Col>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Col>
        </Row>
    )
}