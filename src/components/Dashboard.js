import React, {Component} from 'react';
import {Card, Container, Row, Col, Button, Form, InputGroup, FormControl} from 'react-bootstrap';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <Container fluid>
                <Row className="mt-3 mb-3">
                    <Col className="ml-auto" md={4}>
                        <Card bg="dark" text="white">
                            <Card.Header>Visualization Controls</Card.Header>
                            <Card.Body>
                                <Card.Title>Algorithm</Card.Title>
                                <Button variant="outline-light" onClick={this.resetClusters}>
                                    Reset
                                </Button>{' '}
                                <Button variant="outline-light" onClick={this.stepThrough}>
                                    Step
                                </Button>{' '}
                                <Button variant="outline-success" onClick={this.runAlgorithm}>
                                    Run
                                </Button>
                                <Card.Text>{' '}</Card.Text>
                                <Card.Title>Parameters</Card.Title>
                                    <Form>
                                        <Form.Label className="text-white">
                                            Clusters
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                              <Button variant="outline-secondary" onClick={this.handleDecrement} disabled={this.state.k <= 1}>
                                                  -
                                              </Button>
                                            </InputGroup.Prepend>
                                            <FormControl aria-describedby="basic-addon1" value={this.state.k}/>
                                            <InputGroup.Append>
                                              <Button variant="outline-secondary" onClick={this.handleIncrement} disabled={this.state.k >= 10}>
                                                  +
                                              </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form>
                                    <Button variant="outline-light" onClick={this.setNewCentroids}>
                                        New centroids
                                    </Button>{' '}
                                <Card.Text>{' '}</Card.Text>
                                <Card.Title>Dataset</Card.Title>
                                    <Button variant="outline-light">
                                        Clear data
                                    </Button>{' '}
                                    <Button variant="outline-light">
                                        Load sample
                                    </Button>{' '}
                                <Card.Text>{' '}</Card.Text>
                                <Card.Title>Visualization</Card.Title>
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Step animation"
                                            />
                                        <Form.Group controlId="formBasicRangeCustom">
                                            <Form.Label>Speed</Form.Label>
                                            <Form.Control type="range" custom />
                                        </Form.Group>
                                    </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    )}
}
