const AiNotification = ({
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
  return (
    <div
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
          swipedIndex === index && isSwiping ? 'none' : 'transform 0.2s ease',
      }}
    >
      {/* 상단: 알림 종류와 시간 */}
      <div className="flex justify-between">
        <p className="text-xs text-stone-500">AI</p>
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
  );
};

export default AiNotification;
