import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getUserInfo } from '../../api/user/user';

const UserPage = () => {
  const [activeComponent, setActiveComponent] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // 유저 정보를 가져오는 메서드 (주석 해제 및 사용)
  /*
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(1);
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);
  if (!userInfo) {
    return <div>Loading...</div>;
  }
  // const { username, isMe, isPublic, tags } = userInfo;
  */

  const username = '닉네임';
  const isMe = true; // 본인 여부
  const isPublic = false; // 계정 공개 여부
  const tags = [
    '한여름의 도시남',
    '댄디남',
    '훈남',
    '여자들이 좋아하는',
    '소개팅',
  ];

  let renderComponent;

  switch (activeComponent) {
    case 'posts':
      renderComponent = <Posts isMe={isMe} isPublic={isPublic} />;
      break;
    case 'followers':
      renderComponent = <Followers />;
      break;
    case 'following':
      renderComponent = <Following />;
      break;
    default:
      renderComponent = null;
  }

  const handleClosetIconClick = () => {
    navigate('/closet');
  };

  const handleRtcIconClick = () => {};

  const handleFollowButtonClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="w-full h-full flex items-center justify-center font-dohyeon">
      <div
        className="w-[390px] h-screen relative flex flex-col items-center justify-start bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full flex justify-center mt-8">
          <img
            className="w-[70px] h-[70px] rounded-full"
            alt="User Icon"
            src={mainIcon}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-6">
          <div className="flex items-center justify-center w-full relative">
            <div className="flex items-center justify-center absolute left-0 right-0 mx-auto">
              {!isPublic && isMe && (
                <img src={lockIcon} alt="잠금표시" className="w-6 h-6 mr-2" />
              )}
              <p className="text-lg font-dohyeon text-[rgba(0,0,0,0.5)]">
                {username}
              </p>
              {isMe && (
                <img
                  src={settingIcon}
                  alt="수정"
                  className="w-6 h-6 ml-2 cursor-pointer"
                  onClick={() => navigate('/UpdatePage')}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-2">
          <div className="w-[80%] flex justify-between border border-black p-2">
            {!isMe && (
              <div className="flex justify-center items-center w-[40%]">
                <button
                  className="px-4 py-2 border rounded text-[rgba(0,0,0,0.5)] border-[rgba(0,0,0,0.5)] bg-transparent"
                  onClick={handleFollowButtonClick}
                >
                  {isFollowing ? '팔로잉' : '팔로우'}
                </button>
              </div>
            )}
            <div className="flex justify-center items-center w-[40%]">
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
          className={`flex justify-center mt-1 ${tags.length > 3 ? 'flex-wrap' : ''} space-x-2`}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-violet-200 text-[rgba(0,0,0,0.5)] py-1 px-3 rounded-full text-sm mb-30 mt-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-full mt-6">
          <NavBar
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
          <div className="mt-4 text-[rgba(0,0,0,0.5)]">{renderComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
