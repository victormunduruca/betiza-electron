import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ActivityCreator from './components/ActivityCreator';
import { DatePicker } from 'antd';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>

          <App />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
