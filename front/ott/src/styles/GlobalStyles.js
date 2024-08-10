/* GlobalStyles.js */
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'dohyeon';
  src: url('../assets/fonts/BMDOHYEON_ttf.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body, #root {
    height: 100vh;
    max-width: 390px;
    margin: 0 auto;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    font-family: 'dohyeon', sans-serif; /* 여기서 폰트를 적용합니다 */
  }

  nav {
    font-family: 'dohyeon';
  }

  #root {
    width: 100%;
  }

  .user-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    font-family: 'dohyeon', sans-serif;
  }

  .user-page .container {
    width: 100%;
    max-width: 390px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .user-page .profile-image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-top: 20px;
  }

  .user-page .username {
    text-align: center;
    font-size: 1.25rem;
    color: rgba(0, 0, 0, 0.5);
    margin: 10px 0;
  }

  .user-page .settings-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-left: 10px;
  }

  .user-page .follow-button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .user-page .follow-button.following {
    background-color: violet;
    color: white;
  }

  .user-page .tags {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }

  .user-page .tag {
    background-color: violet;
    color: rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    border-radius: 20px;
    margin: 5px;
  }

  @media (max-width: 768px) {
    html, body, #root {
      max-width: 100%;
    }

    body {
      padding: 10px;
    }
  }
`;

export default GlobalStyle;
