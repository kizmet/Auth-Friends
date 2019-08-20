import React from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../actions';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from 'react-router-dom';
import FriendList2 from './FriendList_v1';
import Friend from './Friend';
import AddAFriend from './AddAFriend';
import EditAFriend from './EditAFriend';

const Wrapper = styled.div `
  width:100%;
  display:flex;
  flex-direction:column;
`;

class FriendsList extends React.Component {
  componentDidMount() {
    this.props.fetchFriends();
  }

  render() {
    const friends = this.props.friends;
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
            component={(props) => <FriendList2 {...props} friends={friends} />} 
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
          <FriendList2
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

const mapStateToProps = ({ error, friends, fetchingData }) => ({
  error,
  friends,
  fetchingData
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchFriends }
  )(FriendsList)
);
