import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { followRequestAccept, followRequestReject } from '../../api/user/user';
import useUserStore from '../../data/lookbook/userStore';

const Notification = ({ show, onClose, notifications, setNotifications }) => {
  const [visibleNotifications, setVisibleNotifications] = useState(4);
  const [startX, setStartX] = useState(null);
  const [moveX, setMoveX] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipedIndex, setSwipedIndex] = useState(null);
  const navigate = useNavigate();
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

  const handleNotificationType = (notification) => {
    const { notificationType, message, additionalData } = notification;
    let additionalInfo = '';

    switch (notificationType) {
      case 'COMMENT':
        additionalInfo = `룩북 ID: ${additionalData.lookbookId}, 댓글 ID: ${additionalData.commentId}, Author ID: ${additionalData.commentAuthorId}`;
        break;

      case 'FOLLOW':
        additionalInfo = `팔로워 ID: ${additionalData.followerId}, 팔로우 행위 ID: ${additionalData.followId}, 팔로우 상태: ${additionalData.followStatus}`;
        break;

      case 'RTC':
        additionalInfo = `화상 중고거래 상대방 ID: ${additionalData.rtcRequestMemberId}, 세션 ID: ${additionalData.sessionId}`;
        break;

      case 'AI':
        additionalInfo = 'AI 알림';
        break;

      default:
        additionalInfo = '기본';
    }

    return `${message} - ${additionalInfo}`;
  };

  const handleAccept = async (followerId) => {
    try {
      await followRequestAccept(followerId);
      setNotifications(
        notifications.filter(
          (notification) =>
            notification.additionalData.followerId !== followerId
        )
      );
    } catch (error) {
      console.error('팔로우 요청 수락 중 에러 발생:', error);
    }
  };

  const handleReject = async (followerId) => {
    try {
      await followRequestReject(followerId);
      setNotifications(
        notifications.filter(
          (notification) =>
            notification.additionalData.followerId !== followerId
        )
      );
    } catch (error) {
      console.error('팔로우 요청 거절 중 에러 발생:', error);
    }
  };

  if (!show) return null;

  const joinSession = async (sessionId) => {
    console.log('알림 클릭');
    const memberId = useUserStore((state) => state.userId);
    const userName = (await getUserInfo(memberId)).data.nickname;
    navigate(`/video-chat`, { state: { sessionId, userName } });
    onClose();
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
          <div className="mb-4 p-2 bg-white bg-opacity-40 rounded-lg shadow-md relative">
            {/* <button type="button" onClick={() => joinSession(sessionId, userName)}>joinSession</button> */}
            <button
              type="button"
              onClick={() => joinSession('session-jjh', 'test')}
            >
              joinSession
            </button>
          </div>
          {notifications
            .slice(0, visibleNotifications)
            .map((notification, index) => (
              <div
                key={index}
                className="mb-4 p-2 bg-white bg-opacity-40 rounded-lg shadow-md relative"
                // onTouchStart={(e) => handleTouchStart(index, e)}
                // onTouchMove={handleTouchMove}
                // onTouchEnd={handleTouchEnd}
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
                  <p className="text-xs text-stone-500">
                    {notification.notificationType}
                  </p>
                  <p className="text-xs text-stone-500">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>

                {/* 중단: 메시지 */}
                <div
                  className="text-center my-4"
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
                  <p className="text-base" style={{ fontSize: '14px' }}>
                    {handleNotificationType(notification)}
                  </p>
                </div>

                {/* 하단: 동작 버튼 중앙에 */}
                {notification.notificationType === 'FOLLOW' &&
                  notification.additionalData.followStatus === 'WAIT' && (
                    <div className="flex justify-center space-x-2 mt-2">
                      <button
                        className="bg-violet-400 text-white px-3 py-1 rounded"
                        onClick={() =>
                          handleAccept(notification.additionalData.followerId)
                        }
                      >
                        수락
                      </button>
                      <button
                        className="bg-stone-500 text-white px-3 py-1 rounded"
                        onClick={() =>
                          handleReject(notification.additionalData.followerId)
                        }
                      >
                        거절
                      </button>
                    </div>
                  )}

                {notification.notificationType === 'RTC' && (
                  <div className="flex justify-center space-x-2 mt-2">
                    <button
                      className="bg-violet-400 text-white px-3 py-1 rounded"
                      onClick={() =>
                        // handleAccept(notification.additionalData.followerId)
                        joinSession(notification.additionalData.sessionId)
                      }
                    >
                      수락
                    </button>
                    <button
                      className="bg-stone-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        handleReject(notification.additionalData.followerId)
                      }
                    >
                      거절
                    </button>
                  </div>
                )}
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
