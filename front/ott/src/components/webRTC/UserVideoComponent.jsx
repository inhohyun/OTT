import React, { useMemo } from 'react';
import OpenViduVideoComponent from './OpenViduVideoComponent';

const UserVideoComponent = ({ streamManager }) => {
  const getNicknameTag = useMemo(() => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }, [streamManager]);

  // Inline styles
  const styles = {
    tagWrapper: {
      position: 'absolute',
      background: '#f8f8f8',
      paddingLeft: '5px',
      paddingRight: '5px',
      color: '#777777',
      fontWeight: 'bold',
      borderBottomRightRadius: '4px',
    },
    userHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '3px solid neonGreen',
    },
    nameTag: {
      margin: 0,
    },
    streamComponentWrapper: {
      marginRight: '20px',
    },
    streamComponent: {},
  };

  return (
    <div style={styles.streamComponentWrapper}>
      {streamManager !== undefined ? (
        <div style={styles.streamComponent}>
          <div style={styles.tagWrapper}>
            <div style={styles.nameTag}>{getNicknameTag}</div>
          </div>
          <OpenViduVideoComponent streamManager={streamManager} />
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
