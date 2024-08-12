import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import iconImage from '/icon-rectangle.png';
import closetImage from '../../assets/icons/closet_icon.png';
import notificationImage from '../../assets/icons/notification_icon.png';
import Notification from './Notification';
import { getNotificationsList, getLatestNotification } from '../../api/notification/notification';
import { getUid } from '../../api/user/user';


const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [latestNotification, setLatestNotification] = useState(null);
  const [memberId, setMemberId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const uidResponse = await getUid();
        const uid = uidResponse.data[0].id;
        setMemberId(uid);
      } catch (error) {
        console.error('member Id 가져오는 중 에러 발생:', error);
      }
    };

    fetchMemberId();
  }, [])

  useEffect(() => {
    if (!memberId) return;

    const intervalId = setInterval(async () => {
      try {
        const latestNotification = await getLatestNotification(memberId);
        if (latestNotification) {
          console.log(latestNotification)
          setNotifications((prevNotifications) => [
            latestNotification,
            ...prevNotifications,
          ]);
          setLatestNotification(latestNotification);
          setShowModal(true);
        }
      } catch (error) {
        console.error('최신 알림 받아오는데 에러 발생:', error);
      }
    }, 10000); // 10초마다

    return () => clearInterval(intervalId);
  }, [memberId]);

  const handleNotificationClick = async () => {
    setShowModal(true);

    try {
      if (memberId) {
        const notificationsData = await getNotificationsList(memberId);
        setNotifications(notificationsData);
      }
    } catch (error) {
      console.error('알림 전체 목록 불러오는 중 오류 발생:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLatestNotification(null);
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
      {latestNotification && (
        <Notification
          show={showModal}
          onClose={handleCloseModal}
          notifications={latestNotification ? [latestNotification, ...notifications] : notifications}
          setNotifications={setNotifications}
        />
      )}
    </>
  );
};

export default Header;
