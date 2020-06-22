// based on idea of separating drawing an animation from https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/
import React, {Component} from 'react';
import Canvas from './Canvas.js'

export default class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            centroid_offsets: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
            centroids: [] // based on current logic this seems to end up storing prev_centroids initially
            //moving : false,
            //moving_centroids : []
        };
        this.updateAnimationState = this.updateAnimationState.bind(this);
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
        this.setState({centroids: this.props.centroids});
        console.log("did mount");
    }

    componentDidUpdate() {}

    updateAnimationState() {
        if (this.props.animating) {
            console.log("ANIMATING");

            const new_centroids = this.props.centroids;
            const prev_centroids = this.props.prevCentroids;



            const updated_centroids = this.state.centroids.map((item, i) => {
                const dx = new_centroids[i].x - item.x;
                const dy = new_centroids[i].y - item.y;
                const dist = Math.sqrt((dy*dy)+(dx*dx));

                // used for speed ramp
                /*const full_dx = new_centroids[i].x - prev_centroids[i].x;
                const full_dy = new_centroids[i].y - prev_centroids[i].y;
                const full_dist = Math.sqrt((full_dy*full_dy)+(full_dx*full_dx));*/

                var speed = 5; // try doing something with trig to make a speed ramp
                //var speed = Math.abs(6*Math.sin((dist/full_dist)*Math.PI)) + 0.2;

                if (dist < speed) { // this is to prevent vibration
                    return {
                        x: new_centroids[i].x,
                        y: new_centroids[i].y,
                        id: item.id
                    }
                } else {
                    return {
                        x: item.x + speed*dx/dist,
                        y: item.y + speed*dy/dist,
                        id: item.id
                    }
                }
            })
            this.setState({centroids: updated_centroids})
        } else { // not animating
            this.setState({centroids: this.props.centroids}) // this seems to make the state store the previosu centroid when step is called
            console.log("NOT ANIMATING")
        }
        //this.setState(prevState => ({centroids: updated_centroids}));
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    render() {
        /*return <Canvas onMouseDown={this.props.onMouseDown} dataPoints={this.props.dataPoints}
            centroids={this.props.animating ? this.state.moving_centroids : this.props.centroids}/>;*/
        return <Canvas {...this.props} centroids={this.props.animating ? this.state.centroids : this.props.centroids}/>
    }
}
