import 'rc-slider/assets/index.css';
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Grid from '@material-ui/core/Grid';
import { Range, Handle  } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import _ from 'underscore';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


class VideoMaker extends Component {
    constructor(props) {
        super(props)

        this.updateStartTime = _.debounce(this.updateStartTime, 50);
        this.updateEndTime = _.debounce(this.updateEndTime, 50);

        this.state = {
            isPlaying: null,
            rangeSliderNodes: [],
            videoProps: {
                firstNodeStart: 0,
                lastNodeEnd: null
            },
            steps: [
                
            ],
            createStepProps: {
                startIndex: null,
                endIndex: null,
                start: null,
                end: null,
                stepName: "",
                stepDescription: ""
            }
        }
    }

    componentDidMount() {
        
    }

    videoDuration(time) {
        
        this.setState(state => ({
            videoProps: {
                ...state.videoProps,
                lastNodeEnd: time
            },
            createStepProps: {
                startIndex: 0,
                endIndex: 1,
                start: 0,
                end: time,
            }
        }));
        
        this.setRangeNodes();

    }

    setRangeNodes() {

        let initialNodes = _.map(this.state.videoProps, (videoProp) => {
            return videoProp
        });



        this.setState(state => ({ 

            rangeSliderNodes: initialNodes

        }));

    }

    onSliderChange(value) {

        this.setState({
            rangeSliderNodes: value
        });

      }      

    seekVideo(time) {
        this.player.seekTo(time);
    }

    updateStartTime(value) {
        this.setState(state => ({ 
            createStepProps: {
                ...state.createStepProps,
                start: value
            }
        }));
    }

    updateEndTime(value) {
        this.setState(state => ({ 
            createStepProps: {
                ...state.createStepProps,
                end: value
            }
        }));
    }

    createHandle(props) {

        const { value, dragging, index, ...restProps } = props;

        console.log(props)

        if(dragging && index === this.state.createStepProps.startIndex) {
            this.seekVideo(value);
            this.updateStartTime(value);
        }

        if(dragging && index === this.state.createStepProps.endIndex) {
            this.seekVideo(value);
            this.updateEndTime(value);
        }

        return (

        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
            >
            <Handle value={value} {...restProps} />
        </Tooltip>

        )


    }

    ref = player => {
        this.player = player
    }

    setVideoPlayback(e) {
        this.setState({ 
            isPlaying: true
         });
    }

    makeTime(time) {
        var hr = ~~(time / 3600);
        var min = ~~((time % 3600) / 60);
        var sec = time % 60;
        var sec_min = "";
        if (hr > 0) {
           sec_min += "" + hr + ":" + (min < 10 ? "0" : "");
        }
        sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
        sec_min += "" + sec;
        return sec_min;
     }

     updateStepInputs(event) {

        let { value } = event.target;

        if(event.target.name === "name") {
            this.setState(state => (
                { 
                    createStepProps: {
                        ...state.createStepProps, 
                        stepName: value 
                    } 
                }));
        }

        if(event.target.name === "description") {
            this.setState(state => (
                { 
                    createStepProps: { 
                        ...state.createStepProps,
                        stepDescription: value 
                    } 
                }));
        }

    }

    renderSteps() {

        return (
            _.map(this.state.steps, (step, index) => {
                return (
                    <div key={index}>
                        <ListItem>
                            <ListItemIcon className="step-icon">
                                <Avatar className="step-avatar">{index + 1}</Avatar>
                            </ListItemIcon>
                            <ListItemText inset primary={step.name} secondary={step.description} />
                        </ListItem>
                        <ListItem>
                            <ListItemText className="maker-created-step-times">
                                <Typography variant="subheading">
                                    <span style={{ color: "#607D8B" }}>Start:</span> {this.makeTime(step.start)}
                                </Typography>
                                <Typography variant="subheading">
                                    <span style={{ color: "#607D8B" }}>End:</span> {this.makeTime(step.end)}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <Divider light />
                    </div>
                )
            })
        )   
    }

    createStep() {
        this.setState(state => ({
            steps: [...this.state.steps, 
                { 
                    name: this.state.createStepProps.stepName,
                    description: this.state.createStepProps.stepDescription,
                    start:this.state.createStepProps.start,
                    end: this.state.createStepProps.end
                } 
            ],
            createStepProps: {
                ...state.createStepProps,
                stepName: "",
                stepDescription: "",
                start: state.createStepProps.end,
                end: state.videoProps.lastNodeEnd,
                startIndex: state.createStepProps.startIndex + 1,
                endIndex: state.createStepProps.endIndex + 1
            },
            rangeSliderNodes: [ ...state.rangeSliderNodes, this.state.videoProps.lastNodeEnd ],

        }));

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
                                onDuration={(e) => this.videoDuration(e)}
                            />
                        </div>
                        <Grid item xs={12}>
                            <Card style={{ boxShadow: "none" }}>
                                <CardContent>
                                    <Typography variant="title">
                                        Step Details
                                    </Typography>

                                    <div style={{ padding: "20px 6px 0 6px" }}>
                                        <Range handle={(e) => this.createHandle(e)}
                                            allowCross={false} 
                                            value={this.state.rangeSliderNodes} 
                                            onChange={(e) => this.onSliderChange(e)} 
                                            // onAfterChange={(e) => this.setVideoPlayback(e)}
                                            max={ this.state.videoProps.lastNodeEnd } 
                                            min={0}
                                        />
                                    </div>
                                    
                                    <div className="step-card-details">
                                        <TextField
                                            name="name"
                                            label="Name"
                                            fullWidth
                                            value={this.state.createStepProps.stepName}
                                            onChange={this.updateStepInputs.bind(this)}
                                        />
                                        <TextField
                                            name="description"
                                            label="Description"
                                            multiline
                                            fullWidth
                                            value={this.state.createStepProps.stepDescription}
                                            onChange={this.updateStepInputs.bind(this)}
                                        />
                                        <div className="step-card-timestamps">
                                            <div>
                                                <Typography variant="subheading" align="left">
                                                    <span style={{ color: "#607D8B" }}>Start:</span> {this.makeTime(this.state.createStepProps.start)}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="subheading" align="right">
                                                    <span style={{ color: "#607D8B" }}>End:</span> {this.makeTime(this.state.createStepProps.end)}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    { 
                                        (this.state.createStepProps.stepName && this.state.createStepProps.stepDescription) ?
                                        <Button size="small" color="primary" onClick={this.createStep.bind(this)}>Create Step</Button>
                                        :
                                        <Button size="small" color="primary" disabled>Create Step</Button>
                                    }
                                    
                                </CardActions>
                            </Card>
                        </Grid>
                        <Divider light/>
                        <Grid item xs={12}>
                            <List 
                                component="div"
                                disablePadding
                                className="step-list-single"   
                                >
                                { this.renderSteps() }
                            </List>
                        </Grid>             
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default VideoMaker;