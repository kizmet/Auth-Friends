import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const FriendUl = styled.ul`  
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    margin: 0 auto;  
    padding:0;
    max-width:800px;
    width:100%;
    list-style: none;
    justify-content:center;
`;

const FriendLi = styled.li `
    display:flex;
    flex-direction:column;
    margin:4px;
    border:1px solid black;
    width:390px;
`;


const Friend = props => {
    // const friend = props.friends.find(
    //     person => `${person.id}` === props.match.params.id
    // );
    // if (!props.friends.length || !friend) {
    //     return <h2>Loading Friends</h2>;
    // }
    const friend = props.friend;
    return (
        <FriendUl>
        <FriendLi>
            <div>{friend.name}</div>
            <div>{friend.email}</div>
            <div>Age:{friend.age}</div>
              <button onClick={e => props.setUpdateForm(e, friend)} className="md-button">
                Update Friend
              </button>
              <button onClick={e => props.deleteFriend(e, friend)} className="md-button">
                Delete Friend
              </button>                        
        </FriendLi>
        </FriendUl>
        )
}

export default Friend;