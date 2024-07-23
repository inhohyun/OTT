import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body, #root {
    height: 100%;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }
`;

export default GlobalStyle;
