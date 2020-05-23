import React, {Component} from 'react';
import './ClusteringVisualizer.css';

export default class ClusteringVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // make sure all the data points and centroids and stuff are saved here
            data_points : [],
            centroids : [],
            initial_centroids : []
        };

        this.resetClusters = this.resetClusters.bind(this);
        this.runAlgorithm = this.runAlgorithm.bind(this);
        this.stepThrough = this.stepThrough.bind(this);
        this.setNewCentroids = this.setNewCentroids.bind(this);
    }

    componentDidMount() {
        console.log("Canvas mounted");

        // Generate data points

        const data_points = []; // will hold all data points

        for (let i = 0; i < 100; i++) {
            data_points.push({
                x: (Math.random() * 350) + 10,
                y: (Math.random() * 500) + 10,
                id: 0 // represents an unassigned point (just used for initialization)
            });
        }

        for (let i = 0; i < 75; i++) {
            data_points.push({
                x: 740 - (Math.random() * 300),
                y: (Math.random() * 400) + 10,
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

        for (let i = 0; i < 3; i++) {
            centroids.push({
                x: (Math.random() * 730) + 10,
                y: (Math.random() * 730) + 10,
                id: i + 1 // this is the cluster id/number.  I should figure out how to make this non-writeable/constant
            });
        }

        const initial_centroids = centroids.map((centroid) => { // this stores a copy of the starting centroids to use on reset
            return {...centroid};
        });

        this.setState({
            centroids: centroids,
            data_points: data_points,
            initial_centroids : initial_centroids
        });
    }

    componentDidUpdate() {
        console.log(this.state.initial_centroids);

        // this acts as the draw function

        const data_points = this.state.data_points.slice();
        const centroids = this.state.centroids.slice();

        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        var cluster_colors = ["#000000", "#FF0000", "#00FF00", "#0000FF"];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        data_points.forEach((item, i) => {
            ctx.fillStyle = cluster_colors[item.id];
            ctx.fillRect(item.x, item.y, 10, 10);
        });

        ctx.lineWidth = 3;

        centroids.forEach((item, i) => {
            ctx.strokeStyle = cluster_colors[item.id];
            ctx.strokeRect(item.x, item.y, 15, 15);
        });
    }

    resetClusters() { // resets algorithm with original starting centroids
        console.log("reset");

        const data_points = this.state.data_points.map((data_point) => {
            return Object.assign({}, data_point, {id: 0});
        });

        const initial_centroids = this.state.initial_centroids.map((centroid) => {
            return {...centroid}
        });

        this.setState({
            data_points: data_points,
            centroids: initial_centroids
        });
    }

    setNewCentroids() { //resets algorithm with new centroids
        console.log("new centroids");

        const data_points = this.state.data_points.map((data_point) => {
            return Object.assign({}, data_point, {id: 0});
        });

        const centroids = []; // holds all centroids

        for (let i = 0; i < 3; i++) {
            centroids.push({
                x: (Math.random() * 730) + 10,
                y: (Math.random() * 730) + 10,
                id: i + 1 // this is the cluster id/number.  I should figure out how to make this non-writeable/constant
            });
        }

        const initial_centroids = centroids.map((centroid) => { // this stores a copy of the starting centroids to use on reset
            return {...centroid};
        });

        this.setState({
            data_points: data_points,
            centroids: centroids,
            initial_centroids: initial_centroids
        });
    }

    stepThrough() {
        console.log("STEP");

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

        this.setState({
            data_points : data_points,
            centroids: centroids
        });
    }

    runAlgorithm() {
        console.log("RUN");

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
            centroids: centroids
        });
    }

    render() {
        return (
            <div>
                <canvas id="myCanvas" width="750" height="750">
                    Your browser does not support the canvas tag.
                </canvas>
                <button onClick={this.resetClusters}>
                    Reset
                </button>
                <button onClick={this.setNewCentroids}>
                    New Centroids
                </button>
                <button onClick={this.stepThrough}>
                    Step
                </button>
                <button onClick={this.runAlgorithm}>
                    Run
                </button>
            </div>
        )
    }
}
