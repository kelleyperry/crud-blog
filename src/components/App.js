import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';
import Posts from './Posts';

export default class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Route path='/' component={Layout} />
			</React.Fragment>
		);
	}
}
