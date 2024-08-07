import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homeIcon from '../../assets/icons/homeicon.png';
import searchIcon from '../../assets/icons/searchicon.png';
import fitIcon from '../../assets/icons/aiicon.png';
import camIcon from '../../assets/icons/webrtcicon.png';
import profileIcon from '../../assets/icons/profileicon.png';
import footerBackgroundImg from '../../assets/images/footer_background.png';
import whiteX from '../../assets/icons/deleteicon.png';
import AiModal from './ai/AiModal';
const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  // 현재 떠있는 페이지에 해당하는 하단바에 선택 표시
  const getCurrentPage = () => {
    const path = location.pathname.slice(1);
    if (path) return path;
    return 'mainpage'; // 메인페이지를 기본 디폴트 페이지로 설정
  };

  const [activeButton, setActiveButton] = useState(getCurrentPage);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // 하단바의 아이콘 누르면 해당 아이콘 선택 처리
    navigate(`/${buttonName}`);
  };

  const handleXButtonClick = () => {
    navigate(-1); // 이전 페이지로 돌아가도록
  };

  useEffect(() => {
    // 옷장 페이지 접속했을 때에만 하단바 선택 상태 초기화
    if (location.pathname === '/closet') {
      setActiveButton('');
    } else {
      setActiveButton(getCurrentPage());
    }
  }, [location.pathname]);

  return (
    <>
      <footer
        className="w-full p-4 relative flex justify-center items-center z-50"
        style={{
          backgroundImage: `url(${footerBackgroundImg})`,
          backgroundSize: 'cover', // 하단바 이미지 크기
          backgroundPosition: 'center bottom', // 하단바 위치
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
          bottom: 0,
          height: '100px',
          maxWidth: '390px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          className="relative w-full flex justify-between items-center px-4"
          style={{ height: '100%' }}
        >
          <div
            className={`flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
              activeButton === 'mainpage' ? 'bg-violet-300 rounded-full' : ''
            }`}
            onClick={() => handleButtonClick('mainpage')}
            style={{ marginTop: '30px', marginRight: '30px' }}
          >
            <img src={homeIcon} alt="Home" className="w-6 h-6" />
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
              activeButton === 'search' ? 'bg-violet-300 rounded-full' : ''
            }`}
            onClick={() => handleButtonClick('search')}
            style={{ marginTop: '10px', marginRight: '30px' }}
          >
            <img src={searchIcon} alt="Search" className="w-6 h-6" />
          </div>
          <div
            className="flex flex-col items-center bg-violet-500 rounded-full cursor-pointer w-12 h-12 justify-center"
            onClick={
              activeButton === 'ai' ? handleXButtonClick : () => toggleModal()
            }
            style={{ marginBottom: '30px' }}
          >
            <img
              src={activeButton === 'ai' ? whiteX : fitIcon}
              alt="Fit"
              className="w-8 h-8 mb-1"
            />
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
              activeButton === 'webrtc' ? 'bg-violet-300 rounded-full' : ''
            }`}
            onClick={() => handleButtonClick('webrtc')}
            style={{ marginTop: '10px', marginLeft: '30px' }}
          >
            <img src={camIcon} alt="Cam" className="w-6 h-6" />
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
              activeButton === 'userPage' ? 'bg-violet-300 rounded-full' : ''
            }`}
            onClick={() => handleButtonClick('userPage')}
            style={{ marginTop: '30px', marginLeft: '30px' }}
          >
            <img src={profileIcon} alt="userPage" className="w-6 h-6" />
          </div>
        </div>
      </footer>
      <AiModal isOpen={isModalOpen} onClose={toggleModal} />{' '}
      {/* ai 모달 추가 */}
    </>
  );
};

export default Footer;
