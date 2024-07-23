import { useCallback } from "react";

const Login = () => {
  const onKakaoLoginClick = useCallback(() => {
    // Please sync "설문 실시 안내" to the project
  }, []);

  return (
    <div className="w-full h-[852px] relative leading-[normal] tracking-[normal]">
      
      <section className="absolute top-[64px] left-[0px] w-[393px] h-[762px]">
        <img
          className="absolute top-[0px] left-[0px] rounded-[27px] w-full h-full z-[1]"
        
          src="../../assets/images/background_image_survey.png"
        />
        <div className="absolute top-[117px] left-[138px] w-[116px] h-[116px] z-[2]">
          <img
            className="absolute top-[0px] left-[0px] w-full h-full"
            alt=""
            src="../../assets/icons/main.logo.png"
          />
          {/* <img
            className="absolute top-[50px] left-[30px] w-14 h-[18px] object-cover z-[1]"
            loading="lazy"
            alt=""
            src="/preview-3@2x.png"
          /> */}
        </div>
      </section>
      <section className="absolute top-[347px] left-[13px] w-[379.6px] flex flex-col items-start justify-start gap-[23px] text-center text-[31.3px] text-gray font-zen-kaku-gothic-antique">
        <b className="self-stretch relative tracking-[-0.5px] leading-[37.5px] z-[2]">
          <p className="m-0">{`당신만의 온라인 `}</p>
          <p className="m-0">옷 관리 서비스</p>
        </b>
        <div className="self-stretch relative text-[16px] leading-[28.16px] text-black z-[2]">
          <p className="m-0">{`가지고 있는 옷 관리부터 스타일 조합, `}</p>
          <p className="m-0">친구들의 추천까지 전부 받아보세요</p>
        </div>
      </section>
      <footer
        className="absolute top-[603px] left-[27px] rounded-md bg-gold w-[350px] flex flex-row items-start justify-start py-3 px-5 box-border cursor-pointer z-[2] text-left text-[14.5px] text-black font-reggae-one"
        onClick={onKakaoLoginClick}
      >
        <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0">
          <img
            className="w-[18px] h-[18px] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="../../assets/images/login/kakao_login.png"
          />
        </div>
        <div className="flex-1 flex flex-row items-start justify-center">
          <div className="relative inline-block min-w-[86px]">
            카카오 로그인
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
