import React from 'react';
import FinishCallIcon from '../../../assets/icons/finishcallicon.png';
import CameraOnIcon from '../../../assets/icons/cameraicon.png';
import CameraOffIcon from '../../../assets/icons/cameraofficon.png';
import MicIcon from '../../../assets/icons/micicon.png';
import MicOffIcon from '../../../assets/icons/micofficon.png';

const VideoControlPanel = ({
  isCameraOn, // 카메라 상태
  isMicOn, // 마이크 상태
  toggleCamera, // 카메라 전환 함수
  toggleMicrophone, // 마이크 전환 함수
  leaveSession, // 통화 종료 함수
}) => {
  return (
    <div style={styles.controlIcons}>
      <img
        src={isCameraOn ? CameraOnIcon : CameraOffIcon} // 카메라 상태에 따른 아이콘 표시
        alt="Toggle Camera"
        onClick={toggleCamera} // 카메라 전환 함수 호출
        style={styles.icon}
      />
      <img
        src={isMicOn ? MicIcon : MicOffIcon} // 마이크 상태에 따른 아이콘 표시
        alt="Toggle Microphone"
        onClick={toggleMicrophone} // 마이크 전환 함수 호출
        style={styles.icon}
      />
      <img
        src={FinishCallIcon}
        alt="Finish Call"
        onClick={leaveSession} // 통화 종료 함수 호출
        style={styles.icon}
      />
    </div>
  );
};

// 스타일 정의 객체
const styles = {
  controlIcons: {
    position: 'absolute',
    bottom: '20px',
    left: '18%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '7px', // 아이콘 간의 간격
  },
  icon: {
    width: '30px', // 아이콘 너비
    height: '30px', // 아이콘 높이
    cursor: 'pointer', // 마우스 포인터가 아이콘 위에 있을 때 포인터로 변경
  },
};

export default VideoControlPanel;
