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

  // Inline styles
  const styles = {
    tagWrapper: {
      position: 'absolute',
      background: '#f8f8f8',
      padding: '5px',
      color: '#777777',
      fontWeight: 'bold',
      borderBottomRightRadius: '4px',
    },
    nameTag: {
      margin: 0,
    },
    streamComponentWrapper: {
      position: 'relative',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.streamComponentWrapper}>
      {streamManager && (
        <>
          <div style={styles.tagWrapper}>
            <p style={styles.nameTag}>{nicknameTag}</p>
          </div>
          <OpenViduVideoComponent streamManager={streamManager} />
        </>
      )}
    </div>
  );
};

export default UserVideoComponent;
