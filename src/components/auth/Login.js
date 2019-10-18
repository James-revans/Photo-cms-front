import React, { Component } from 'react';
import '../../styles/Auth-form.scss';
import axios from 'axios';
import qs from 'querystring';


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
        console.log(this.state.email)
    }

    updatePasswordValue = (evt) => {
        this.setState({
            password: evt.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        axios.post('http://localhost:3000/api/login', {
            email: this.state.email,
            password: this.state.password
        }, config)
        .then((result) => {
            // Do somthing
            console.log(result)
            if(result.data.token) {
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("user", this.state.email)
                window.location.reload()
            }

          })
          .catch((err) => {
            // Do somthing
            console.log(err)
          })
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
