// based on the separation of drawing and animation components
// from https://hackernoon.com/techniques-for-animating-on-the-canvas-in-react-d0e9fd53e9da
import React, {Component} from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    // this acts as the draw function

    const data_points = this.props.dataPoints;
    const centroids = this.props.centroids;
    //const prev_centroids = this.props.prevCentroids;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    var cluster_colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#FF9900", "#00FFFF", "#9900FF", "#980000", "#666666", "#4A86E8"];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    data_points.forEach((item, i) => {
        // circle drawing code from https://www.html5canvastutorials.com/tutorials/html5-canvas-circles/
        ctx.fillStyle = cluster_colors[item.id];
        ctx.strokeStyle = cluster_colors[item.id];

        ctx.fillRect(item.x - 5, item.y - 5, 10, 10);
    });

    ctx.lineWidth = 5;

    centroids.forEach((item, i) => {
        ctx.strokeStyle = cluster_colors[item.id];
        ctx.strokeRect(item.x - 7.5, item.y - 7.5, 15, 15);
    });

  }

  render() {
    return (
        <canvas id="myCanvas" width="750" height="750" ref={this.canvasRef} onMouseDown={this.props.onMouseDown}>
            Your browser does not support the canvas tag.
        </canvas>
    );
  }
}
