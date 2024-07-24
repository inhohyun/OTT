// src/components/userPage/Posts.jsx
import React, { useState } from 'react';
import PublicPosts from '../userPage/PublicPosts';
import PrivatePosts from '../userPage/PrivatePosts';

const Posts = () => {
  const [activePostType, setActivePostType] = useState('public');

  return (
    <div className="w-full text-center">
      <div className="flex justify-center space-x-2 mt-4 font-dohyeon">
        <button
          className={`py-2 px-5 cursor-pointer rounded-full ${
            activePostType === 'public' ? 'bg-violet-200 text-black' : 'text-gray-400'
          }`}
          onClick={() => setActivePostType('public')}
          style={{ fontFamily: 'dohyeon' }}
        >
          공개
        </button>
        <button
          className={`py-2 px-5 cursor-pointer rounded-full ${
            activePostType === 'private' ? 'bg-violet-200 text-black' : 'text-gray-400'
          }`}
          onClick={() => setActivePostType('private')}
          style={{ fontFamily: 'dohyeon' }}
        >
          비공개
        </button>
      </div>
      <div className="mt-4">
        {activePostType === 'public' ? <PublicPosts /> : <PrivatePosts />}
      </div>
    </div>
  );
};

export default Posts;
