import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homeIcon from '../../assets/icons/homeicon.png';
import searchIcon from '../../assets/icons/searchicon.png';
import fitIcon from '../../assets/icons/aiicon.png';
import camIcon from '../../assets/icons/webrtcicon.png';
import profileIcon from '../../assets/icons/profileicon.png';
import footerBackgroundImg from '../../assets/images/footer_background.png';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // Navigate to the corresponding page
    navigate(`/${buttonName}`);
  };

  useEffect(() => {
    // Reset the active button only when navigating to the closet page
    if (location.pathname === '/closet') {
      setActiveButton('');
    }
  }, [location.pathname]);

  return (
    <footer
      className="w-full p-4 relative flex justify-center items-center z-50"
      style={{
        backgroundImage: `url(${footerBackgroundImg})`,
        backgroundSize: 'cover', // Adjust the size here
        backgroundPosition: 'center bottom', // Adjust position as needed
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        bottom: 0,
        height: '100px', // Set a fixed height for the footer
        maxWidth: '390px', // Set a max-width for the footer
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div className="relative w-full flex justify-between items-center px-4" style={{ height: '100%' }}>
        <div
          className={`flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
            activeButton === 'mainpage' ? 'bg-violet-300 rounded-full' : ''
          }`}
          onClick={() => handleButtonClick('mainpage')}
          style={{ marginTop: '30px', marginRight: '30px' }} // Adjust marginRight for positioning
        >
          <img src={homeIcon} alt="Home" className="w-6 h-6" />
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
            activeButton === 'search' ? 'bg-violet-300 rounded-full' : ''
          }`}
          onClick={() => handleButtonClick('search')}
          style={{ marginTop: '10px', marginRight: '30px' }} // Adjust marginRight for positioning
        >
          <img src={searchIcon} alt="Search" className="w-6 h-6" />
        </div>
        <div
          className="flex flex-col items-center bg-violet-500 rounded-full cursor-pointer w-12 h-12 justify-center"
          onClick={() => handleButtonClick('fit')}
          style={{ marginBottom: '30px' }}
        >
          <img src={fitIcon} alt="Fit" className="w-8 h-8 mb-1" />
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
            activeButton === 'cam' ? 'bg-violet-300 rounded-full' : ''
          }`}
          onClick={() => handleButtonClick('cam')}
          style={{ marginTop: '10px', marginLeft: '30px' }} // Adjust marginLeft for positioning
        >
          <img src={camIcon} alt="Cam" className="w-6 h-6" />
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
            activeButton === 'userPage' ? 'bg-violet-300 rounded-full' : ''
          }`}
          onClick={() => handleButtonClick('userPage')}
          style={{ marginTop: '30px', marginLeft: '30px' }} // Adjust marginLeft for positioning
        >
          <img src={profileIcon} alt="userPage" className="w-6 h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
