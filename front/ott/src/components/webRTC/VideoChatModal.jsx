import React, { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';

const APPLICATION_SERVER_URL = 'http://i11c205.p.ssafy.io/';

const VideoSpace = ({ mySessionId, myUserName = '이정준' }) => {
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [loadOV, setLoadOV] = useState(true);
  const [OV, setOV] = useState(new OpenVidu());

  useEffect(() => {
    setOV(new OpenVidu());
    const temp = OV.initSession();
    setSession(temp);
    joinSessionNext(temp);
    window.addEventListener('beforeunload', onbeforeunload);

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
      console.log('오픈비두 종료');
      leaveSession(temp);
    };
  }, []);

  const onbeforeunload = () => {
    leaveSession();
  };

  const joinSessionNext = (session) => {
    const mySession = session;
    console.log(session);
    if (!mySession) {
      return;
    }

    // --- 4) 유효한 사용자 토큰으로 세션에 연결 ---
    connect(mySession);
    // OpenVidu 서버에서 토큰을 가져옵니다.
    getToken().then((token) => {
      console.log('Token created:', token); // Log the token
      // 첫 번째 매개변수는 OpenVidu 배포에서 가져온 토큰입니다. 두 번째 매개변수는 'streamCreated' 이벤트에서 모든 사용자가 검색할 수 있으며 사용자의 닉네임으로 DOM에 추가됩니다.
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // --- 5) 자신의 카메라 스트림을 가져옵니다 ---

          // 비디오 요소를 삽입하지 않도록 OpenVidu가 비디오 요소를 삽입하지 않도록 타겟 요소로 undefined를 전달하고 원하는 속성으로 퍼블리셔를 초기화합니다.
          let publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // 오디오 소스. undefined인 경우 기본 마이크 사용
            videoSource: undefined, // 비디오 소스. undefined인 경우 기본 웹캠 사용
            publishAudio: true, // 오디오를 음소거하지 않은 상태로 시작할지 여부
            publishVideo: true, // 비디오를 활성화된 상태로 시작할지 여부
            resolution: '640x480', // 비디오 해상도
            frameRate: 30, // 비디오 프레임 속도
            insertMode: 'APPEND', // 비디오가 'video-container' 타겟 요소에 삽입되는 방식
            mirror: false, // 로컬 비디오를 미러링할지 여부
          });

          // --- 6) 자신의 스트림을 퍼블리시 ---

          mySession.publish(publisher);

          // 사용 중인 현재 비디오 장치를 가져옵니다.
          const devices = await OV.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          // 페이지에서 메인 비디오를 설정하여 웹캠을 표시하고 퍼블리셔를 저장합니다.
          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        })
        .catch((error) => {
          console.log(
            '세션에 연결하는 중 오류가 발생했습니다:',
            error.code,
            error.message
          );
        });
    });
    setLoadOV(false);
  };

  const addSubs = (mySession, event) => {
    const subscriber = mySession.subscribe(event.stream, undefined);
    console.log('subscriber : ', subscriber);
    setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    return subscriber;
  };

  const connect = (mySession) => {
    // --- 3) 세션에서 이벤트가 발생할 때 수행할 작업 지정 ---
    if (!mySession) return;
    // 새로운 스트림이 수신될 때마다...
    mySession.on('streamCreated', (event) => {
      // 스트림을 구독하여 수신. 두 번째 매개변수는 undefined이므로 OpenVidu는 자체적으로 HTML 비디오를 생성 x.
      console.log('------생성 전', subscribers);
      const temp = addSubs(mySession, event);
      console.log(temp);
      console.log('------생성 후', subscribers);
    });

    // 스트림이 파괴될 때마다...
    mySession.on('streamDestroyed', (event) => {
      // 'subscribers' 배열에서 스트림 제거
      console.log('event', event);
      console.log('------파괴 전', subscribers);
      deleteSubscriber(event);
      console.log('------파괴 후', subscribers);
    });
  };

  const deleteSubscriber = (event) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((s) => s !== event.stream.streamManager)
    );
  };

  const leaveSession = (session) => {
    if (session) {
      session.disconnect();
      setOV(null);
      setSession(undefined);
      setSubscribers([]);
      setMainStreamManager(undefined);
      setPublisher(undefined);
    }
  };

  async function getToken() {
    const sessionId = await createSession(mySessionId);
    console.log(sessionId.id);
    return await createToken(sessionId.id);
  }

  const createSession = async (sessionId) => {
    const response = await axios
      .post(
        APPLICATION_SERVER_URL + 'api/sessions',
        {
          customSessionId: sessionId,
        },
        {
          headers: {
            'Authorization': 'Basic ' + btoa('OPENVIDUAPP:MY_SECRET'),
            'Content-Type': 'application/json',
          },
        }
      )
      .catch(async () => {
        return await axios.get(
          APPLICATION_SERVER_URL + 'api/sessions/' + sessionId,
          {
            headers: {
              'Authorization': 'Basic ' + btoa('OPENVIDUAPP:MY_SECRET'),
              'Content-Type': 'application/json',
            },
          }
        );
      });
    console.log('Session created:', response.data); // Log the session creation
    return response.data; // The sessionId
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
      // Log the token itself, not a WebSocket URL
      console.log('Token created:', response.data.token);
      return response.data.token;
    } catch (error) {
      console.error(
        'Error creating token:',
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // Inline styles
  const styles = {
    openViduWrapper: {
      padding: '15px',
      background: 'linear-gradient(#141e30, #243b55)',
    },
    videoContainer: {
      display: 'flex',
    },
    sessionsComponent: {
      display: 'flex',
      overflowX: 'scroll',
    },
    scrollbar: {
      width: '10px',
    },
    scrollbarThumb: {
      backgroundColor: 'gray',
      borderRadius: '10px',
      backgroundClip: 'padding-box',
      border: '2px solid transparent',
    },
    scrollbarTrack: {
      backgroundColor: '#d8dfd2',
      borderRadius: '10px',
      boxShadow: 'inset 0px 0px 5px white',
    },
    mainVideo: {},
  };

  return (
    <div style={styles.openViduWrapper}>
      {loadOV ? (
        console.log('loading...')
      ) : (
        <div style={styles.sessionsComponent}>
          {mainStreamManager !== undefined ? (
            <div style={styles.mainVideo}>
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div style={styles.videoContainer}>
            {subscribers.map((sub) => console.log(sub))}
            {subscribers.map((sub) => (
              <div key={sub.id}>
                <span>{sub.id}</span>
                <UserVideoComponent key={sub.id} streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSpace;
