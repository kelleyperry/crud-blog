import React, { Component } from 'react';
import Posts from './Posts';
import Post from './Post';
import { Route } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'Operator Mono';
    src: url('../fonts/Operator-Mono.ttf');
  }

  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #root {
    height: 100%
  }
`;

const StyledSection = styled.section`
	display: grid;
	height: 100%;
	grid-template-rows: 150px auto 150px;
	grid-template-areas: "header header header header" ". main main ." "footer footer footer footer";
	header {
		background: #ccc;
		grid-area: header;
	}

	main {
		grid-area: main;
		ul {
			margin: 0;
			padding: 0;
		}
	}
	footer {
		grid-area: footer;
		background: #ccc;
	}
`;

export class Layout extends Component {
	render() {
		return (
			<StyledSection id='page'>
				<header>Header</header>
				<main>
					<Route exact path='/' component={Posts} />
					<Route path='/posts/:id' component={Post} />
				</main>
				<footer>Footer</footer>
			</StyledSection>
		);
	}
}

export default Layout;
