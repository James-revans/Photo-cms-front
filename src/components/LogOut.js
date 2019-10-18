import React from 'react'

const buttonStyle = {
    position: 'absolute',
    top: '5%',
    right: '5%',
    color: 'black',
    background: 'none',
    fontSize: '15px',
    border: 'none',
}

export default function LogOut() {
    return (
        <div>
            <button onClick={() => {window.localStorage.clear(); window.location.reload()}} style={buttonStyle} className="home__log-out">Log Out</button>
        </div>
    )
}
