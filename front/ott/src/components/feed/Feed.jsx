import React, { useState, useEffect } from 'react';
import FeedNoFollow from './FeedNoFollow';
import FeedFollow from './FeedFollow';

const Feed = ({ setActiveComponent }) => {
  const [hasFollow, setHasFollow] = useState(false);

  const checkUserFollowers = () => {
    const userHasFollowers = true;
    setHasFollow(userHasFollowers);
  };

  useEffect(() => {
    checkUserFollowers();
  }, []);

  return (
    <div>
      {hasFollow ? (
        <FeedFollow setActiveComponent={setActiveComponent} />
      ) : (
        <FeedNoFollow setActiveComponent={setActiveComponent} />
      )}
    </div>
  );
};

export default Feed;
