import React from 'react';
import FinishCallIcon from '../../../assets/icons/finishcallicon.png';
import CameraOnIcon from '../../../assets/icons/cameraicon.png';
import CameraOffIcon from '../../../assets/icons/cameraofficon.png';
import MicIcon from '../../../assets/icons/micicon.png';
import MicOffIcon from '../../../assets/icons/micofficon.png';

const VideoControlPanel = ({
  isCameraOn,
  isMicOn,
  toggleCamera,
  toggleMicrophone,
  leaveSession,
}) => {
  return (
    <div style={styles.controlIcons}>
      <img
        src={isCameraOn ? CameraOnIcon : CameraOffIcon}
        alt="Toggle Camera"
        onClick={toggleCamera}
        style={styles.icon}
      />
      <img
        src={isMicOn ? MicIcon : MicOffIcon}
        alt="Toggle Microphone"
        onClick={toggleMicrophone}
        style={styles.icon}
      />
      <img
        src={FinishCallIcon}
        alt="Finish Call"
        onClick={leaveSession}
        style={styles.icon}
      />
    </div>
  );
};

const styles = {
  controlIcons: {
    position: 'absolute',
    bottom: '20px',
    left: '18%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '7px',
  },
  icon: {
    width: '30px', // Adjust size
    height: '30px', // Adjust size
    cursor: 'pointer',
  },
};

export default VideoControlPanel;
