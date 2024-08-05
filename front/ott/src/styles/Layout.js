// styles/Layout.js
import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
    box-shadow: none;
  }
`;

export default Layout;
