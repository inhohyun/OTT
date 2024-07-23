import { useState } from 'react';
import Recommend from '../../components/recommend/Recommend.jsx';
import Feed from '../../components/feed/Feed';
import MyLookbook from '../../components/mylookbook/MyLookbook';
import './MainPage.css'; // Import the CSS file

const NavBar = ({ activeComponent, setActiveComponent }) => {
  return (
    <nav className="nav">
      <button className={`nav-link ${activeComponent === 'recommendation' ? 'active' : ''}`} onClick={() => setActiveComponent('recommendation')}>
        추천
      </button>
      <button className={`nav-link ${activeComponent === 'feed' ? 'active' : ''}`} onClick={() => setActiveComponent('feed')}>
        피드
      </button>
      <button className={`nav-link ${activeComponent === 'myLookbook' ? 'active' : ''}`} onClick={() => setActiveComponent('myLookbook')}>
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
        return <Feed />;
      case 'myLookbook':
        return <MyLookbook />;
      default:
        return <Recommend />;
    }
  };

  return (
    <div className="MainPage">
      <NavBar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default MainPage;
