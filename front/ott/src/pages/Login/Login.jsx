import { useCallback } from "react";
import mainIcon from '../../assets/icons/main.logo.png';
import kakao from '../../assets/images/login/kakao_login.png';
import naver from '../../assets/images/login/naver_login.png';
import google from '../../assets/images/login/google_login.png';
import backgroundImage from '../../assets/images/background_image_survey.png';

const Login = () => {
  const onKakaoLoginClick = useCallback(() => {
    // Please sync "설문 실시 안내" to the project
  }, []);

  const onNaverLoginClick = useCallback(() => {
    // 네이버 로그인 클릭 시 동작
  }, []);

  const onGoogleLoginClick = useCallback(() => {
    // 구글 로그인 클릭 시 동작
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[600px] h-[852px] relative leading-[normal] tracking-[normal] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <section className="absolute top-[64px] w-[600px] h-[762px]">
          <div className="absolute top-[117px] left-[242px] w-[116px] h-[116px] z-[2]">
            <img
              className="absolute top-[0px] left-[0px] w-full h-full rounded-full"
              alt=""
              src={mainIcon}
            />
          </div>
        </section>
        <section className="absolute top-[347px] left-[13px] w-[574px] flex flex-col items-start justify-start gap-[23px] text-center text-[31.3px] text-gray font-zen-kaku-gothic-antique">
          <b className="self-stretch relative tracking-[-0.5px] leading-[37.5px] z-[2]">
            <p className="m-0">{`당신만의 온라인 `}</p>
            <p className="m-0">옷 관리 서비스</p>
          </b>
          <div className="self-stretch relative text-[16px] leading-[28.16px] text-black z-[2]">
            <p className="m-0">{`가지고 있는 옷 관리부터 스타일 조합, `}</p>
            <p className="m-0">친구들의 추천까지 전부 받아보세요</p>
          </div>
        </section>
        <div className="absolute top-[603px] left-[125px] flex flex-col items-center gap-[16px] z-[2]">
        <img
            className="rounded-md w-[350px] h-[45px] cursor-pointer"
            alt="카카오 로그인"
            src={kakao}
            onClick={onKakaoLoginClick}
          /> 
        <img
            className="rounded-md w-[350px] h-[45px] cursor-pointer"
            alt="네이버 로그인"
            src={naver}
            onClick={onNaverLoginClick}
          />
         
          <img
          className="rounded-md w-[350px] h-[45px] cursor-pointer"
          alt="구글 로그인"
          src={google}
          onClick={onGoogleLoginClick}
        />
          
         
        </div>
      </div>
    </div>
  );
};

export default Login;
