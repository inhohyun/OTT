import React, { useMemo } from 'react';
import OpenViduVideoComponent from './OvVideo';

const UserVideoComponent = ({ streamManager }) => {
  // 닉네임 태그를 메모이제이션하여 불필요한 재계산 방지
  const nicknameTag = useMemo(() => {
    if (streamManager) {
      // streamManager에서 connection data를 파싱하여 clientData 가져오기
      return JSON.parse(streamManager.stream.connection.data).clientData;
    }
    return '';
  }, [streamManager]);

  // 스타일 객체 정의
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
      zIndex: 1, // 닉네임 태그가 다른 요소 위에 위치하도록 설정
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
      objectPosition: 'center', // 비디오 중앙을 기준으로 맞춤
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
