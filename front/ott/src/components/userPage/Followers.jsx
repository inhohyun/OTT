import React, { useState, useEffect } from 'react';
import defaultImage from '../../assets/icons/main.logo.png';
import { getFollowingList } from '../../api/following/following'; // 팔로잉 목록을 가져오는 API

const Following = ({ uid }) => {
  const [following, setFollowing] = useState([]);
  const [visibleFollowing, setVisibleFollowing] = useState(10);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await getFollowingList(uid); // uid를 사용하여 팔로잉 목록을 가져옵니다
        console.log('response:', response);
        setFollowing(response.data);
      } catch (error) {
        console.error('팔로잉 목록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchFollowing();
  }, [uid]);

  const handleShowMore = () => {
    setVisibleFollowing((prev) => prev + 10); // Show 10 more following
  };

  return (
    <div className="flex flex-col items-center mb-20">
      <div className="backdrop-blur-md bg-white bg-opacity-40 text-stone-500 p-6 rounded-2xl max-w-md w-full h-full overflow-y-auto">
        <div className="flex justify-center items-center mb-4 relative">
          <h3 className="text-xl font-bold">팔로잉 목록</h3>
        </div>
        <div className="flex flex-col space-y-4">
          {Array.from(
            { length: Math.ceil(visibleFollowing / 2) },
            (_, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-4">
                {following
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((follow, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 w-1/2 justify-center"
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-full border border-gray-300 overflow-hidden">
                        <img
                          src={follow.image || defaultImage}
                          alt="Following"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{follow.nickname}</span>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
        {visibleFollowing < following.length && (
          <p
            onClick={handleShowMore}
            className="mt-4 text-stone-500 py-2 px-5 rounded-full cursor-pointer text-center bg-gray-200"
          >
            더보기
          </p>
        )}
      </div>
    </div>
  );
};

export default Following;
