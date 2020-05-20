import React, {Component} from 'react';
import './ClusteringVisualizer.css';

export default class ClusteringVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        console.log("Canvas mounted");



        // Generate data points

        var data_points = []; // holds all data points

        for (let i = 0; i < 10; i++) {
            data_points.push({
                x: (Math.random() * 250) + 10,
                y: (Math.random() * 250) + 10,
                id: 0 // represents an unassigned point (just used for initialization)
            });
        }

        for (let i = 0; i < 10; i++) {
            data_points.push({
                x: 740 - (Math.random() * 300),
                y: (Math.random() * 250) + 10,
                id: 0
            });
        }

        for (let i = 0; i < 10; i++) {
            data_points.push({
                x: 250 + (Math.random() * 250),
                y: 740 - (Math.random() * 300),
                id: 0
            });
        }



        // Generate centroids

        var centroids = []; // holds all centroid

        for (let i = 0; i < 3; i++) {
            centroids.push({
                x: (Math.random() * 730) + 10,
                y: (Math.random() * 730) + 10,
                id: i + 1 // this is the cluster id/number.  I should figure out how to make this non-writeable/constant
            });
        }



        // k-means algorithm

        let distance = (pos1, pos2) => {
            let dx = pos2.x - pos1.x;
            let dy = pos2.y - pos1.y;
            return Math.sqrt((dx*dx) + (dy*dy)) ;
        }

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



        // Draw data points and centroids

        var cluster_colors = ["#000000", "#FF0000", "#00FF00", "#0000FF"];

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

    render() {
        return (
            <div>
                <canvas id="myCanvas" width="750" height="750">
                    Your browser does not support the canvas tag.
                </canvas>
            </div>
        )
    }
}
