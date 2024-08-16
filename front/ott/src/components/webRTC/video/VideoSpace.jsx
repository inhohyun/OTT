import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import VideoControlPanel from './VideoControlPanel';
import VideoGrid from './VideoGrid';

const APPLICATION_SERVER_URL = 'https://i11c205.p.ssafy.io/openvidu/';

const VideoSpace = () => {
  const location = useLocation();
  const { sessionId, userName } = location.state;

  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [OV, setOV] = useState(null); // OpenVidu 객체 상태 추가

  useEffect(() => {
    const OVInstance = new OpenVidu();
    setOV(OVInstance);
    const sessionInstance = OVInstance.initSession();
    setSession(sessionInstance);

    window.addEventListener('beforeunload', leaveSession);

    sessionInstance.on('streamCreated', (event) => {
      const subscriber = sessionInstance.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    sessionInstance.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
      leaveSession();
    };
  }, []);

  useEffect(() => {
    if (session && OV) {
      joinSession();
    }
  }, [session, OV]);

  const joinSession = async () => {
    try {
      const token = await getToken(sessionId);
      await session.connect(token, { clientData: userName });

      const publisherInstance = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '480x320',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });

      session.publish(publisherInstance);

      const devices = await OV.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      const currentVideoDeviceId = publisherInstance.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      const currentVideoDevice = videoDevices.find(
        (device) => device.deviceId === currentVideoDeviceId
      );

      setMainStreamManager(publisherInstance);
      setPublisher(publisherInstance);
    } catch (error) {
      // console.log('Error connecting to the session:', error);
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const deleteSubscriber = (streamManager) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((s) => s !== streamManager)
    );
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

  const getToken = async (sessionId) => {
    const sessionIdFromServer = await createSession(sessionId);
    return await createToken(sessionIdFromServer);
  };

  const createSession = async (sessionId) => {
    try {
      const response = await axios.post(
        `${APPLICATION_SERVER_URL}api/sessions`,
        { customSessionId: sessionId },
        {
          headers: {
            'Authorization': 'Basic ' + btoa('OPENVIDUAPP:MY_SECRET'),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.id;
    } catch (error) {
      // console.error('Error creating session:', error.response?.data || error.message);
      return sessionId;
    }
  };

  const createToken = async (sessionId) => {
    try {
      const response = await axios.post(
        `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connection`,
        {},
        {
          headers: {
            'Authorization': 'Basic ' + btoa('OPENVIDUAPP:MY_SECRET'),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.token;
    } catch (error) {
      // console.error('토큰 생성에 오류 발생:', error.response?.data || error.message);
      throw error;
    }
  };

  return (
    <div style={styles.openViduWrapper}>
      {session ? (
        <div style={styles.sessionsComponent}>
          <VideoGrid
            mainStreamManager={mainStreamManager}
            subscribers={subscribers}
          />
          <VideoControlPanel
            isCameraOn={isCameraOn}
            isMicOn={isMicOn}
            toggleCamera={toggleCamera}
            toggleMicrophone={toggleMicrophone}
            leaveSession={leaveSession}
          />
        </div>
      ) : (
        '통화가 종료되었습니다.'
      )}
    </div>
  );
};

const styles = {
  openViduWrapper: {
    padding: '5px',
    background: 'rgba(211, 211, 240, 0.3)',
    position: 'relative',
    borderRadius: '20px',
  },
  sessionsComponent: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
};

export default VideoSpace;
