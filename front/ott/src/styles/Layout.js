import styled from 'styled-components';

const Layout = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  // padding: 20px;

  @media (max-width: 600px) {
    width: 100%;
  }

  @media (max-width: 600px) and (orientation: portrait) {
    width: 100vw;
  }
`;

export default Layout;
