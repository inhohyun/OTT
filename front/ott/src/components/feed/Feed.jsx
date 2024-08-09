import React, { useState, useEffect } from 'react';
import FeedNoFollow from './FeedNoFollow';
import FeedFollow from './FeedFollow';

const Feed = ({ setActiveComponent }) => {
  const [hasFollow, setHasFollow] = useState(false);

  const checkUserFollowers = () => {
    const userHasFollowers = false;
    setHasFollow(userHasFollowers);
  };

  useEffect(() => {
    checkUserFollowers();
  }, [hasFollow]);

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
