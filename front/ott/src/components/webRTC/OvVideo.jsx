import React, { useRef, useEffect } from 'react';

const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  const videoStyles = {
    width: '250px',
    height: 'auto',
    border: 'none',
    borderRadius: '15px',
    display: 'inline-block',
  };

  return <video style={videoStyles} autoPlay ref={videoRef} />;
};

export default OpenViduVideoComponent;
