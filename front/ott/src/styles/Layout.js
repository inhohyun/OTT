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

  @media (max-width: 390px) {
    width: 100%;
  }

  @media (max-width: 390px) and (orientation: portrait) {
    width: 100%;
  }
`;

export default Layout;
