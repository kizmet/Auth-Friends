import React from 'react';
import axios from 'axios'
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0 auto;  
    padding:0;
    max-width:480px;
    width:100%;
`;
class EditAFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          friend: this.props.activeFriend
        };
      }

        handleChange = ev => {
          ev.persist();
          let value = ev.target.value;

          this.setState(prevState => ({
            friend: {
              ...prevState.friend,
              [ev.target.name]: value
            }
          }));
        };

        handleSubmit = e => {
          e.preventDefault();
          this.props.updateFriend(this.state.friend);
        };
      


    render() {
        return (
      
        <Form onSubmit={this.handleSubmit}>
          <label autosize= "false">
            Change New Friend:
            </label>      
            <input 
            type="text" 
            name="name" 
            placeholder="Name"
            value={this.state.friend.name} 
            onChange={this.handleChange} 
            />
            <input 
            type="text" 
            name="email" 
            placeholder="Email"
            value={this.state.friend.email} 
            onChange={this.handleChange} 
            />
            <input 
            type="text" 
            name="age" 
            placeholder="Age"
            value={this.state.friend.age} 
            onChange={this.handleChange} 
            />  
          {
            this.props.postError ? 
            (<div> {this.props.postError} </div>)
            : 
            null
          }
          {
            this.props.postSuccessMessage ? 
            (<div> {this.props.postSuccessMessage} </div>) 
            : 
            null
          }  
          <button type="submit">Edit</button>
        </Form>
      
            )
    }
}

export default EditAFriend;