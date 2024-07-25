import GlobalStyle from "./styles/GlobalStyles";
import Layout from "./styles/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/tailwind.css";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserPage/UserProfile";
import SurveyStart from "./pages/Survey/SurveyStart";
import SurveyIng from "./pages/Survey/SurveyIng";
import MainPage from "./pages/MainPage/MainPage";
import ClosetPage from "./pages/Closet/ClosetPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/userPage" element={<UserProfile />} />
            <Route path="/survey_start" element={<SurveyStart />} />
            <Route path="/survey_ing" element={<SurveyIng />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/closet" element={<ClosetPage />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;
