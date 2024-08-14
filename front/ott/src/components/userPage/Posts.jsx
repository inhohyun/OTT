import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicPosts from '../userPage/PublicPosts';
import PrivatePosts from '../userPage/PrivatePosts';
import AddIcon from '../../assets/icons/add_icon.png';
import lockIcon from '../../assets/icons/lockicon.png';
const Posts = ({ isMe, isPublic, currentId }) => {
  const [activePostType, setActivePostType] = useState('public');

  const nav = useNavigate();

  const handleLookbookRegister = () => {
    console.log('룩북 등록 버튼이 클릭되었습니다!');
    // 추가적인 동작을 여기에 작성할 수 있습니다.
    nav('/lookbookcreate');
  };

  if (!isMe && !isPublic) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img src={lockIcon} alt="Lock Icon" className="w-24 h-24 mb-4" />
        <p className="text-gray-500 text-xl">비공개 계정입니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-center space-x-2">
        <button
          className={`py-2 px-5 cursor-pointer rounded-full ${isMe ? 'space-x-2' : ''}  ${
            activePostType === 'public'
              ? 'bg-violet-200 text-white'
              : 'bg-gray-200 text-black'
          }`}
          onClick={() => setActivePostType('public')}
          style={{ fontFamily: 'dohyeon' }}
        >
          공개
        </button>
        {isMe && (
          <button
            className={`py-2 px-5 cursor-pointer rounded-full  ${
              activePostType === 'private'
                ? 'bg-violet-200 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={() => setActivePostType('private')}
            style={{ fontFamily: 'dohyeon' }}
          >
            비공개
          </button>
        )}
      </div>
      <div className="mt-[-2]">
        {' '}
        {activePostType === 'public' ? (
          <PublicPosts isMe={isMe} currentId={currentId} />
        ) : (
          <PrivatePosts isMe={isMe} />
        )}
      </div>
      {isMe && (
        <div className="flex justify-center mt-4">
          {' '}
          <button
            className="w-[220px] py-2 px-5 cursor-pointer rounded-full bg-violet-200 text-white flex items-center justify-center mb-20 relative mt-5"
            style={{ fontFamily: 'dohyeon' }}
            onClick={handleLookbookRegister}
          >
            <span className="flex items-center">
              <img src={AddIcon} alt="룩북 아이콘" className="w-6 h-6 mr-2" />
              룩북 등록
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
