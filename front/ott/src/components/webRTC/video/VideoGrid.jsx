import React, { useState } from 'react';
import UserVideoComponent from './UserVideoComponent';
import MainLogo from '../../../assets/icons/main.logo.png';

const VideoGrid = ({ mainStreamManager, subscribers }) => {
  const [isMainVideoFullScreen, setIsMainVideoFullScreen] = useState(false); // 메인 비디오의 전체 화면 여부 상태 관리

  const toggleMainVideoSize = () => {
    setIsMainVideoFullScreen(!isMainVideoFullScreen); // 메인 비디오의 크기를 전환
  };

  return (
    <div style={styles.videoContainer}>
      <div
        style={{
          ...styles.mainVideo,
          ...(isMainVideoFullScreen ? styles.fullScreen : {}), // 전체 화면 여부에 따라 스타일 변경
        }}
        onClick={toggleMainVideoSize} // 비디오 클릭 시 크기 전환
      >
        {mainStreamManager ? (
          <UserVideoComponent streamManager={mainStreamManager} /> // 메인 스트림 매니저가 있을 경우 비디오 컴포넌트 표시
        ) : (
          <div style={styles.placeholder}>로딩중...</div> // 메인 스트림 매니저가 없을 경우 로딩 메시지 표시
        )}
      </div>
      <div style={styles.subscribers}>
        {subscribers.length > 0 ? (
          subscribers.map((sub, i) => (
            <div key={i} style={styles.subscriber}>
              {/* 상대방 화면 표시 */}
              <UserVideoComponent streamManager={sub} />
            </div>
          ))
        ) : (
          <div style={styles.subscriber}>
            <img
              src={MainLogo}
              alt="Default Opponent"
              style={styles.defaultImage}
            /> {/* 상대방 없을 경우 기본 이미지 표시 */}
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
    position: 'relative',
  },
  mainVideo: {
    width: '100px',
    height: '100px',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    marginRight: 0, 
    borderRadius: 0, 
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
    zIndex: 1,
  },
  subscriber: {
    flex: '1 1 calc(45% - 10px)',
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
