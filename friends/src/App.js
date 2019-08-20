import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Link} from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/FriendsList';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/friendslist" component={FriendsList} />
        </div>
      </Router>
    );
  }
}

export default App;
