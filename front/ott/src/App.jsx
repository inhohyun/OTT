import GlobalStyle from './styles/GlobalStyles';
import Layout from './styles/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/tailwind.css'
import Login from './pages/Login/Login'

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />




          </Routes>
        </Router>     
      </Layout>
    </>
  );
}

export default App;
