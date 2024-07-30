import { useEffect, useRef, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { useParams } from 'react-router-dom';

const VideoChatModal = () => {
  const { username } = useParams();
  const OV = useRef(null);
  const session = useRef(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    OV.current = new OpenVidu();
    session.current = OV.current.initSession();

    session.current.on('streamCreated', (event) => {
      const subscriber = session.current.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    session.current
      .connect('YOUR_TOKEN', { clientData: username })
      .then(async () => {
        let publisher = OV.current.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: '640x480', // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });

        setPublisher(publisher);
        session.current.publish(publisher);
      })
      .catch((error) => {
        console.error('There was an error connecting to the session:', error);
      });

    return () => {
      if (session.current) session.current.disconnect();
      OV.current = null;
      session.current = null;
    };
  }, [username]);

  return (
    <div className="relative flex flex-col items-center w-full h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Video Chat with {username}
      </h2>
      <div
        className="bg-white bg-opacity-70 rounded-lg shadow-md p-4"
        style={{ height: '50vh', width: '100%' }}
      >
        <div className="relative flex justify-center items-center h-full">
          <div className="w-1/2 h-full">
            <div
              id="publisher"
              className="h-full bg-gray-800 flex items-center justify-center rounded-lg overflow-hidden"
            >
              {publisher && <publisher.component />}
            </div>
          </div>
          <div className="w-1/2 h-full ml-4">
            {subscribers.map((sub, i) => (
              <div
                key={i}
                className="h-full bg-gray-800 flex items-center justify-center rounded-lg overflow-hidden mb-4"
              >
                {sub && <sub.component />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChatModal;
