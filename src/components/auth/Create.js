import React, { Component } from 'react'
import '../../styles/Auth-form.scss'

export default class Create extends Component {
    render() {
        return (
            <div className="auth-form">
                <p>Create a new user account</p>
                <form>
                    <input type="email" id="email" placeholder="Email"></input>
                    <input type="password" id="password" placeholder="Password"></input>
                    <input type="password" id="password2" placeholder="Confirm Password"></input>
                    <button type="submit" id="submit" value="Submit">Submit</button>
                </form>
            </div>
        )
    }
}
