import React, { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import VideoControlPanel from './VideoControlPanel';
import VideoGrid from './VideoGrid';

// const APPLICATION_SERVER_URL = 'http://localhost:4443/';
// const APPLICATION_SERVER_URL = 'https://i11c205.p.ssafy.io/';
const APPLICATION_SERVER_URL = 'https://i11c205.p.ssafy.io/openvidu/';

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
    const initOV = new OpenVidu(); // OpenVidu 객체 생성
    setOV(initOV);
    const tempSession = initOV.initSession(); // 세션 초기화
    setSession(tempSession);

    window.addEventListener('beforeunload', onbeforeunload); // 창이 닫히기 전에 leaveSession 호출

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
      leaveSession(tempSession); // 컴포넌트 언마운트 시 세션 떠나기
    };
  }, []);

  useEffect(() => {
    if (session && OV) {
      joinSession(session); // 세션 참여
    }
  }, [session, OV]);

  const onbeforeunload = () => {
    leaveSession(); // 창이 닫히기 전에 세션을 떠나기 위한 함수
  };

  const joinSession = async (session) => {
    if (!session || !OV) return;

    connect(session); // 세션에 연결

    try {
      const token = await getToken();
      console.log('Token created:', token);

      await session.connect(token, { clientData: myUserName });
      const newPublisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '480x320',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });

      session.publish(newPublisher); // 퍼블리셔가 세션에 자신의 화면을 게시

      const devices = await OV.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      const currentVideoDeviceId = newPublisher.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      const currentVideoDevice = videoDevices.find(
        (device) => device.deviceId === currentVideoDeviceId
      );

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
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((s) => s !== streamManager)
    );
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect(); // 세션에서 나가기
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
      publisher.publishVideo(!isVideoActive); // 카메라 온/오프 전환
      setIsCameraOn(!isVideoActive);
    }
  };

  const toggleMicrophone = () => {
    if (publisher) {
      const isAudioActive = publisher.stream.audioActive;
      publisher.publishAudio(!isAudioActive); // 마이크 온/오프 전환
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
            'Authorization': 'Basic ' + btoa('OPENVIDUAPP:MY_SECRET'),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.id;
    } catch (error) {
      console.error(
        'Error creating session:',
        error.response?.data || error.message
      );
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
      console.error(
        '토큰 생성에 오류 발생:',
        error.response?.data || error.message
      );
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
