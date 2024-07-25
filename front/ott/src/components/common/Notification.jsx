import { useState, useEffect } from 'react';

const Notification = ({ show, onClose, notifications }) => {
  const [visibleNotifications, setVisibleNotifications] = useState(4);

  useEffect(() => {
    if (!show) {
      setVisibleNotifications(4); // Reset to initial state when the modal is closed
    }
  }, [show]);

  if (!show) return null;

  const handleShowMore = () => {
    setVisibleNotifications(prev => prev + 4); // Show 4 more notifications
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-start pt-20 z-50"
    >
      <div className="backdrop-blur-md bg-white bg-opacity-40 text-stone-500 p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4 relative">
          <h3 className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">알림 목록</h3>
          <p 
            onClick={onClose} 
            className="text-xxl font-bold cursor-pointer w-10 h-10 absolute right-0 top-0"
            style={{ top: '-12px', right: '-30px' }}
          >
            &times;
          </p>
        </div>
        <div>
          {notifications.slice(0, visibleNotifications).map((notification, index) => (
            <div key={index} className="mb-4 p-4 bg-white bg-opacity-40 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-xs">{notification.who}님이 {notification.what}</p> {/* Reduced the size */}
              </div>
              <p className="text-xxs text-gray-400">{notification.when}</p> {/* Reduced the size */}
            </div>
          ))}
        </div>
        {visibleNotifications < notifications.length && (
          <p
            onClick={handleShowMore}
            className="mt-4 text-stone-500 py-2 px-5 rounded-full cursor-pointer text-center"
          >
            더보기
          </p>
        )}
      </div>
    </div>
  );
};

export default Notification;
