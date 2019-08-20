import React from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../actions';
import Friend from './Friend';
import styled from 'styled-components';

const Wrapper = styled.div `
  width:100%;
  display:flex;
  flex-direction:column;
`;

class FriendsList extends React.Component {
  componentDidMount() {
    this.props.getFriends()
  }

  render() {
    return (
      this.props.friends.map(friend => <Friend key={friend.id} friend={friend} />)
    )
  }
}

const mapStateToProps = state => ({
  friends: state.friends
})

export default connect(mapStateToProps, { getFriends })(FriendsList)
