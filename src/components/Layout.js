import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Navigation from './Navigation';

// Стили компанентов
const Wrapper = styled.div`
  /* Можно применить в стилизованном компаненте стили медиазапросов */
  /* Таким образом, макет будет применяться только для экранов шириной 700 px и больше */
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  /* Again apply media query styles to screens above 700px */
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 64px);
    width: calc(100% - 220px);
  }
`;

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <Navigation />
        <Main>{children}</Main>
      </Wrapper>
    </React.Fragment>
  );
};

export default Layout;
