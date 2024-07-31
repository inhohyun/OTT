import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconImage from '/icon-rectangle.png';
import closetImage from '../../assets/icons/closet_icon.png';
import notificationImage from '../../assets/icons/notification_icon.png';
import Notification from './Notification';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([
    { who: '이정준', what: '화상 채팅을 요청하셨습니다.', when: '방금 전' },
    { who: '박지민', what: '새로운 메시지가 도착했습니다.', when: '5분 전' },
    { who: '박지응', what: '친구 요청을 수락하셨습니다.', when: '10분 전' },
    { who: '김영희', what: '게시물에 댓글을 달았습니다.', when: '15분 전' },
    { who: '최철수', what: '게시물을 좋아합니다.', when: '20분 전' },
    { who: '이민수', what: '새로운 팔로워가 있습니다.', when: '25분 전' },
    { who: '김영수', what: '게시물을 공유했습니다.', when: '30분 전' },
  ]);

  const navigate = useNavigate();

  const handleNotificationClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClosetClick = () => {
    navigate('/closet');
  };

  const handleIconClick = () => {
    navigate('/mainpage');
  };

  return (
    <>
      <header className="w-full bg-white p-4 flex items-center justify-between relative">
        <div
          className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={handleIconClick}
        >
          <img src={iconImage} alt="icon image" className="w-40 h-12 mt-2" />
        </div>
        <div className="flex space-x-5 items-center ml-auto">
          <img
            src={closetImage}
            alt="closet go"
            className="w-6 h-6 mb-0.5 cursor-pointer"
            onClick={handleClosetClick}
          />
          <img
            src={notificationImage}
            alt="notification go"
            className="w-7 h-7 cursor-pointer"
            onClick={handleNotificationClick}
          />
        </div>
      </header>
      <Notification
        show={showModal}
        onClose={handleCloseModal}
        notifications={notifications}
        setNotifications={setNotifications} // Pass the state setter function
      />
    </>
  );
};

export default Header;
