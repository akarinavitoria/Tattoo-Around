// src/components/Layout/Layout.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styled from 'styled-components';

const Main = styled.main`
  margin: ${({ theme }) => theme.spacing.medium};
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default Layout;
