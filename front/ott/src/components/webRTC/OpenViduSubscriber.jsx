import { useEffect, useRef } from 'react';

const OpenViduSubscriber = ({ streamManager }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <div ref={videoRef} className="video-container"></div>;
};

export default OpenViduSubscriber;
