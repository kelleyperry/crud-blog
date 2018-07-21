import React, { Component } from 'react';
import Posts from './Posts';
import Post from './Post';
import { Route } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800');

  body, html {
		font-family: 'Nanum Gothic', sans-serif;
		font-weight: 400;
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
  grid-template-columns: 20% auto auto 20%;
  grid-template-areas: "header header header header" ". main main ." "footer footer footer footer";
  header {
    background: #ccc;
    grid-area: header;
  }

  main {
    grid-area: main;
    margin: 20px 0;
    ul {
      margin: 0;
      padding: 0;
    }
  }
  footer {
    grid-area: footer;
    background: #ccc;
  }
  header,
  footer {
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
          <div className='inner'>Header</div>
        </header>
        <main>
          <Route exact path='/' component={Posts} />
          <Route path='/posts/:id' component={Post} />
        </main>
        <footer>
          <div className='inner'>footer</div>
        </footer>
      </StyledSection>
    );
  }
}

export default Layout;
