import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddVideoIcon from '@material-ui/icons/VideoCall';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import _ from 'underscore';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

class Home extends Component {
    constructor(props) {
        super(props)
    }

    renderCards() {

        return(

            _.map([1, 2, 3, 4, 5], () => {
                
                return (

                    <Card style={{ marginBottom: 30 }}>
                        <Link to="/player" style={{ textDecoration: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                image="https://source.unsplash.com/ZPfd3ZobOc0/400x200"
                                title="How to make peanut butter toast"
                                style={{ height: 200 }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="title" component="h2">
                                        How to make peanut butter toast
                                    </Typography>
                                    <Typography component="p">
                                        Peanut butter toast is delicious and you can learn how to make it perfectly with this process.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </Card>

                )
            })
        )

        
    }


    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                            VidStep
                        </Typography>
                        <Link to="/maker">
                            <IconButton style={{ color: "#fff" }}>
                                <AddVideoIcon />
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={0} style={{ padding: 10 }}>
                    <Grid item xs={12}>
                        {this.renderCards()}
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default Home;