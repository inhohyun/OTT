import { useState, useEffect } from 'react';

const Notification = ({ show, onClose, notifications, setNotifications }) => {
  const [visibleNotifications, setVisibleNotifications] = useState(4);
  const [startX, setStartX] = useState(null);
  const [moveX, setMoveX] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipedIndex, setSwipedIndex] = useState(null);

  useEffect(() => {
    if (!show) {
      setVisibleNotifications(4); // 알림 모달 꺼지면 보여주기 상태 초기화
    }
  }, [show]);

  if (!show) return null;

  const handleShowMore = () => {
    setVisibleNotifications((prev) => prev + 4); // 알림 4개 더 보여주기
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  const handleTouchStart = (index, e) => {
    setStartX(e.touches[0].clientX);
    setSwipedIndex(index);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    setMoveX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    const diffX = moveX - startX;
    if (diffX > 100) {
      // 옆으로 밀어서 알림 삭제
      handleDeleteNotification(swipedIndex);
    }
    setIsSwiping(false);
    setSwipedIndex(null);
  };

  const handleDeleteNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-start pt-20 z-50"
    >
      <div className="backdrop-blur-md bg-white bg-opacity-40 text-stone-500 p-4 rounded-lg max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4 relative">
          <h3 className="text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
            알림 목록
          </h3>
          <p
            onClick={onClose}
            className="text-lg font-bold cursor-pointer w-8 h-8 absolute right-0 top-0"
            style={{ top: '-8px', right: '-24px' }}
          >
            &times;
          </p>
        </div>
        <div>
          {notifications
            .slice(0, visibleNotifications)
            .map((notification, index) => (
              <div
                key={index}
                className="mb-4 p-2 bg-white bg-opacity-40 rounded-lg shadow-md relative"
                onTouchStart={(e) => handleTouchStart(index, e)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  transform:
                    swipedIndex === index && isSwiping
                      ? `translateX(${moveX - startX}px)`
                      : 'translateX(0)',
                  transition:
                    swipedIndex === index && isSwiping
                      ? 'none'
                      : 'transform 0.2s ease',
                }}
              >
                <p className="text-base mb-4" style={{ fontSize: '14px' }}>
                  {notification.message}
                </p>
                <p className="text-xs mb-2 text-stone-500">
                  {notification.notificationType}
                </p>
                <p
                  className="text-xs text-stone-500 absolute right-2 bottom-2"
                  style={{ fontSize: '12px' }}
                >
                  {formatDate(notification.createdAt)}
                </p>
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
