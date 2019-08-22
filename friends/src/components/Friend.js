import React from "react";
import styled from "styled-components";

const DeleteBtn = styled.button`
  background-color: red;
  border-radius: 50%;
  color: white;
  border: 2px solid red;
  font-weight: bold;
  padding: 2px 5px;
  margin-left: 10px;
  border: 2px solid red;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: red;
  }
`;

const FriendDiv = styled.div`
  margin: 15px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${DeleteBtn} {
    visibility: hidden;
  }

  &:hover ${DeleteBtn} {
    visibility: visible;
  }
`;

const Friend = ({ friend, deleteFriend }) => {
  return (
    <FriendDiv>
      {friend.name}, {friend.age}
      <DeleteBtn onClick={() => deleteFriend(friend)}>x</DeleteBtn>
    </FriendDiv>
  );
};

export default Friend;
