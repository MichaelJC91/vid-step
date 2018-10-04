import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import _ from "underscore";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import CardActions from '@material-ui/core/CardActions';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class VideoPlayer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: true,
            isPlaying: null,
            currentStep: {
                stepNumber: 1,
                stepTitle: "Prepare ingerdients",
                stepDescription: "The ingredients needed are: bread, banana, honey, and peanut butter.",
                stepTime: 17
            },
            steps: [
                {
                    stepNumber: 1,
                    stepTitle: "Prepare ingerdients",
                    description: "The ingredients needed are: bread, banana, honey, and peanut butter.",
                    startTime: 17,
                    endTime: 85
                },
                {
                    stepNumber: 2,
                    stepTitle: "Toast 1 slice of bread",
                    description: "Toast your bread until it's toasted to desired goldenness.",
                    startTime: 86,
                    endTime: 117
                },
                {
                    stepNumber: 3,
                    stepTitle: "Spread 1 tablespoon of peanut butter",
                    description: "Spread your desired amount of peanut butter over your bread.",
                    startTime: 117,
                    endTime: 138
                },
                {
                    stepNumber: 4,
                    stepTitle: "Place sliced banana on top",
                    description: "Place a 3x3 amount of banana on bread.",
                    startTime: 139,
                    endTime: 151
                },
                {
                    stepNumber: 5,
                    stepTitle: "Place on serving dish",
                    description: "Carefully place your bread on your dish in a presentable manner.",
                    startTime: 153,
                    endTime: 160
                },
                {
                    stepNumber: 6,
                    stepTitle: "Spoon honey over banana",
                    description: "Spoon 1 tablespoon of honey over your banana.",
                    startTime: 161,
                    endTime: 187
                }
            ]
        };
    }



    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    onStepClick = (time) => {
        this.player.seekTo(time);
        this.setState({ 
            isPlaying: true
         });
    }

    ref = player => {
        this.player = player
    }

    nextStep() {

        let currentStep = this.state.currentStep.stepNumber;
        let nextStep = currentStep + 1;

        _.map(this.state.steps, (step) => {
            if(nextStep === step.stepNumber) {
                this.setState(state => ({
                    currentStep: {
                        ...state.currentStep,
                        stepNumber: nextStep,
                        stepTitle: step.stepTitle,
                        stepDescription: step.description,
                    }
                }));

                this.onStepClick(step.startTime);
            }
        });
    }

    previousStep() {

        let currentStep = this.state.currentStep.stepNumber;
        let nextStep = currentStep - 1;

        _.map(this.state.steps, (step) => {
            if(nextStep === step.stepNumber) {
                this.setState(state => ({
                    currentStep: {
                        ...state.currentStep,
                        stepNumber: nextStep,
                        stepTitle: step.stepTitle,
                        stepDescription: step.description,
                    }
                }));

                this.onStepClick(step.startTime);
            }
        });
    }

    createList() {
        return (
            _.map(this.state.steps, ({ stepNumber, stepTitle, description, startTime }) => {
                return (
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit key={stepNumber}>
                        <List 
                            component="div"
                            disablePadding
                            className="step-list-single"
                            style={ stepNumber === this.state.currentStep.stepNumber ? { background: "#0eab55" } : { background: "none" } }   
                            >
                            <ListItem button onClick = {() => this.onStepClick(startTime)}>
                                <ListItemIcon className="step-icon">
                                    <Avatar className={ stepNumber === this.state.currentStep.stepNumber ? "current-step-avatar" : "step-avatar" }>{stepNumber}</Avatar>
                                </ListItemIcon>
                                <ListItemText className={ stepNumber === this.state.currentStep.stepNumber ? "current-step-font" : "" } inset primary={stepTitle} secondary={description} />
                            </ListItem>
                            <Divider light />
                        </List>
                    </Collapse>
                );
            })
        )
    }

    progressPlayed({ playedSeconds }) {

        let videoSeconds = Math.floor(playedSeconds)

        _.map(this.state.steps, (step) => {
            if(videoSeconds === step.startTime) {

                this.setState(state => ({
                    currentStep: {
                        ...state.currentStep,
                        stepNumber: step.stepNumber,
                        stepTitle: step.stepTitle,
                        stepDescription: step.description,
                    }
                }));
                
            }
        });

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
                                onProgress={ (e) => this.progressPlayed(e) }
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItem button onClick={this.handleClick}>
                            <ListItemText primary="How to make peanut butter toast" secondary="6 Steps" />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Divider light />
                        <div className="list-wrapper">
                            {this.createList()}
                        </div>
                        <Card className="video-card">
                            <CardHeader 
                                avatar = {
                                    <Avatar className="step-avatar">{ this.state.currentStep.stepNumber }</Avatar> 
                                }
                                title={this.state.currentStep.stepTitle}
                                subheader={this.state.currentStep.stepDescription}
                            />
                            <CardActions>
                                {
                                    this.state.currentStep.stepNumber === 1 ? 
                                    <Button size="small" disabled>
                                        Previous step
                                    </Button>
                                    :
                                    <Button size="small" color="primary" onClick={(e) => this.previousStep(e) }>
                                        Previous step
                                    </Button>
                                }
                                {
                                    this.state.currentStep.stepNumber === 6 ?
                                    <Button size="small" disabled>
                                        Next step
                                    </Button>
                                    :
                                    <Button size="small" color="primary" onClick={(e) => this.nextStep(e) }>
                                        Next step
                                    </Button>
                                }
                            </CardActions>
                            <Divider light />
                            <CardContent className="card-step-rating-wrapper">
                                <Typography variant="subheading">
                                    Was this step clear?
                                </Typography>
                            </CardContent>
                            <CardActions disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <ThumbUp />
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ThumbDown />
                                </IconButton>
                            </CardActions>
                            <Divider light />
                            <CardContent className="comment-section">
                                <Typography variant="subheading">
                                    Comments
                                </Typography>
                                <div className="add-comment">
                                    <Avatar className="card-avatar">M</Avatar>
                                    <Input
                                        placeholder="Add comment"
                                        multiline={true}
                                        style={{ flexGrow: 1 }}
                                    />
                                </div>
                            </CardContent>
                            <Divider light />
                            <CardContent className="comment-section">
                                <div className="single-comment">
                                    <Avatar className="card-avatar">M</Avatar>
                                    <div className="comment-content">
                                        <Typography variant="caption">
                                            Michael Carniato
                                        </Typography>
                                        <Typography paragraph={true}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                            <Divider light />
                            <CardContent className="comment-section">
                                <div className="single-comment">
                                    <Avatar className="card-avatar">P</Avatar>
                                    <div className="comment-content">
                                        <Typography variant="caption">
                                            Peter Reginald
                                        </Typography>
                                        <Typography paragraph={true}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }    
}

export default VideoPlayer;