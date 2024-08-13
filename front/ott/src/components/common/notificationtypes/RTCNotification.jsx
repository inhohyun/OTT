const RTCNotification = ({
  notification,
  joinSession,
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
          swipedIndex === index && isSwiping
            ? 'none'
            : 'transform 0.2s ease',
      }}
    >
      <div className="flex justify-between">
        <p className="text-xs text-stone-500">
          {notification.notificationType}
        </p>
        <p className="text-xs text-stone-500">
          {formatDate(notification.createdAt)}
        </p>
      </div>

      <div className="text-center my-4">
        <p className="text-base" style={{ fontSize: '14px' }}>
          {notification.message}
        </p>
      </div>

      <div className="flex justify-center space-x-2 mt-2">
        <button
          className="bg-violet-400 text-white px-3 py-1 rounded"
          onClick={() => joinSession(notification.additionalData.sessionId)}
        >
          수락
        </button>
      </div>
    </div>
  );
};

export default RTCNotification;