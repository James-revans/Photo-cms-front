import React from 'react'

const buttonStyle = {
    color: 'black',
    margin: '0 auto',
    background: 'none',
    fontSize: '15px',
    border: 'none',
    paddingRight: '2px'

}

export default function LogOut() {
    return (
        <button onClick={() => {window.localStorage.clear(); window.location.reload()}} style={buttonStyle} className="home__log-out">Log Out</button>
    )
}
