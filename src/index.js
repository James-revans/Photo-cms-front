import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, combineReducers } from 'redux';
import { API_GET_PORTRAITS, API_GET_FAMILY, API_GET_EVENTS, API_GET_MISC, API_GET_RECENT } from './api-service';
import { Provider } from 'react-redux';
import portraitsReducer from './reducers/portraits-reducer';
import familyReducer from './reducers/family-reducer';
import eventsReducer from './reducers/events-reducer';
import miscReducer from './reducers/misc-reducer';
import recentReducer from './reducers/recent-reducer';

import updatePortraitsAction from './actions/portraits-actions';
import updateFamilyAction from './actions/family-actions';
import updateEventsAction from './actions/events-actions';
import updateMiscAction from './actions/misc-actions';
import updateRecentAction from './actions/recent-actions';


const allReducers = combineReducers({
    portraits: portraitsReducer,
    family: familyReducer,
    events: eventsReducer,
    misc: miscReducer,
    recent: recentReducer
}) 



// Getting all the images from mongodb and placing them in the store

API_GET_PORTRAITS().then((response) => {
    updatePortraitsAction.payload = response;
    store.dispatch(updatePortraitsAction);
})

API_GET_FAMILY().then((response) => {
    updateFamilyAction.payload = response;
    store.dispatch(updateFamilyAction);
})

API_GET_EVENTS().then((response) => {
    updateEventsAction.payload = response;
    store.dispatch(updateEventsAction);
})

API_GET_MISC().then((response) => {
    updateMiscAction.payload = response;
    store.dispatch(updateMiscAction);
})

API_GET_RECENT().then((response) => {
    updateRecentAction.payload = response;
    store.dispatch(updateRecentAction);
})

const store = createStore(
    allReducers, 
    {
        portraits: [],
        family: [],
        events: [],
        misc: [],
        recent: []
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


// import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
