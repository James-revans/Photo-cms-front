import React, { Component } from 'react';
import '../../styles/Auth-form.scss';
import axios from 'axios';
import qs from 'querystring';


export default class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoginWrong: false
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
        this.setState({isLoginWrong: false})
        e.preventDefault();

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        axios.post('https://photo-cms2.herokuapp.com/api/login', {
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
            this.setState({isLoginWrong: true})
          })
      }
    render() {
        return (
            <div className="auth-form">
                <p>Login to an existing account</p>
                {this.state.isLoginWrong && <h6 className="auth-form__password-check">Username or password is incorrect.</h6>}

                <form onSubmit={this.handleSubmit}>
                    <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.updateEmailValue}></input>
                    <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.updatePasswordValue}></input>
                    <button type="submit" id="submit" value="Submit">Submit</button>
                </form>
            </div>
        )
    }


}
