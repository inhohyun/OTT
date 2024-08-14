import useLookbookStore from '../../../data/lookbook/detailStore';
import LookbookDetail from '../../lookbook/LookbookDetail';
import { useState } from 'react';

const CommentNotification = ({
  notification,
  formatDate,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  isSwiping,
  swipedIndex,
  index,
  moveX,
  startX,
}) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const { hideDetail } = useLookbookStore();

  const onClose = () => {
    hideDetail();
    setIsDetailVisible(false);
  };

  const handleClick = async () => {
    setIsDetailVisible(true);
  };

  return (
    <div>
      <div
        className="mb-4 p-2 bg-white bg-opacity-40 rounded-lg shadow-md relative"
        onClick={handleClick}
        onTouchStart={(e) => handleTouchStart(index, e)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform:
            swipedIndex === index && isSwiping
              ? `translateX(${moveX - startX}px)`
              : 'translateX(0)',
          transition:
            swipedIndex === index && isSwiping ? 'none' : 'transform 0.2s ease',
        }}
      >
        {/* 상단: 알림 종류와 시간 */}
        <div className="flex justify-between">
          <p className="text-xs text-stone-500">
            {notification.notificationType}
          </p>
          <p className="text-xs text-stone-500">
            {formatDate(notification.createdAt)}
          </p>
        </div>

        {/* 중단: 메시지 */}
        <div className="text-center my-4">
          <p className="text-base" style={{ fontSize: '14px' }}>
            {notification.message}
          </p>
        </div>
      </div>

      {/* {isDetailVisible && (
        <LookbookDetail lookbookId={notification.additionalData.lookbookId} onClose={onClose} />
      )} */}
      {isDetailVisible && (
        <div className="fixed top-0 left-0 max-w-md h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <LookbookDetail
            lookbookId={notification.additionalData.lookbookId}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
};

export default CommentNotification;
