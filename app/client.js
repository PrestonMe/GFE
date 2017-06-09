import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router'
import App from './app';
require('./index.scss')

render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'))
