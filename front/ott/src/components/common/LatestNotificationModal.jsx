const LatestNotificationModal = ({ show, onClose, notification }) => {
  if (!show || !notification) return null;

  return (
    <div
      id="modal-overlay"
      onClick={onClose}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="backdrop-blur-md bg-white bg-opacity-40 text-stone-500 p-4 rounded-lg max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4 relative">
          <h3 className="text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
            새로운 알림
          </h3>
          <p
            onClick={onClose}
            className="text-lg font-bold cursor-pointer w-8 h-8 absolute right-0 top-0"
            style={{ top: '-8px', right: '-24px' }}
          >
            &times;
          </p>
        </div>
        <div className="mb-4 p-2 bg-white bg-opacity-40 rounded-lg shadow-md relative">
          <p className="text-base mb-4" style={{ fontSize: '14px' }}>
            {notification.message}
          </p>
          {notification.notificationType === 'COMMENT' && (
            <p>관련 댓글 ID: {notification.additionalData.commentId}</p>
          )}
          {notification.notificationType === 'FOLLOW' && (
            <p>팔로워 ID: {notification.additionalData.followerId}</p>
          )}
          {notification.notificationType === 'RTC' && (
            <p>세션 ID: {notification.additionalData.sessionId}</p>
          )}
          <p
            className="text-xs text-stone-500 absolute right-2 bottom-2"
            style={{ fontSize: '12px' }}
          >
            {notification.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestNotificationModal;