import React, { useEffect, useRef, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import OpenViduPublisher from './OpenViduPublisher';
import OpenViduSubscriber from './OpenViduSubscriber';

const VideoChatModal = ({ username }) => {
  const OV = useRef(new OpenVidu());
  const session = useRef(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    session.current = OV.current.initSession();

    session.current.on('streamCreated', (event) => {
      const subscriber = session.current.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    // Replace YOUR_TOKEN with the actual token from your server
    session.current
      .connect('YOUR_TOKEN', { clientData: username })
      .then(() => {
        // Get user's media devices and publish
        OV.current
          .getUserMedia({ audioSource: undefined, videoSource: undefined })
          .then((stream) => {
            const publisher = OV.current.initPublisher(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: '640x480',
              frameRate: 30,
              insertMode: 'APPEND',
              mirror: false,
            });

            session.current.publish(publisher);
            setPublisher(publisher);
          })
          .catch((error) => {
            console.error(
              'There was an error getting the media devices:',
              error
            );
          });
      })
      .catch((error) => {
        console.error('There was an error connecting to the session:', error);
      });

    return () => {
      if (session.current) session.current.disconnect();
    };
  }, [username]);

  return (
    <div className="video-chat-modal">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {username}님과 영상통화중
      </h2>
      <div className="video-container">
        <div className="video-item">
          {publisher && <OpenViduPublisher publisher={publisher} />}
        </div>
        <div className="video-item">
          {subscribers.map((sub, i) => (
            <OpenViduSubscriber key={i} streamManager={sub} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoChatModal;
