import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { followRequestAccept, followRequestReject } from '../../api/user/user';
import useUserStore from '../../data/lookbook/userStore';
import FollowNotification from './notificationtypes/FollowNotification'
import CommentNotification from './notificationtypes/CommentNotification'
import RTCNotification from './notificationtypes/RTCNotification'
import AiNotification from './notificationtypes/AiNotification'


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
            <button
              type="button"
              onClick={() => joinSession('session-jjh', 'test')}
            >
              joinSession
            </button>
          </div>

          {notifications.slice(0, visibleNotifications).map((notification, index) => {
            switch (notification.notificationType) {
              case 'FOLLOW':
                return (
                  <FollowNotification
                    key={index}
                    notification={notification}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                    formatDate={formatDate}
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    isSwiping={isSwiping}
                    swipedIndex={swipedIndex}
                    index={index}
                    moveX={moveX}
                    startX={startX}
                  />
                );
              case 'RTC':
                return (
                  <RTCNotification
                    key={index}
                    notification={notification}
                    joinSession={joinSession}
                    formatDate={formatDate}
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    isSwiping={isSwiping}
                    swipedIndex={swipedIndex}
                    index={index}
                    moveX={moveX}
                    startX={startX}
                  />
                );
              case 'COMMENT':
                return (
                  <CommentNotification
                    key={index}
                    notification={notification}
                    formatDate={formatDate}
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    isSwiping={isSwiping}
                    swipedIndex={swipedIndex}
                    index={index}
                    moveX={moveX}
                    startX={startX}
                  />
                );
              case 'AI':
                return (
                  <AiNotification
                    key={index}
                    notification={notification}
                    formatDate={formatDate}
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    isSwiping={isSwiping}
                    swipedIndex={swipedIndex}
                    index={index}
                    moveX={moveX}
                    startX={startX}
                  />
                );
              default:
                return <div key={index}>알림이 없습니다.</div>;
            }
          })}
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
