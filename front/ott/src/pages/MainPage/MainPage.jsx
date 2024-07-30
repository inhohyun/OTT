import { useState, useEffect } from 'react';
import Recommend from '../../components/recommend/Recommend.jsx';
import MyLookbook from '../../components/mylookbook/MyLookbook';
import backgroundImage from '../../assets/images/background_image_main.png';
import FeedFollow from '../../components/feed/FeedFollow.jsx';
import FeedNoFollow from '../../components/feed/FeedNoFollow.jsx';

const NavBar = ({ activeComponent, setActiveComponent }) => {
  return (
    <nav className="flex justify-around w-full bg-white p-2 -mt-2">
      {['recommendation', 'feed', 'myLookbook'].map((comp, index) => (
        <button
          key={index}
          className={`bg-transparent border-none font-dohyeon text-slate-400 text-lg py-2 px-5 mx-1 sm:mx-3 cursor-pointer rounded-full ${
            activeComponent === comp ? 'bg-violet-200 text-slate-400' : ''
          }`}
          style={{ fontFamily: 'dohyeon' }}
          onClick={() => setActiveComponent(comp)}
        >
          {comp === 'recommendation'
            ? '추천'
            : comp === 'feed'
              ? '피드'
              : '내룩북'}
        </button>
      ))}
    </nav>
  );
};

const MainPage = () => {
  const [activeComponent, setActiveComponent] = useState('recommendation');

  const [hasFollow, setHasFollow] = useState(false);

  const checkUserFollowers = () => {
    const userHasFollowers = true;
    setHasFollow(userHasFollowers);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'recommendation':
        return <Recommend />;
      case 'feed':
        return hasFollow ? <FeedFollow /> : <FeedNoFollow />;
      case 'myLookbook':
        return <MyLookbook />;
      default:
        return <Recommend />;
    }
  };

  useEffect(() => {
    checkUserFollowers();
  }, []);

  return (
    <div
      className="relative flex flex-col items-center w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <NavBar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <div className="content w-full flex-grow box-border mb-20">
        {renderComponent()}
      </div>
    </div>
  );
};

export default MainPage;
