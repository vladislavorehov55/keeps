import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import './index.css'
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
</BrowserRouter>, document.getElementById('root'));