import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import mainIcon from '../../assets/icons/main.logo.png';
import Posts from '@/components/userPage/Posts';
import Followers from '@/components/userPage/Followers';
import Following from '@/components/userPage/Following';
import backgroundImage from '../../assets/images/background_image_main.png';
import lockIcon from '../../assets/icons/lockicon.png';
import settingIcon from '../../assets/icons/Setting_icon.png';
import NavBar from '@/components/userPage/NavBar';
import closetIcon from '@/assets/icons/closet_icon.png';
import rtcIcon from '@/assets/icons/webrtcicon.png';
import {
  getUserInfo,
  followUser,
  unfollowUser,
  getLookbookCount,
} from '../../api/user/user';
import useUserStore from '../../data/lookbook/userStore';
import CustomSpinner from '../../components/common/CustomSpinner';

const UserPage = () => {
  const [activeComponent, setActiveComponent] = useState('posts');
  const [followStatus, setFollowStatus] = useState('팔로우'); // 초기 상태를 '팔로우'로 설정
  const [userInfo, setUserInfo] = useState(null);
  const { nickname, tags, publicStatus } = userInfo || {};

  const [isMe, setIsMe] = useState(false);
  const isPublic = publicStatus === 'PUBLIC';
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [profileImg, setProfileImg] = useState(null);
  const navigate = useNavigate();
  // memberId 가져오기
  const memberId = useUserStore((state) => state.userId);

  const location = useLocation();
  const { id } = location.state || {}; // id 꺼내기, 기본값을 memberId로 설정

  useEffect(() => {
    const fetchUserData = async (sendId) => {
      try {
        const userInfoResponse = await getUserInfo(sendId);
        console.log('userInfoResponse : ', userInfoResponse);
        setUserInfo(userInfoResponse.data);

        // isMe와 isPublic 상태 업데이트
        setIsMe(userInfoResponse.data.followStatus === 'SELF');

        // 팔로우 상태 업데이트
        switch (userInfoResponse.data.followStatus) {
          case 'FOLLOWING':
            setFollowStatus('팔로잉');
            break;
          case 'NOT_FOLLOWING':
            setFollowStatus('팔로우');
            break;
          case 'WAIT':
            setFollowStatus('요청됨');
            break;
          default:
            setFollowStatus('팔로우');
            break;
        }

        // 팔로우,팔로워 업데이트
        setFollowerCount(userInfoResponse.data.followerCount);
        setFollowingCount(userInfoResponse.data.followingCount);

        // 프로필 이미지 업데이트
        setProfileImg(userInfoResponse.data.profileImageUrl);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (id === undefined || id === null) {
      console.log('본인 memberId로 정보 가져오기', memberId);
      fetchUserData(memberId);
    } else {
      console.log('다른 사람 memberId로 정보 가져오기', id);
      fetchUserData(id);
    }
  }, [id, memberId]);

  useEffect(() => {
    const fetchLookbookCount = async (sendId) => {
      try {
        const response = await getLookbookCount(sendId);
        setPostCount(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLookbookCount(id);
  }, []);

  if (!userInfo) {
    return <CustomSpinner />;
  }

  let renderComponent;

  switch (activeComponent) {
    case 'posts':
      renderComponent = (
        <Posts
          isMe={isMe}
          isPublic={isPublic}
          currentId={isMe ? memberId : id}
        />
      );
      break;
    case 'followers':
      renderComponent = <Followers uid={isMe ? memberId : id} />;
      break;
    case 'following':
      renderComponent = <Following uid={isMe ? memberId : id} />;
      break;
    default:
      renderComponent = null;
  }

  // 팔로우/언팔로우 요청 함수
  const toggleFollowStatus = async (sendId) => {
    try {
      let response;
      if (followStatus === '팔로잉' || followStatus === '요청됨') {
        response = await unfollowUser(sendId);
        setFollowStatus('팔로우');
      } else {
        response = await followUser(sendId);
        setFollowStatus(isPublic ? '팔로잉' : '요청됨');
      }
      console.log('response : ', response);
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  const handleClosetIconClick = () => {
    navigate('/closet', { state: { id: id } });
  };

  const handleRtcIconClick = () => {};

  const handleFollowButtonClick = () => {
    toggleFollowStatus(id);
  };

  const handleSettingsClick = () => {
    console.log('이동하려는 회원 id', memberId);
    if (memberId) {
      navigate(`/updatePage`, { state: { memberId, userInfo } });
    } else {
      console.error('ID is not available');
    }
  };

  return (
    <div
      className="relative flex flex-col items-center w-full min-h-screen bg-cover bg-center font-dohyeon mb-20"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full h-full flex flex-col items-center justify-start">
        <div className="w-full flex justify-center mt-8">
          <img
            className="w-[70px] h-[70px] rounded-full"
            alt="User Icon"
            src={profileImg ? profileImg : mainIcon}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-6">
          <div className="flex items-center justify-center w-full relative">
            <div className="flex items-center justify-center absolute left-0 right-0 mx-auto">
              {!isPublic && isMe && (
                <img src={lockIcon} alt="잠금표시" className="w-6 h-6 mr-2" />
              )}
              <p className="text-lg font-dohyeon text-[rgba(0,0,0,0.5)]">
                {nickname}
              </p>
              {isMe && (
                <img
                  src={settingIcon}
                  alt="수정"
                  className="w-6 h-6 ml-2 cursor-pointer"
                  onClick={handleSettingsClick}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-2">
          <div className="w-[80%] flex justify-between border border-black p-2">
            {!isMe && (
              <div className="flex justify-center items-center w-full">
                <button
                  className={`w-[70%] px-4 py-2 border rounded ${
                    followStatus === '팔로잉'
                      ? 'bg-violet-200 text-black-500'
                      : followStatus === '요청됨'
                        ? 'bg-blue-200 text-black-500'
                        : 'bg-transparent text-[rgba(0,0,0,0.5)]'
                  }`}
                  onClick={handleFollowButtonClick}
                  style={{ fontFamily: 'dohyeon' }}
                >
                  {followStatus}
                </button>
              </div>
            )}
            <div className="flex justify-center items-center w-full">
              {!isMe ? (
                <div className="flex">
                  <img
                    src={closetIcon}
                    alt="Colset Icon"
                    className="w-6 h-6 cursor-pointer mr-2"
                    onClick={handleClosetIconClick}
                  />
                  <img
                    src={rtcIcon}
                    alt="RTC Icon"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleRtcIconClick}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className={`flex justify-center mt-1 ${
            tags && tags.length > 3 ? 'flex-wrap' : ''
          } space-x-2`}
        >
          {tags &&
            tags.map((tag) => (
              <span
                key={tag}
                className="bg-violet-200 text-[rgba(0,0,0,0.5)] py-1 px-3 rounded-full text-sm mb-30 mt-2"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="w-full mt-6 h-full">
          <NavBar
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
            followerCount={followerCount}
            followingCount={followingCount}
            postCount={postCount}
          />
          <div className="mt-4 text-[rgba(0,0,0,0.5)] h-full w-full">
            {renderComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
