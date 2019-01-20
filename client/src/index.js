import React from 'react';
import ReactDOM from 'react-dom';
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleProvider } from 'drizzle-react'
import StringStore from "./contracts/StringStore.json";
import WorkDone from "./contracts/WorkDone.json";
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import SetString from './components/SetString.js';

const options = { contracts: [StringStore, WorkDone] };

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
    <App drizzle={drizzle} />,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
