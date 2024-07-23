import GlobalStyle from './styles/GlobalStyles';
import Layout from './styles/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/tailwind.css'
import Login from './pages/Login/Login'
import SurveyStart from './pages/Survey/SurveyStart';
import SurveyIng from './pages/Survey/SurveyIng';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Router> 
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/survey_start" element={<SurveyStart />} />
            <Route path="/survey_ing" element={<SurveyIng />} />



          </Routes>
        </Router>     
      </Layout>
    </>
  );
}

export default App;
