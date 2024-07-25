import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../../assets/icons/homeicon.png';
import searchIcon from '../../assets/icons/searchicon.png';
import fitIcon from '../../assets/icons/aiicon.png';
import camIcon from '../../assets/icons/webrtcicon.png';
import profileIcon from '../../assets/icons/profileicon.png';
import footerBackgroundImg from '../../assets/images/footer_background.png';

const Footer = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <footer
      className="w-full p-4 relative flex justify-center items-center z-50"
      style={{
        backgroundImage: `url(${footerBackgroundImg})`,
        backgroundSize: '390px 120px', // Customize the size here
        backgroundPosition: 'center bottom', // Adjust position as needed
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        bottom: 0,
        height: '100px', // Set a fixed height for the footer
      }}
    >
      <div className="relative w-full max-w-screen-lg mx-auto" style={{ height: '100px' }}>
        <div
          className={`absolute flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
            activeButton === 'home' ? 'bg-violet-300 rounded-full' : ''
          }`}
          onClick={() => handleButtonClick('home')}
          style={{ left: '330px', top: '35px' }} // Adjust left and top for positioning
        >
          <img src={homeIcon} alt="Home" className="w-6 h-6" />
        </div>
        <div
          className={`absolute flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
            activeButton === 'search' ? 'bg-violet-300 rounded-full' : ''
          }`}
          onClick={() => handleButtonClick('search')}
          style={{ left: '400px', top: '25px' }} // Adjust left and top for positioning
        >
          <img src={searchIcon} alt="Search" className="w-6 h-6" />
        </div>
        <div
          className="absolute flex flex-col items-center bg-violet-500 rounded-full cursor-pointer w-12 h-12 justify-center"
          onClick={() => handleButtonClick('fit')}
          style={{ left: '490px', top: '0' }} // Adjust left and top for positioning
        >
          <img src={fitIcon} alt="Fit" className="w-8 h-8 mb-1" />
        </div>
        <div
          className={`absolute flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
            activeButton === 'cam' ? 'bg-violet-300 rounded-full' : ''
          }`}
          onClick={() => handleButtonClick('cam')}
          style={{ left: '580px', top: '25px' }} // Adjust left and top for positioning
        >
          <img src={camIcon} alt="Cam" className="w-6 h-6" />
        </div>
        <div
          className={`absolute flex flex-col items-center cursor-pointer w-12 h-12 justify-center ${
            activeButton === 'profile' ? 'bg-violet-300 rounded-full' : ''
          }`}
          onClick={() => handleButtonClick('profile')}
          style={{ left: '650px', top: '35px' }} // Adjust left and top for positioning
        >
          <img src={profileIcon} alt="Profile" className="w-6 h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
