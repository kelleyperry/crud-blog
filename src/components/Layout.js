import React, { Component } from 'react';
import Posts from './Posts';
import Post from './Post';
import * as palette from './Palette';
import { Route, NavLink } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800');
	@import url('https://fonts.googleapis.com/css?family=Averia+Serif+Libre');

  body, html {
		font-family: 'Nanum Gothic', sans-serif;
		font-weight: 400;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${palette.GREY};
    line-height: 1.5;
  }

	h1, h2, h3 {
		font-family: 'Averia Serif Libre', cursive;
    line-height: 1;
    color: ${palette.GREY};
        margin: 0 0 10px;
    a {
      text-decoration: none;
      color: #78a;
    }
	}

  h2 { 
    font-size: 40px;
    font-weight: 400;
  }

  #root {
    height: 100%
  }
`;

const StyledSection = styled.section`
  display: grid;
  height: 100%;
  grid-template-rows: 150px auto 150px;
  grid-template-columns: 20% auto auto 20%;
  grid-template-areas: "header header header header" ". main main ." "footer footer footer footer";
  header {
    border-bottom: 3px solid ${palette.RED};
    grid-area: header;
    .inner {
      nav {
        a {
          color: ${palette.YELLOW};
        }
      }
    }
  }

  main {
    grid-area: main;
    margin: 40px 0;
    ul {
      margin: 0;
      padding: 0;
    }
  }
  footer {
    border-top: 6px solid ${palette.RED}
    grid-area: footer;
  }
  header,
  footer {
    background: ${palette.GREY};
    color: ${palette.YELLOW};
    display: grid;
    height: 100%;
    grid-template-columns: 20% auto auto 20%;
    grid-template-areas: ". inner inner .";
    .inner {
      margin: 20px 0;
      grid-area: inner;
    }
  }
`;

export class Layout extends Component {
  render () {
    return (
      <StyledSection id='page'>
        <header>
          <div className='inner'>
            <nav>
              <NavLink activeClassName='selected' to='/'>
                Home
              </NavLink>
            </nav>
          </div>
        </header>
        <main>
          <Route exact path='/' component={Posts} />
          <Route path='/posts/:id' component={Post} />
        </main>
        <footer>
          <div className='inner'>
            <p>kelleyperry.com &copy; 2018</p>
          </div>
        </footer>
      </StyledSection>
    );
  }
}

export default Layout;
