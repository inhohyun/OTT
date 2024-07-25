import React, { useState } from 'react';
import FeedNoFollow from './FeedNoFollow';
import FeedFollow from './FeedFollow';

const Feed = ({ setActiveComponent }) => {
  const [showFeedFollow, setShowFeedFollow] = useState(false);

  const handleButtonClick = () => {
    setShowFeedFollow(true);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>o</button>
      {showFeedFollow ? (
        <FeedFollow setActiveComponent={setActiveComponent} />
      ) : (
        <FeedNoFollow setActiveComponent={setActiveComponent} />
      )}
    </div>
  );
};

export default Feed;
