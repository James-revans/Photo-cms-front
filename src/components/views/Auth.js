import React, { Component } from 'react'
import Create from '../auth/Create'
import Login from '../auth/Login'
import '../../styles/Auth.scss'

export default class Auth extends Component {
    state = {
        isTabSelected: 'login'
    }

    render() {

        return (
            <div className="auth">
                <div className="auth-form-wrapper">
                    <div className="auth__buttons">
                        <button onClick={() => this.setState({isTabSelected: 'login'})} className={"auth__buttons__login-btn " + (this.state.isTabSelected === 'login' && 'active')}>Login</button>
                        <button onClick={() => this.setState({isTabSelected: 'create'})} className={"auth__buttons__create-btn " + (this.state.isTabSelected === 'create' && 'active')}>Create</button>
                    </div>

                    <div className="auth__form-content">
                    {this.state.isTabSelected === 'create' ?
                        ( <Create/>)
                        :
                        ( <Login/> )
                    }
                    </div>
                </div>
            </div>
        )
    }
}
