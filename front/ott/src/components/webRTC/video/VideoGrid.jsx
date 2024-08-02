import React, { useState } from 'react';
import UserVideoComponent from './UserVideoComponent';
import MainLogo from '../../../assets/icons/main.logo.png';

const VideoGrid = ({ mainStreamManager, subscribers }) => {
  const [isMainVideoFullScreen, setIsMainVideoFullScreen] = useState(false);

  const toggleMainVideoSize = () => {
    setIsMainVideoFullScreen(!isMainVideoFullScreen);
  };

  return (
    <div style={styles.videoContainer}>
      <div
        style={{
          ...styles.mainVideo,
          ...(isMainVideoFullScreen ? styles.fullScreen : {}),
        }}
        onClick={toggleMainVideoSize}
      >
        {mainStreamManager ? (
          <UserVideoComponent streamManager={mainStreamManager} />
        ) : (
          <div style={styles.placeholder}>로딩중...</div>
        )}
      </div>
      <div style={styles.subscribers}>
        {subscribers.length > 0 ? (
          subscribers.map((sub, i) => (
            <div key={i} style={styles.subscriber}>
              <UserVideoComponent streamManager={sub} />
            </div>
          ))
        ) : (
          <div style={styles.subscriber}>
            <img
              src={MainLogo}
              alt="Default Opponent"
              style={styles.defaultImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  videoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    padding: '10px',
    position: 'relative', // Ensure absolute positioning of fullScreen works
  },
  mainVideo: {
    width: '100px', // Default small width
    height: '100px', // Default small height
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: background for main video
    transition: 'all 0.3s ease', // Smooth transition
    cursor: 'pointer', // Indicate interactivity
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10, // Ensure it covers other elements
    marginRight: 0, // Reset margin in full screen mode
    borderRadius: 0, // Reset border-radius for full screen
  },
  subscribers: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    flex: '1 1 auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1, // Ensure it stays below fullScreen video
  },
  subscriber: {
    flex: '1 1 calc(50% - 10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '200px',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  placeholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: '#666',
    fontStyle: 'italic',
  },
  defaultImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default VideoGrid;
