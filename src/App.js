import React, { Component } from 'react';
import './App.css';
import VideoPlayer from './Video-Player';
import VideoMaker from './Video-Maker';
import Home from './Home';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>    
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/player" component={VideoPlayer} />
          <Route path="/maker" component={VideoMaker} />
        </div>    
      </Router>
    );
  }
}

export default App;
