import React, {Component} from 'react';
import {Card, Button, Form, InputGroup, FormControl, Modal} from 'react-bootstrap';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadWarning: false,
            clearWarning: false
        };

        this.handleShowLoad = this.handleShowLoad.bind(this);
        this.handleShowClear = this.handleShowClear.bind(this);
        this.handleCloseLoad = this.handleCloseLoad.bind(this);
        this.handleCloseClear = this.handleCloseClear.bind(this);
    }

    handleShowLoad() {
        this.setState({loadWarning:true});
    }

    handleShowClear() {
        this.setState({clearWarning:true});
    }

    handleCloseLoad() {
        this.setState({loadWarning:false});
    }

    handleCloseClear() {
        this.setState({clearWarning:false});
    }

    render() {
        return (
            <div>
                <Card bg="light" text="dark">
                    <Card.Header>Visualization Controls</Card.Header>
                    <Card.Body>
                        <Card.Title>Algorithm</Card.Title>
                        <Button variant="primary" onClick={this.props.resetClusters} disabled={this.props.numPoints < 1}>
                            Reset
                        </Button>{' '}
                        <Button variant="primary" onClick={this.props.stepThrough} disabled={this.props.animations && (this.props.numPoints < 1 || this.props.stepping)}>
                            Step
                        </Button>{' '}
                        <Button variant="success" onClick={this.props.runAlgorithm} disabled={this.props.numPoints < 1}>
                            Run
                        </Button>
                        {/*(!this.props.isValid) &&
                            <Alert className="mt-1" variant={'danger'}>
                                You cannot have more clusters than data points!
                            </Alert>
                        */}
                        <Card.Text>{' '}</Card.Text>
                        <Card.Title>Parameters</Card.Title>
                            <Form style={{width: 125}}>
                                <Form.Label className="text-dark">
                                    Clusters
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                      <Button variant="primary" onClick={this.props.handleDecrement} disabled={this.props.k <= 1 || this.props.running}>
                                          -
                                      </Button>
                                    </InputGroup.Prepend>
                                    <FormControl aria-describedby="basic-addon1" value={this.props.k}/>
                                    <InputGroup.Append>
                                      <Button variant="primary" onClick={this.props.handleIncrement} disabled={this.props.k >= 10 || this.props.k >= this.props.numPoints || this.props.running}>
                                          +
                                      </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                            <Button className="mt-2" variant="primary" onClick={this.props.setNewCentroids} disabled={this.props.numPoints < 1 || this.props.running}>
                                New centroids
                            </Button>{' '}
                        <Card.Text>{' '}</Card.Text>
                        <Card.Title>Dataset</Card.Title>
                            <Button variant="primary" onClick={this.handleShowClear}>
                                Clear data
                            </Button>{' '}
                            <Button variant="primary" onClick={this.handleShowLoad}>
                                Load sample
                            </Button>{' '}
                            <br/>
                            {(this.props.numPoints === 0) &&
                                <i style={{color: 'Crimson'}}>Click the visualization window to add data points</i> ||
                                    <i>Click the visualization window to add data points</i>
                            }
                        <Card.Text>{' '}</Card.Text>
                        <Card.Title>Visualization</Card.Title>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Step animation"
                                    defaultChecked={true}
                                    checked={this.props.animations}
                                    onChange={this.props.toggleAnimations}
                                    />
                                <Form.Group controlId="formBasicRangeCustom">
                                    <Form.Label>Speed</Form.Label>
                                    <Form.Control type="range" custom min="1" max="15" step="0.01" defaultValue={this.props.speed}
                                        disabled={!this.props.animations}
                                        onChange={(event) => (this.props.adjustSpeed(event.target.value))}/>
                                </Form.Group>
                            </Form>
                    </Card.Body>
                </Card>
                <Modal show={this.state.clearWarning} onHide={this.handleCloseClear} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>This will remove all of your current data points!</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleCloseClear}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={() => {this.props.clearData(); this.handleCloseClear()}}>
                        Clear data
                      </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.loadWarning} onHide={this.handleCloseLoad} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Loading the sample data will delete all of your current data points!</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleCloseLoad}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={() => {this.props.loadSampleData(); this.handleCloseLoad()}}>
                        Load sample
                      </Button>
                    </Modal.Footer>
                </Modal>
            </div>

    )}
}
