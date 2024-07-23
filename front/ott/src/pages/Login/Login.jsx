import './Login.css';
import kakaoLoginImg from '../../assets/images/login/kakao_login.png'; // 이미지 경로 수정 필요

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">ㅇㅅㅅ</div>
        <h1>당신만의 온라인 옷 관리 서비스</h1>
        <p>가지고 있는 옷 관리부터 스타일 조합, 친구들의 추천까지 전부 받아보세요</p>
        <button className="kakao-login-button">
          <img src={kakaoLoginImg} alt="Kakao Login" />
          카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
