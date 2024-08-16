import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import iconImage from '/icon-rectangle.png';
import closetImage from '../../assets/icons/closet_icon.png';
import notificationImage from '../../assets/icons/notification_icon.png';
import Notification from './Notification';
import { getNotificationsList } from '../../api/notification/notification';
import useUserStore from '../../data/lookbook/userStore';

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const memberId = useUserStore((state) => state.userId);
  const showModal = useUserStore((state) => state.showModal);
  const setShowModal = useUserStore((state) => state.setShowModal);

  const navigate = useNavigate();

  useEffect(() => {
    if (showModal && memberId) {
      const fetchNotifications = async () => {
        try {
          const notificationsData = await getNotificationsList(memberId);
          setNotifications(notificationsData);
        } catch (error) {
          // console.error('알림 목록 가져오는 중 에러 발생', error);
        }
      };

      fetchNotifications();
    }
  }, [showModal, memberId]);

  const handleNotificationClick = async () => {
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
        setNotifications={setNotifications}
      />
    </>
  );
};

export default Header;
