
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App/>}/>
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
