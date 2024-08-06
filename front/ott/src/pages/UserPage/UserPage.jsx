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
import { getUid, getUserInfo } from '../../api/user/user';

const UserPage = () => {
  const [activeComponent, setActiveComponent] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uidResponse = await getUid();

        const uid = uidResponse.data.id;
        setUid(uid);

        const userInfoResponse = await getUserInfo(uid);
        console.log('userInfoResponse : ', userInfoResponse);
        setUserInfo(userInfoResponse.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const { name, publicStatus, FollowerStatus, tags } = userInfo;

  if (FollowerStatus.status === 'SELF') {
    isMe = true;
  } else {
    isMe = false;
  }

  if (publicStatus === 'PUBLIC') {
    isPublic = true;
  } else {
    isPublic = false;
  }

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

  const handleSettingsClick = () => {
    navigate(`/updatePage`, { state: { userId: uid } });
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
            src={mainIcon}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-6">
          <div className="flex items-center justify-center w-full relative">
            <div className="flex items-center justify-center absolute left-0 right-0 mx-auto">
              {isPublic && isMe && (
                <img src={lockIcon} alt="잠금표시" className="w-6 h-6 mr-2" />
              )}
              <p className="text-lg font-dohyeon text-[rgba(0,0,0,0.5)]">
                {name}
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
                  className={`w-full px-4 py-2 border rounded ${
                    isFollowing
                      ? 'bg-violet-200 text-black-500 border-violet-300'
                      : 'bg-transparent text-[rgba(0,0,0,0.5)]'
                  }`}
                  onClick={handleFollowButtonClick}
                  style={{ fontFamily: 'dohyeon' }}
                >
                  {isFollowing ? '팔로잉' : '팔로우'}
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
            tags.length > 3 ? 'flex-wrap' : ''
          } space-x-2`}
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
        <div className="w-full mt-6 h-full">
          <NavBar
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
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
