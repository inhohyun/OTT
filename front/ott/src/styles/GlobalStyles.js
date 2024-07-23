import { createGlobalStyle } from 'styled-components';
import './Fonts.css'; // 폰트 CSS 파일을 가져옵니다
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
    font-family: 'dohyeon', sans-serif; /* 여기서 폰트를 적용합니다 */
  }
`;

export default GlobalStyle;
