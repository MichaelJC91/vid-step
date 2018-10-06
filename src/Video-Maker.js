import 'rc-slider/assets/index.css';
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Grid from '@material-ui/core/Grid';
import Slider from 'rc-slider';
import _ from 'underscore';

const Range = Slider.Range;

class VideoMaker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isPlaying: null,
            rangeSliderNodes: [],
            videoProps: {
                firstNodeStart: 0,
                lastNodeEnd: null
            },
            stepNodes: [
                {
                    stepNumber: 1,
                    timeStamp: 0
                },
                {
                    stepNumber: 2,
                    timeStamp: 188
                }
            ]
        }
    }

    componentWillMount() {
        this.getVideoTimes();
    }

    componentDidMount() {
        console.log(this.state.rangeSliderNodes);
    }

    getVideoTimes() {

    let timeStamps = _.map(this.state.stepNodes, (step) => {
        return step.timeStamp
    });

    this.setState(state => ({
        rangeSliderNodes: [ ...this.state.rangeSliderNodes, ...timeStamps ]
    }));

    console.log(this.state.rangeSliderNodes)

    }

    videoDuration(e) {
        console.log(e);
    }

    render() {
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <div className="player-wrapper">
                            <ReactPlayer
                                ref={this.ref} 
                                className="react-player"
                                url="https://www.youtube.com/watch?v=qvtrWI3k87c"
                                width='100%'
                                height='100%'
                                playing={this.state.isPlaying}
                                controls={true}
                                onDuration={(e) => this.videoDuration(e)}
                            />
                        </div>
                        <Grid item xs={12} style={{ padding: 20 }}>
                            <Range allowCross={false} defaultValue={this.state.rangeSliderNodes} />
                        </Grid>  
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default VideoMaker;