// OpenViduPublisher.jsx
import React, { useEffect } from 'react';

const OpenViduPublisher = ({ publisher }) => {
  useEffect(() => {
    if (publisher) {
      publisher.addVideoElement(document.getElementById('publisher-video'));
    }
  }, [publisher]);

  return <div id="publisher-video" className="video-element"></div>;
};

export default OpenViduPublisher;
