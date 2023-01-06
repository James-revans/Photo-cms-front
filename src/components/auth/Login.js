import React, { Component } from 'react';
import '../../styles/Auth-form.scss';
import axios from 'axios';
import qs from 'querystring';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


export default class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoginWrong: false,
        isLoading: false,
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
        this.setState({isLoading: true})
        this.setState({isLoginWrong: false})
        e.preventDefault();

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        axios.post('https://photo-cms-api.onrender.com/api/login', {
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
            this.setState({isLoading: false})
          })
          .catch((err) => {
            // Do somthing
            console.log(err)
            this.setState({isLoading: false})
            this.setState({isLoginWrong: true})
          })
      }
    render() {
        return (
            <React.Fragment>
                {this.state.isLoading && 
                    <div className="login-loader">
                        <div className="login-loader__icon">
                            <Loader
                                type="TailSpin"
                                color="black"
                                height={100}
                                width={100}
                            />
                        </div>
                    </div>
                }
                <div className="auth-form">
                    <React.Fragment>
                        <p>Login to an existing account</p>
                        {this.state.isLoginWrong && <h6 className="auth-form__password-check">Username or password is incorrect.</h6>}
                    
                        <form onSubmit={this.handleSubmit}>
                            <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.updateEmailValue}></input>
                            <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.updatePasswordValue}></input>
                            <button type="submit" id="submit" value="Submit">Submit</button>
                        </form>

                    </React.Fragment>
                </div>
            </React.Fragment>


        )
    }


}
