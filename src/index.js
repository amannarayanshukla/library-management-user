import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';



import {Provider} from 'react-redux';
import {searchRobots, fetchRobots} from "./reducers";
import './index.css';
import 'tachyons';
import App from './App';


const rootReducer = combineReducers({searchRobots,fetchRobots});

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);
