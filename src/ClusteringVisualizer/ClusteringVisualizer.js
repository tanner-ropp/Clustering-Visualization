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

        var data_points = [];

        for (let i = 0; i < 10; i++) {
            data_points.push({
                x: (Math.random() * 250) + 10,
                y: (Math.random() * 250) + 10
            });
        }

        for (let i = 0; i < 10; i++) {
            data_points.push({
                x: 740 - (Math.random() * 300),
                y: (Math.random() * 250) + 10
            });
        }

        for (let i = 0; i < 10; i++) {
            data_points.push({
                x: 250 + (Math.random() * 250),
                y: 740 - (Math.random() * 300)
            });
        }

        // Draw data points

        ctx.fillStyle = "#000000";

        data_points.forEach((item, i) => {
            ctx.fillRect(item.x, item.y, 10, 10);
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
