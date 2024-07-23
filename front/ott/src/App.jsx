import GlobalStyle from './styles/GlobalStyles';
import Layout from './styles/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/tailwind.css'
import Login from './pages/Login/Login'
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/mainpage' element={<MainPage />} />



          </Routes>
        </Router>     
      </Layout>
    </>
  );
}

export default App;
