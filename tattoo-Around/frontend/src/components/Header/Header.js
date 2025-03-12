// src/components/Header.js
import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  color: #fff;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;
