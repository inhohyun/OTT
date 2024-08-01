import React, { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';
import FinishCallIcon from '../../assets/icons/finishcallicon.png';
import CameraOnIcon from '../../assets/icons/cameraicon.png';
import CameraOffIcon from '../../assets/icons/cameraofficon.png';
import MicIcon from '../../assets/icons/micicon.png';
import MicOffIcon from '../../assets/icons/micofficon.png';

const APPLICATION_SERVER_URL = 'http://localhost:4443/';

const VideoSpace = ({ mySessionId, myUserName = '이정준' }) => {
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [OV, setOV] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  useEffect(() => {
    const initOV = new OpenVidu();
    setOV(initOV);
    const tempSession = initOV.initSession();
    setSession(tempSession);

    window.addEventListener('beforeunload', onbeforeunload);

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
      leaveSession(tempSession);
    };
  }, []);

  useEffect(() => {
    if (session && OV) {
      joinSession(session);
    }
  }, [session, OV]);

  const onbeforeunload = () => {
    leaveSession();
  };

  const joinSession = async (session) => {
    if (!session || !OV) return;

    connect(session);

    try {
      const token = await getToken();
      console.log('Token created:', token);

      await session.connect(token, { clientData: myUserName });
      const newPublisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });

      session.publish(newPublisher);
      const devices = await OV.getDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      const currentVideoDeviceId = newPublisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
      const currentVideoDevice = videoDevices.find((device) => device.deviceId === currentVideoDeviceId);

      setMainStreamManager(newPublisher);
      setPublisher(newPublisher);
      setCurrentVideoDevice(currentVideoDevice);
    } catch (error) {
      console.log('Error connecting to the session:', error);
    }
  };

  const connect = (mySession) => {
    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });
  };

  const deleteSubscriber = (streamManager) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((s) => s !== streamManager));
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const toggleCamera = () => {
    if (publisher) {
      const isVideoActive = publisher.stream.videoActive;
      publisher.publishVideo(!isVideoActive);
      setIsCameraOn(!isVideoActive);
    }
  };

  const toggleMicrophone = () => {
    if (publisher) {
      const isAudioActive = publisher.stream.audioActive;
      publisher.publishAudio(!isAudioActive);
      setIsMicOn(!isAudioActive);
    }
  };

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + 'api/sessions',
        { customSessionId: sessionId },
        {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:MY_SECRET'),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.id;
    } catch (error) {
      console.error('Error creating session:', error.response?.data || error.message);
    }
  };

  const createToken = async (sessionId) => {
    try {
      const response = await axios.post(
        `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connection`,
        {},
        {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:MY_SECRET'),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.token;
    } catch (error) {
      console.error('Error creating token:', error.response?.data || error.message);
      throw error;
    }
  };

  const styles = {
    openViduWrapper: {
      padding: '15px',
      background: 'linear-gradient(#141e30, #243b55)',
      position: 'relative',
      height: '100%',
    },
    videoContainer: {
      display: 'flex',
    },
    sessionsComponent: {
      display: 'flex',
      overflowX: 'scroll',
      position: 'relative',
    },
    mainVideo: {},
    controlIcons: {
      position: 'absolute',
      bottom: '5px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '30px',
    },
    icon: {
      width: '30px', // Adjust size
      height: '30px', // Adjust size
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.openViduWrapper}>
      {session ? (
        <div style={styles.sessionsComponent}>
          {mainStreamManager && (
            <div style={styles.mainVideo}>
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          )}
          <div style={styles.videoContainer}>
            {subscribers.map((sub, i) => (
              <div key={i}>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
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
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default VideoSpace;
