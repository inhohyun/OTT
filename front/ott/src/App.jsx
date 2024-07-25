import GlobalStyle from "./styles/GlobalStyles";
import Layout from "./styles/Layout";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"; // Outlet 추가
import "./styles/tailwind.css";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserPage/UserProfile";
import SurveyStart from "./pages/Survey/SurveyStart";
import SurveyIng from "./pages/Survey/SurveyIng";
import MainPage from "./pages/MainPage/MainPage";
import ClosetPage from "./pages/Closet/ClosetPage";
import Header from './components/common/Header';
import Footer from "./components/common/Footer";

import UpdateProfile from './pages/UserPage/UpdateProfile';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<CommonLayout />}>
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/closet" element={<ClosetPage />} />
              <Route path="/userPage" element={<UserProfile />} />
              <Route path="/updateProfile" element={< UpdateProfile/>} />
            </Route>
            <Route path="/survey_start" element={<SurveyStart />} />
            <Route path="/survey_ing" element={<SurveyIng />} />
            
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