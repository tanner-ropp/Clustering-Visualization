import React, {Component} from 'react';
import {Form, Navbar, Nav, Container, Row, Col, Button, InputGroup, FormControl} from 'react-bootstrap'
import Animation from '../components/Animation.js';
import Dashboard from '../components/Dashboard.js'
import './ClusteringVisualizer.css';
import logo from './ClusterLogo2.png'

export default class ClusteringVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // make sure all the data points and centroids and stuff are saved here
            data_points : [],
            centroids : [],
            prev_centroids: [], // for animating purpose
            initial_centroids : [],
            animating_centroids : false,
            animations_on : true, // for the actual animation switch
            k: 3,
            speed: 5
        };

        // initialize refs
        //this.clusterInput = React.createRef();

        // bind methods
        this.resetClusters = this.resetClusters.bind(this);
        this.runAlgorithm = this.runAlgorithm.bind(this);
        this.stepThrough = this.stepThrough.bind(this);
        this.setNewCentroids = this.setNewCentroids.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.clearData = this.clearData.bind(this);
        this.loadSampleData = this.loadSampleData.bind(this);
    }

    componentDidMount() {
        console.log("Canvas mounted");

        // Generate data points

        const data_points = []; // will hold all data points

        for (let i = 0; i < 100; i++) {
            data_points.push({
                x: (Math.random() * 400) + 10,
                y: (Math.random() * 350) + 10,
                id: 0 // represents an unassigned point (just used for initialization)
            });
        }

        for (let i = 0; i < 75; i++) {
            data_points.push({
                x: 740 - (Math.random() * 200),
                y: (Math.random() * 350) + 10,
                id: 0
            });
        }

        for (let i = 0; i < 80; i++) {
            data_points.push({
                x: 100 + (Math.random() * 500),
                y: 740 - (Math.random() * 300),
                id: 0
            });
        }



        // Generate centroids

        const centroids = []; // holds all centroids

        for (let i = 0; i < this.state.k; i++) {
            centroids.push({
                x: (Math.random() * 730) + 10,
                y: (Math.random() * 730) + 10,
                id: i + 1 // this is the cluster id/number.  I should figure out how to make this non-writeable/constant
            });
        }

        const initial_centroids = centroids.map((centroid) => { // this stores a copy of the starting centroids to use on reset
            return {...centroid};
        });

        const prev_centroids = centroids.map((centroid) => { // this stores a copy of the starting centroids to use on reset
            return {...centroid};
        });

        this.setState({
            centroids: centroids,
            data_points: data_points,
            initial_centroids : initial_centroids,
            prev_centroids : prev_centroids
        });
    }

    componentDidUpdate() {
        console.log(this.state.animations_on);
        // this acts as the draw function

        /*const data_points = this.state.data_points.slice();
        const centroids = this.state.centroids.slice();

        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        var cluster_colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#FF9900", "#00FFFF", "#9900FF", "#980000", "#666666", "#4A86E8"];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        data_points.forEach((item, i) => {
            // circle drawing code from https://www.html5canvastutorials.com/tutorials/html5-canvas-circles/
            ctx.fillStyle = cluster_colors[item.id];
            ctx.strokeStyle = cluster_colors[item.id];

            ctx.fillRect(item.x - 5, item.y - 5, 10, 10);*/
            /*ctx.beginPath();
            ctx.arc(item.x, item.y, 4, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();*/
        /*});

        ctx.lineWidth = 3;

        centroids.forEach((item, i) => {
            ctx.strokeStyle = cluster_colors[item.id];
            ctx.strokeRect(item.x - 7.5, item.y - 7.5, 15, 15);
        });*/
    }

    resetClusters() { // resets algorithm with original starting centroids

        const data_points = this.state.data_points.map((data_point) => {
            return Object.assign({}, data_point, {id: 0});
        });

        const initial_centroids = this.state.initial_centroids.map((centroid) => {
            return {...centroid}
        });

        this.setState(prevState => ({
            data_points: data_points,
            centroids: initial_centroids,
            prev_centroids: prevState.centroids
        }));
    }

    setNewCentroids() { //resets algorithm with new centroids

        const data_points = this.state.data_points.map((data_point) => {
            return Object.assign({}, data_point, {id: 0});
        });

        const centroids = []; // holds all centroids
        const centroid_options = this.state.data_points.map((data_point) => { // this stores a copy of the available datapoints to choose as centroids
            return {...data_point};
        });

        for (let i = 0; i < this.state.k; i++) {
            var rand_index = Math.floor(Math.random()*centroid_options.length);
            var centroid_option = centroid_options[rand_index];
            console.log(centroid_options);
            console.log(centroid_option);
            centroid_options.splice(rand_index, 1); // remove the data point so it can't be selected again
            centroids.push({
                x: centroid_option.x,
                y: centroid_option.y,
                id: i + 1
            })
            /*centroids.push({
                x: (Math.random() * 730) + 10,
                y: (Math.random() * 730) + 10,
                id: i + 1 // this is the cluster id/number.  I should figure out how to make this non-writeable/constant
            });*/
        }

        const initial_centroids = centroids.map((centroid) => { // this stores a copy of the starting centroids to use on reset
            return {...centroid};
        });

        this.setState(prevState => ({
            data_points: data_points,
            centroids: centroids,
            prev_centroids: prevState.centroids,
            initial_centroids: initial_centroids
        }));
    }

    stepThrough() {
        // k-means algorithm step

        let distance = (pos1, pos2) => {
            let dx = pos2.x - pos1.x;
            let dy = pos2.y - pos1.y;
            return Math.sqrt((dx*dx) + (dy*dy)) ;
        }

        const data_points = this.state.data_points.map((data_point) => {
            return {...data_point}
        });

        const centroids = this.state.centroids.map((centroid) => {
            return {...centroid}
        });


        // update data point id's

        data_points.forEach((data_point, i) => {
            let min_dist = 1000;

            centroids.forEach((centroid, i) => {
                if (data_point.id === 0 || distance(data_point, centroid) < min_dist) {
                    min_dist = distance(data_point, centroid);
                    data_point.id = centroid.id;
                }
            });
        });

        // update centroid positions

        centroids.forEach((centroid, i) => {
            let xTotal = 0;
            let yTotal = 0;
            let point_count = 0;

            data_points.forEach((data_point, i) => {
                if (data_point.id === centroid.id) {
                    point_count++;
                    xTotal += data_point.x;
                    yTotal += data_point.y;
                }
            });

            let xAvg = xTotal/point_count;
            let yAvg = yTotal/point_count;

            centroid.x = xAvg;
            centroid.y = yAvg;
        });

        this.setState(prevState => ({
            data_points : data_points,
            centroids : centroids,
            prev_centroids : prevState.centroids,
            animating_centroids : true
        }));
    }

    runAlgorithm() {
        // k-means algorithm

        let distance = (pos1, pos2) => {
            let dx = pos2.x - pos1.x;
            let dy = pos2.y - pos1.y;
            return Math.sqrt((dx*dx) + (dy*dy)) ;
        }

        const data_points = this.state.data_points.map((data_point) => {
            return {...data_point}
        });

        const centroids = this.state.centroids.map((centroid) => {
            return {...centroid}
        });

        let anything_changed = false;

        do {
            anything_changed = false;

            // update data point id's

            data_points.forEach((data_point, i) => {
                let min_dist = 1000;
                let prev_id = data_point.id;

                centroids.forEach((centroid, i) => {
                    if (data_point.id === 0 || distance(data_point, centroid) < min_dist) {
                        min_dist = distance(data_point, centroid);
                        data_point.id = centroid.id;
                    }
                });

                if (data_point.id !== prev_id) {
                    anything_changed = true;
                }
            });

            // update centroid positions

            centroids.forEach((centroid, i) => {
                let xTotal = 0;
                let yTotal = 0;
                let point_count = 0;

                data_points.forEach((data_point, i) => {
                    if (data_point.id === centroid.id) {
                        point_count++;
                        xTotal += data_point.x;
                        yTotal += data_point.y;
                    }
                });

                let xAvg = xTotal/point_count;
                let yAvg = yTotal/point_count;

                centroid.x = xAvg;
                centroid.y = yAvg;
            });

        } while(anything_changed);

        this.setState({
            data_points : data_points,
            centroids: centroids,
            animating_centroids: false
        });
    }

    handleDecrement() {
        this.setState({
            k: (this.state.k - 1)
        }, this.setNewCentroids)
    }

    handleIncrement() {
        this.setState({
            k: (this.state.k + 1)
        }, this.setNewCentroids)
    }

    clearData() {
        this.setState({
            data_points : []
        });
    }

    loadSampleData() {
        this.clearData();

        const data_points = [];

        for (let i = 0; i < 100; i++) {
            data_points.push({
                x: (Math.random() * 400) + 10,
                y: (Math.random() * 350) + 10,
                id: 0 // represents an unassigned point (just used for initialization)
            });
        }

        for (let i = 0; i < 75; i++) {
            data_points.push({
                x: 740 - (Math.random() * 200),
                y: (Math.random() * 350) + 10,
                id: 0
            });
        }

        for (let i = 0; i < 80; i++) {
            data_points.push({
                x: 100 + (Math.random() * 500),
                y: 740 - (Math.random() * 300),
                id: 0
            });
        }

        this.setState({
            data_points: data_points,
            k: 3
        }, this.setNewCentroids);
    }

    render() {
        return (
            <div className="background">
                <Navbar className="custom-navbar justify-content-between" bg="dark" variant="dark">
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logo}
                            width="35"
                            height="35"
                            className="d-inline-block align-top mr-1"
                          />{' '}
                        K-means Clustering Visualizer
                    </Navbar.Brand>
                </Navbar>
                <section className="">
                    <Container fluid="xl" className="custom-container">
                        <Row className="pt-3 pb-3 justify-content-md-center">
                            <Col className="text-center">
                                <Animation
                                    animations={this.state.animations_on}
                                    animating={this.state.animating_centroids}
                                    dataPoints={this.state.data_points}
                                    centroids={this.state.centroids}
                                    prevCentroids={this.state.prev_centroids}
                                    speed={this.state.speed}
                                    onMouseDown={(e) => {
                                    const data_points = this.state.data_points.map((data_point) => {
                                        return {...data_point}
                                    });

                                    const canvas = document.getElementById('myCanvas');
                                    var rect = canvas.getBoundingClientRect();
                                    console.log(rect.height);

                                    data_points.push({
                                        x: (e.clientX - rect.left - 4)*(750/rect.width), // custom offset to make the square at the point of thr cursor
                                        y: (e.clientY - rect.top - 4)*(750/rect.height),
                                        id: 0
                                    });

                                    this.setState({
                                        data_points: data_points
                                    })
                                }}/>
                            </Col>
                            <Col className="my-auto" md={4}>
                                <Dashboard
                                    isValid={this.state.k <= this.state.data_points.length}
                                    k={this.state.k}
                                    speed={this.state.speed}
                                    stepThrough={this.stepThrough}
                                    resetClusters={this.resetClusters}
                                    runAlgorithm={this.runAlgorithm}
                                    handleDecrement={this.handleDecrement}
                                    handleIncrement={this.handleIncrement}
                                    setNewCentroids={this.setNewCentroids}
                                    clearData={this.clearData}
                                    loadSampleData={this.loadSampleData}
                                    animations={this.state.animations_on}
                                    toggleAnimations={() => (
                                        this.setState({
                                            animations_on: !this.state.animations_on
                                        })
                                    )}
                                    adjustSpeed={(newSpeed) => (
                                        this.setState({
                                            speed : newSpeed
                                        })
                                    )}/>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <footer className="bg-dark text-muted">
                    <div className="text-center">
                        - Tanner Ropp, 2020 -
                    </div>
                </footer>
            </div>
        )
    }
}
