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
class AddAFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //friend: {
                  name:'',
                  email: '',
                  age: ''
              //    }
        };
    }

  handleChange = event => {
    this.setState({ 
      //friend: {
        ...this.state,
        [event.target.name]: event.target.value
          //}


        });
  };

  postFriend = friend => {
    friend.preventDefault();
    //const friend = {name: this.state.name, email: this.state.email, age: this.state.age}
    this.props.postFriend({name: this.state.name, email: this.state.email, age: this.state.age});
  }    


    render() {
        return (
      
        <Form onSubmit={this.postFriend}>
          <label autosize= "false">
            Add a New Friend:
            </label>      
            <input 
            type="text" 
            name="name" 
            placeholder="Name"
            value={this.state.name} 
            onChange={this.handleChange} 
            />
            <input 
            type="text" 
            name="email" 
            placeholder="Email"
            value={this.state.email} 
            onChange={this.handleChange} 
            />
            <input 
            type="text" 
            name="age" 
            placeholder="Age"
            value={this.state.age} 
            onChange={this.handleChange} 
            />  
          {
            this.props.postError ? 
            (<div>{this.props.postError}</div>)
            : 
            null
          }
          {
            this.props.postSuccessMessage ? 
            (<div> {this.props.postSuccessMessage} </div>) 
            : 
            null
          }  
          <button type="submit">Add</button>
        </Form>
      
            )
    }
}

export default AddAFriend;