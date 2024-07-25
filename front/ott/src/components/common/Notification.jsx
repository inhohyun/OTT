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
      <div className="backdrop-blur-md bg-white bg-opacity-40 text-stone-500 p-4 rounded-lg max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4 relative">
          <h3 className="text-lg font-bold absolute left-1/2 transform -translate-x-1/2">알림 목록</h3>
          <p 
            onClick={onClose} 
            className="text-lg font-bold cursor-pointer w-8 h-8 absolute right-0 top-0"
            style={{ top: '-8px', right: '-24px' }}
          >
            &times;
          </p>
        </div>
        <div>
          {notifications.slice(0, visibleNotifications).map((notification, index) => (
            <div key={index} className="mb-4 p-2 bg-white bg-opacity-40 rounded-lg shadow-md relative">
              <p className="text-base mb-4" style={{ fontSize: '14px' }}>{notification.who}님이 {notification.what}</p>
              <p className="text-xs text-stone-500 absolute right-2 bottom-2" style={{ fontSize: '12px' }}>{notification.when}</p>
            </div>
          ))}
        </div>
        {visibleNotifications < notifications.length && (
          <p
            onClick={handleShowMore}
            className="mt-2 text-stone-500 py-1 px-3 rounded-full cursor-pointer text-center"
          >
            더보기
          </p>
        )}
      </div>
    </div>
  );
};

export default Notification;
