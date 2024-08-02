import React, { useMemo } from 'react';
import OpenViduVideoComponent from './OvVideo';

const UserVideoComponent = ({ streamManager }) => {
  // Memoize the nickname tag to avoid unnecessary recalculations
  const nicknameTag = useMemo(() => {
    if (streamManager) {
      return JSON.parse(streamManager.stream.connection.data).clientData;
    }
    return '';
  }, [streamManager]);

  const styles = {
    tagWrapper: {
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#f8f8f8',
      padding: '5px 10px',
      color: '#777777',
      fontWeight: 'bold',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
    },
    nameTag: {
      margin: 0,
      fontSize: '10px',
    },
    streamComponentWrapper: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center', // Ensure the middle of the video is centered
    },
  };

  return (
    <div style={styles.streamComponentWrapper}>
      {streamManager && (
        <>
          <div style={styles.tagWrapper}>
            <p style={styles.nameTag}>{nicknameTag}</p>
          </div>
          <OpenViduVideoComponent
            streamManager={streamManager}
            style={styles.video}
          />
        </>
      )}
    </div>
  );
};

export default UserVideoComponent;
