import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
import Layout from './Layout';
import configureStore from './configureStore';

const store = configureStore();

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route path="/" component={Layout} />
				</Router>
			</Provider>
		);
	}
}
