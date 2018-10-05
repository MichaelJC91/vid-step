import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Grid from '@material-ui/core/Grid';

class VideoMaker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isPlaying: null
        }
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
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default VideoMaker;