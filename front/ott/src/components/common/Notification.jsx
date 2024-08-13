import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { followRequestAccept, followRequestReject } from '../../api/user/user';
import useUserStore from '../../data/lookbook/userStore';
import FollowNotification from './notificationtypes/FollowNotification';
import CommentNotification from './notificationtypes/CommentNotification';
import RTCNotification from './notificationtypes/RTCNotification';
import AiNotification from './notificationtypes/AiNotification';

const Notification = ({ show, onClose, notifications, setNotifications }) => {
  const [visibleNotifications, setVisibleNotifications] = useState(4); // 보여줄 알림의 개수를 관리하는 상태
  const [touchData, setTouchData] = useState({ startX: 0, moveX: 0 }); // 터치 이벤트의 시작과 이동 데이터를 관리하는 상태
  const [isSwiping, setIsSwiping] = useState(false); // 스와이프 중인지 여부를 관리하는 상태
  const [swipedIndex, setSwipedIndex] = useState(null); // 스와이프된 알림의 인덱스를 관리하는 상태
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!show) {
      setVisibleNotifications(4); // 알림 모달이 닫힐 때, 보여줄 알림의 개수를 초기화
    }
  }, [show]);

  if (!show) return null;

  const handleShowMore = () => {
    setVisibleNotifications((prev) => prev + 4); // 알림을 4개 더 보여줌
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose(); // 모달 외부 클릭 시 모달을 닫음
    }
  };

  const handleTouchStart = (index, e) => {
    setTouchData({ startX: e.touches[0].clientX, moveX: 0 }); // 터치 시작 위치를 저장
    setSwipedIndex(index); // 현재 터치된 알림의 인덱스를 저장
    setIsSwiping(true); // 스와이프 시작을 표시
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    setTouchData((prev) => ({ ...prev, moveX: e.touches[0].clientX })); // 터치 이동 위치를 저장
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    const diffX = touchData.moveX - touchData.startX; // 터치 시작과 종료 위치의 차이를 계산
    if (diffX > 100) {
      // 스와이프로 알림 삭제
      handleDeleteNotification(swipedIndex);
    }
    setSwipedIndex(null); // 스와이프 상태 초기화
    setIsSwiping(false); // 스와이프 종료
  };

  const handleDeleteNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index)); // 알림을 삭제
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // 날짜와 시간을 포맷하여 반환
  };

  const handleAccept = async (followerId) => {
    try {
      await followRequestAccept(followerId); // 팔로우 요청 수락 API 호출
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
      await followRequestReject(followerId); // 팔로우 요청 거절 API 호출
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

  const joinSession = async (sessionId) => {
    console.log('알림 클릭');
    const memberId = useUserStore((state) => state.userId);
    console.log(memberId);
    console.log(await getUserInfo(memberId));
    console.log(await getUserInfo(memberId).data);
    const userName = (await getUserInfo(memberId)).data.nickname;
    navigate(`/video-chat`, { state: { sessionId, userName } });
    onClose(); // 세션에 참여한 후 모달 닫기
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
            &times; {/* 모달 닫기 버튼 */}
          </p>
        </div>
        <div>
          {notifications.slice(0, visibleNotifications).map((notification, index) => {
            const commonProps = {
              notification,
              formatDate,
              handleTouchStart: (e) => handleTouchStart(index, e),
              handleTouchMove,
              handleTouchEnd,
              isSwiping: swipedIndex === index,
              moveX: touchData.moveX,
              startX: touchData.startX,
            };
            switch (notification.notificationType) {
              case 'FOLLOW':
                return (
                  <FollowNotification
                    key={notification.notificationId} 
                    {...commonProps}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                  />
                );
              case 'RTC':
                return (
                  <RTCNotification
                    key={notification.notificationId} 
                    {...commonProps}
                    joinSession={joinSession}
                  />
                );
              case 'COMMENT':
                return (
                  <CommentNotification
                    key={notification.notificationId} 
                    {...commonProps}
                  />
                );
              case 'AI':
                return (
                  <AiNotification
                    key={notification.notificationId} 
                    {...commonProps}
                  />
                );
              default:
                return <div key={notification.notificationId}>알림이 없습니다.</div>;
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
