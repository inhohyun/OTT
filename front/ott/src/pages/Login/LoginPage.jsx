import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion
import mainIcon from '../../assets/icons/mini_main.logo.png';
// import FaceComponent from '../../components/login/3DFace'; // 3D 얼굴 컴포넌트 import
import kakao from '../../assets/images/login/kakao_login.png';
import naver from '../../assets/images/login/naver_login.png';
import google from '../../assets/images/login/google_login.png';
import backgroundImage from '../../assets/images/background_image_survey.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const onKakaoLoginClick = useCallback(() => {
    // navigate('./');
    window.location.href =
      'https://i11c205.p.ssafy.io/oauth2/authorization/kakao';
  }, [navigate]);

  const onNaverLoginClick = useCallback(() => {
    // navigate('/survey_start');
    window.location.href =
      'https://i11c205.p.ssafy.io/oauth2/authorization/naver';

    // axios
    //   .get('https://i11c205.p.ssafy.io/oauth2/authorization/naver', {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     alert(JSON.stringify(res.data));
    //   })
    //   .catch((error) => alert(error));
    //여기에 추가
  }, [navigate]);

  const onGoogleLoginClick = useCallback(() => {
    // navigate('./survey_start');
    window.location.href =
      'https://i11c205.p.ssafy.io/oauth2/authorization/google';
  }, [navigate]);

  return (
    <div
      className="w-full h-full flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-[600px] h-[852px] relative flex flex-col items-center bg-cover bg-no-repeat bg-center"
      >
        <motion.div
          className="mt-16 w-[116px] h-[116px]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* FaceComponent 사용하여 3D 얼굴 렌더링 */}
          {/* <FaceComponent imgUrl={mainIcon} /> */}

          <img
            className="w-full h-full rounded-full"
            alt="메인 아이콘"
            src={mainIcon}
          />
        </motion.div>
        <motion.div
          className="mt-8 text-center text-[31.3px] text-gray font-zen-kaku-gothic-antique"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <b className="block tracking-[-0.5px] leading-[37.5px]">
            <p>당신만의 온라인</p>
            <p>옷 관리 서비스</p>
          </b>
          <motion.div
            className="mt-4 text-[16px] leading-[28.16px] text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p>가지고 있는 옷 관리부터 스타일 조합,</p>
            <p>친구들의 추천까지 전부 받아보세요</p>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-24 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="mb-4">
            <img
              className="rounded-md w-[350px] h-[45px] cursor-pointer"
              alt="카카오 로그인"
              src={kakao}
              onClick={onKakaoLoginClick}
            />
          </div>
          <div className="mb-4">
            <img
              className="rounded-md w-[350px] h-[45px] cursor-pointer"
              alt="네이버 로그인"
              src={naver}
              onClick={onNaverLoginClick}
            />
          </div>
          <div>
            <img
              className="rounded-md w-[350px] h-[45px] cursor-pointer"
              alt="구글 로그인"
              src={google}
              onClick={onGoogleLoginClick}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
