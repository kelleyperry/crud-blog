import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import configureStore from './configureStore';
import App from './App';
import Layout from './Layout';
import Posts from './Posts';
import Post from './Post';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Route path='/' component={App} />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
