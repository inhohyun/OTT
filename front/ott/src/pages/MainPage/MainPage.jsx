import { useState } from 'react';
import Recommend from '../../components/recommend/Recommend.jsx';
import Feed from '../../components/feed/Feed';
import MyLookbook from '../../components/mylookbook/MyLookbook';
import backgroundImage from '../../assets/images/background_image_main.png';

const NavBar = ({ activeComponent, setActiveComponent }) => {
  return (
    <nav className="flex justify-around w-full bg-white p-2 -mt-2">
      <button
        className={`bg-transparent border-none font-dohyeon text-slate-400 text-lg py-2 px-5 mx-1 sm:mx-3 cursor-pointer rounded-full ${
          activeComponent === 'recommendation'
            ? 'bg-violet-200 text-slate-400'
            : ''
        }`}
        style={{ fontFamily: 'dohyeon' }}
        onClick={() => setActiveComponent('recommendation')}
      >
        추천
      </button>
      <button
        className={`bg-transparent border-none font-dohyeon text-slate-400 text-lg py-2 px-5 mx-1 sm:mx-3 cursor-pointer rounded-full ${
          activeComponent === 'feed' ? 'bg-violet-200 text-slate-400' : ''
        }`}
        style={{ fontFamily: 'dohyeon' }}
        onClick={() => setActiveComponent('feed')}
      >
        피드
      </button>
      <button
        className={`bg-transparent border-none font-dohyeon text-slate-400 text-lg py-2 px-5 mx-1 sm:mx-3 cursor-pointer rounded-full ${
          activeComponent === 'myLookbook' ? 'bg-violet-200 text-slate-400' : ''
        }`}
        style={{ fontFamily: 'dohyeon' }}
        onClick={() => setActiveComponent('myLookbook')}
      >
        내룩북
      </button>
    </nav>
  );
};

const MainPage = () => {
  const [activeComponent, setActiveComponent] = useState('recommendation');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'recommendation':
        return <Recommend />;
      case 'feed':
        return <Feed setActiveComponent={setActiveComponent} />;
      case 'myLookbook':
        return <MyLookbook />;
      default:
        return <Recommend />;
    }
  };

  return (
    <div
      className="relative flex flex-col items-center w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
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
