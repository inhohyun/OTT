import React from 'react';
import UserVideoComponent from './UserVideoComponent';
import MainLogo from '../../../assets/icons/main.logo.png';

const VideoGrid = ({ mainStreamManager, subscribers }) => {
  return (
    <div style={styles.videoContainer}>
      <div style={styles.mainVideo}>
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
  },
  mainVideo: {
    width: '100px', // Fixed width
    height: '100px', // Fixed height
    marginRight: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: background for main video
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
  },
  subscriber: {
    flex: '1 1 calc(50% - 10px)', // Adjust size as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '200px', // Ensuring the height matches the mainVideo
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
