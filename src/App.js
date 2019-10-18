import React from 'react';
import './App.scss';
import Home from './components/views/Home';
import Auth from './components/views/Auth'

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

export default function App() {
  return (
    // <Router>
      <div>
        {window.localStorage.token ?
        (<Home />)
        :
        (<Auth />)
        }

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

      </div>
    // </Router>
  );
}


{/* <Switch>
<Route path="/">
  

  </Route>
  <Route path="/home">
    

  </Route>
</Switch> */}


