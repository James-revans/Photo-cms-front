import React, { Component } from 'react'
import '../../styles/Auth-form.scss'
import axios from 'axios'

export default class Create extends Component {
    state = {
        email: '',
        password: '',
        password2: '',
        isPassChecking: false,
        isEmailinUse: false,
        isGeneralError: false
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
    updatePassword2Value = (evt) => {
        this.setState({
            password2: evt.target.value
        });
    }

    handleSubmit = (e) => {
        this.setState({isPassChecking: false})
        this.setState({isEmailinUse: false})
        this.setState({isGeneralError: false})
        e.preventDefault();
        if(this.state.password === this.state.password2) {
            const config = {
                headers: {
                'Content-Type': 'application/json',
                },
            }
            axios.post('https://photo-cms.herokuapp.com/api/signup', {
                email: this.state.email,
                password: this.state.password
            }, config)
            .then((result) => {
                // Do somthing
                console.log(result)
                axios.post('https://photo-cms.herokuapp.com/api/login', {
                    email: this.state.email,
                    password: this.state.password
                }, config)
                .then((result) => {
                    if(result.data.token) {
                        localStorage.setItem("token", result.data.token)
                        localStorage.setItem("user", this.state.email)
                        window.location.reload()
                    }
                })
                .catch((err) => {
                    // Do somthing
                    console.log(err)
                    this.setState({isGeneralError: true})
                })
            })
            .catch((err) => {
                // Do somthing
                console.log(err)
                this.setState({isEmailinUse: true})
            })
        }
        else {
            this.setState({isPassChecking: true})
        }
      }



    render() {
        return (
            <div className="auth-form">
                <p>Create a new account</p>
                {this.state.isPassChecking && <h6 className="auth-form__password-check">Passwords do not match.</h6>}
                {this.state.isEmailinUse && <h6 className="auth-form__password-check">Email is already registered on another account.</h6>}
                {this.state.isGeneralError && <h6 className="auth-form__password-check">A server error has occurred. Please try again.</h6>}
                <form onSubmit={this.handleSubmit}>
                    <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.updateEmailValue}></input>
                    <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.updatePasswordValue}></input>
                    <input type="password" id="password2" placeholder="Confirm Password" value={this.state.password2} onChange={this.updatePassword2Value}></input>
                    <button type="submit" id="submit" value="Submit">Submit</button>
                </form>
            </div>
        )
    }
}
