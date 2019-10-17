import React, { Component } from 'react'
import '../../styles/Auth-form.scss'
import axios from 'axios';


export default class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    constructor(props) {
        super(props)
        this.updateEmailValue = this.updateEmailValue.bind(this)
        this.updatePasswordValue = this.updatePasswordValue.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateEmailValue = (evt) => {
        this.setState({
            email: evt.target.value
        }); 
    }

    updatePasswordValue = (evt) => {
        this.setState({
            password: evt.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // let form_data = new FormData();
        // form_data.set('email', this.state.email);
        // form_data.set('password', this.state.password);
        axios.post('localhost:3000/api/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
      }
    render() {
        return (
            <div className="auth-form">
                <p>Login to an existing user account</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.updateEmailValue}></input>
                    <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.updatePasswordValue}></input>
                    <button type="submit" id="submit" value="Submit">Submit</button>
                </form>
            </div>
        )
    }


}
