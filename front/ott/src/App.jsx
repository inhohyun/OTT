import GlobalStyle from './styles/GlobalStyles';
import Layout from './styles/Layout';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom'; // Outlet 추가
import './styles/tailwind.css';
import Login from './pages/Login/LoginPage';
import UserProfile from './pages/UserPage/UserPage';
import SurveyStart from './pages/Survey/SurveyStart';
import SurveyIng from './pages/Survey/SurveyIng';
import MainPage from './pages/MainPage/MainPage';
import ClosetPage from './pages/Closet/ClosetPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SearchPage from './pages/Search/SearchPage';
import WebRTCPage from './pages/WebRTC/WebRTCPage';
import UpdateUserPage from './pages/UserPage/UpdatePage';
import AiPage from './pages/Ai/AiPage';

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
            <Route element={<CommonLayout />}>
              <Route path="/userPage" element={<UserProfile />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/closet" element={<ClosetPage />} />
              <Route path="/UpdateUserPage" element={<UpdateUserPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/webrtc" element={<WebRTCPage />} />
              <Route path="/ai" element={<AiPage />} />
            </Route>
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

// CommonLayout 컴포넌트 정의
const CommonLayout = () => (
  <>
    <Header />
    <Outlet /> {/* 자식 라우트를 렌더링 */}
    <Footer />
  </>
);

export default App;
