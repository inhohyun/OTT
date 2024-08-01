import React, { useEffect, useRef } from 'react';

const OpenViduSubscriber = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video ref={videoRef} autoPlay={true} />;
};

export default OpenViduSubscriber;
