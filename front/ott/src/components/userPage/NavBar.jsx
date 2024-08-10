import React from 'react';

const NavBar = ({ activeComponent, setActiveComponent }) => {
  // TODO : 게시글, 팔로워, 팔로잉 수를 서버에서 받아와야 함
  const postNumber = 100;
  const follwerNumber = 100;
  const followingNumber = 100;

  return (
    <nav className="w-full text-center flex justify-around text-lg mt- font-dohyeon">
      <button
        className={`bg-transparent border-none text-[rgba(0,0,0,0.5)] py-2 px-5 cursor-pointer rounded-full ${
          activeComponent === 'posts' ? 'bg-violet-200' : ''
        }`}
        onClick={() => setActiveComponent('posts')}
        aria-label="게시글"
        style={{ fontFamily: 'dohyeon' }}
      >
        {postNumber} 게시글
      </button>
      <button
        className={`bg-transparent border-none text-[rgba(0,0,0,0.5)] py-2 px-5 cursor-pointer rounded-full ${
          activeComponent === 'followers' ? 'bg-violet-200' : ''
        }`}
        onClick={() => setActiveComponent('followers')}
        aria-label="팔로워"
        style={{ fontFamily: 'dohyeon' }}
      >
        {follwerNumber} 팔로워
      </button>
      <button
        className={`bg-transparent border-none text-[rgba(0,0,0,0.5)] py-2 px-5 cursor-pointer rounded-full ${
          activeComponent === 'following' ? 'bg-violet-200' : ''
        }`}
        onClick={() => setActiveComponent('following')}
        aria-label="팔로잉"
        style={{ fontFamily: 'dohyeon' }}
      >
        {followingNumber} 팔로잉
      </button>
    </nav>
  );
};

export default NavBar;
