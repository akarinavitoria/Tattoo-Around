// src/components/Button.js
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.primary : theme.colors.secondary};
  color: #fff;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin: ${({ theme }) => theme.spacing.small};

  &:hover {
    opacity: 0.9;
  }
`;

export default Button;
