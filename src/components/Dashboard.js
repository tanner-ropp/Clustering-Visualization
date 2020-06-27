import React, {Component} from 'react';
import {Card, Container, Row, Col, Button, Form, InputGroup, FormControl, Alert} from 'react-bootstrap';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <Card bg="light" text="dark">
                <Card.Header>Visualization Controls</Card.Header>
                <Card.Body>
                    <Card.Title>Algorithm</Card.Title>
                    <Button variant="primary" onClick={this.props.resetClusters}>
                        Reset
                    </Button>{' '}
                    <Button variant="primary" onClick={this.props.stepThrough}>
                        Step
                    </Button>{' '}
                    <Button variant="success" onClick={this.props.runAlgorithm}>
                        Run
                    </Button>
                    {(!this.props.isValid) &&
                        <Alert className="mt-1" variant={'danger'}>
                            You cannot have more clusters than data points!
                        </Alert>
                    }
                    <Card.Text>{' '}</Card.Text>
                    <Card.Title>Parameters</Card.Title>
                        <Form style={{width: 125}}>
                            <Form.Label className="text-dark">
                                Clusters
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                  <Button variant="primary" onClick={this.props.handleDecrement} disabled={this.props.k <= 1}>
                                      -
                                  </Button>
                                </InputGroup.Prepend>
                                <FormControl aria-describedby="basic-addon1" value={this.props.k}/>
                                <InputGroup.Append>
                                  <Button variant="primary" onClick={this.props.handleIncrement} disabled={this.props.k >= 10}>
                                      +
                                  </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                        <Button className="mt-2" variant="primary" onClick={this.props.setNewCentroids}>
                            New centroids
                        </Button>{' '}
                    <Card.Text>{' '}</Card.Text>
                    <Card.Title>Dataset</Card.Title>
                        <Button variant="primary" onClick={this.props.clearData}>
                            Clear data
                        </Button>{' '}
                        <Button variant="primary" onClick={this.props.loadSampleData}>
                            Load sample
                        </Button>{' '}
                    <Card.Text>{' '}</Card.Text>
                    <Card.Title>Visualization</Card.Title>
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Step animation"
                                defaultChecked={true}
                                />
                            <Form.Group controlId="formBasicRangeCustom">
                                <Form.Label>Speed</Form.Label>
                                <Form.Control type="range" custom min="1" max="15" step="0.01" defaultValue={this.props.speed} onChange={(event) => (this.props.adjustSpeed(event.target.value))}/>
                            </Form.Group>
                        </Form>
                </Card.Body>
            </Card>

    )}
}
