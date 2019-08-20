import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

import FriendList from './components/FriendList';
import Friend from './components/Friend';
import AddAFriend from './components/AddAFriend';
import EditAFriend from './components/EditAFriend';


const Wrapper = styled.div `
  width:100%;
  display:flex;
  flex-direction:column;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            activeFriend:null,
            postSuccessMessage: '',
            postError: '',

        }

    }
    componentDidMount() {
        axios.get('http://localhost:5000/friends')
            .then(res => {
                const friends = res.data;
                this.setState({ friends })
            })
    }


    postFriend = friend => {
        axios
            .post(`http://localhost:5000/friends`, {
                name: friend.name,
                age: friend.age,
                email: friend.email
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({
                    friends: res.data,
                    postError: '',
                    postSuccessMessage: res.statusText + res.config.data
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    postSuccessMessage: '',
                    postError: 'to err is human'
                });
            });
    };

    setUpdateForm = (e, friend) => {
      e.preventDefault();
      this.setState({ activeFriend: friend });
      this.props.history.push('/edit-friend');
    };

    updateFriend = friend => {
      axios
        .put(`http://localhost:5000/friends/${friend.id}`, {
            name: friend.name,
            age: friend.age,
            email: friend.email
        }

          )
        .then(res => {
          this.setState({ friends: res.data });
          this.props.history.push('/friend-list');
        })
        .catch(err => console.log(err));
    };    

  deleteFriend = (e, friend) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/friends/${friend.id}`)
      .then(res => {
        this.setState({ friends: res.data });
        this.props.history.push('/friends-list');
      })
      .catch(err => console.log(err));
  };


    render() {
        return (
            <Wrapper>
            <nav className="navbar">
             <h1>I have Friends</h1>
             <NavLink exact to="/">Home</NavLink>
             <NavLink exact to="/add-a-friend">Add a Friend</NavLink>
            </nav>
            <Route 
            exact 
            path="/" 
            component={(props) => <FriendList {...props} friends={this.state.friends} />} 
            />

          <Route
          path="/add-a-friend"
          render={
            props => 
            <AddAFriend 
            {...props} 
            postFriend={this.postFriend}
            postSuccessMessage={this.state.postSuccessMessage}
            postError={this.state.postError} 
            />
          }
        />
        <Route
        exact
        path="/friend-list"
        render={props => (
          <FriendList
          {...props}
          friends={this.state.friends}
          />
          )}
        />

        <Route
          path="/friend-list/:id"
          render={props => (
            <Friend
              {...props}
              deleteFriend={this.deleteFriend}
              setUpdateForm={this.setUpdateForm}
              friends={this.state.friends}
            />
          )}
        />  
        <Route
          path="/edit-friend"
          render={props => (
            <EditAFriend
              {...props}
              updateFriend={this.updateFriend}
              activeFriend={this.state.activeFriend}
            />
          )}
        />              
      </Wrapper>

        )
    }

}

export default App;

                 //<FriendList 
                  // friends={this.state.friends}
                  //  />

            // <EditAFriend
            //     putFriend={this.putFriend}
            //     putSuccessMessage={this.state.putSuccessMessage}
            //     putError={this.state.putError}
            //     />