import React, { useEffect, useRef } from 'react';

const OpenViduPublisher = ({ publisher }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (publisher) {
      publisher.addVideoElement(videoRef.current);
    }
  }, [publisher]);

  return <video ref={videoRef} autoPlay={true} muted={true} />;
};

export default OpenViduPublisher;
