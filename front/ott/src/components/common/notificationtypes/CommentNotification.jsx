import { lookbookDetail } from "../../../api/lookbook/lookbookdetail";

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
  openLookBookModal,
}) => {

  const handleClick = async () => {
    const { lookbookId, commentAuthorId } = notification.additionalData;

    try {
      const response = await lookbookDetail(lookbookId, commentAuthorId);
      if (response && response.data) {
        openLookBookModal(response.data);
      }
    } catch (error) {
      console.error('룩북 조회 중 에러 발생:', error);
    }
  }
 
  return (
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
          swipedIndex === index && isSwiping
            ? 'none'
            : 'transform 0.2s ease',
      }}
    >
      {/* 상단: 알림 종류와 시간 */}
      <div className="flex justify-between">
        <p className="text-xs text-stone-500">{notification.notificationType}</p>
        <p className="text-xs text-stone-500">{formatDate(notification.createdAt)}</p>
      </div>

      {/* 중단: 메시지 */}
      <div className="text-center my-4">
        <p className="text-base" style={{ fontSize: '14px' }}>
          {notification.message}
        </p>
      </div>

      {/* additionalData */}
      <div className="text-sm text-stone-500 text-center">
        <p>룩북 ID: {notification.additionalData.lookbookId}</p>
        <p>댓글 ID: {notification.additionalData.commentId}</p>
        <p>글쓴이 ID: {notification.additionalData.commentAuthorId}</p>
      </div>
    </div>
  );
};

export default CommentNotification;