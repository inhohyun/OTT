import GlobalStyle from './styles/GlobalStyles';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom'; // Outlet 추가
import './styles/tailwind.css';
import Login from './pages/Login/LoginPage';
import SurveyStart from './pages/Survey/SurveyStart';
import SurveyIng from './pages/Survey/SurveyIng';
import MainPage from './pages/MainPage/MainPage';
import ClosetPage from './pages/Closet/ClosetPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import UpdatePage from './pages/UserPage/UpdatePage';
import SearchPage from './pages/Search/SearchPage';
import WebRTCPage from './pages/WebRTC/WebRTCPage';
import VideoChat from './pages/WebRTC/VideoChatPage';
import LookbookCreate from './pages/Create/LookbookCreatePage';
import UserPage from './pages/UserPage/UserPage';
import OAuthCallback from './pages/OAuth/OAuthCallback';
import UpdateLookbookPage from './pages/Create/UpdateLookbookPage';
import { CookiesProvider } from 'react-cookie';
import "./api/notification/pushNotification.js"; 
function App() {
  return (
    <>
      <CookiesProvider>
        <GlobalStyle /> {/* 전역 스타일 적용 */}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
            <Route path="/survey_start" element={<SurveyStart />} />
            <Route path="/survey_ing" element={<SurveyIng />} />
            <Route element={<CommonLayout />}>
              {' '}
              {/* 공통 레이아웃 적용 */}
              <Route path="/userPage" element={<UserPage />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/closet" element={<ClosetPage />} />
              <Route path="/UpdatePage" element={<UpdatePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/webrtc" element={<WebRTCPage />} />
              <Route path="/video-chat" element={<VideoChat />} />
              <Route path="/lookbookcreate" element={<LookbookCreate />} />
              <Route
                path="/update-lookbook/:id"
                element={<UpdateLookbookPage />}
              />
            </Route>
          </Routes>
        </Router>
      </CookiesProvider>
    </>
  );
}

// CommonLayout 컴포넌트 정의
const CommonLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet /> {/* 자식 라우트를 렌더링 */}
    </main>
    <Footer />
  </div>
);

export default App;
