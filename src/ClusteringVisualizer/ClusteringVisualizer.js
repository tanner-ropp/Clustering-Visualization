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

        ctx.fillStyle = "#000000";

        for (let i = 0; i < 10; i++) {
            ctx.fillRect((Math.random() * 250) + 10, (Math.random() * 250) + 10, 10, 10);
        }

        for (let i = 0; i < 10; i++) {
            ctx.fillRect(740 - (Math.random() * 300), (Math.random() * 250) + 10, 10, 10);
        }

        for (let i = 0; i < 10; i++) {
            ctx.fillRect(250 + (Math.random() * 250), 740 - (Math.random() * 300), 10, 10);
        }

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
