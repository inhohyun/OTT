import React, { useState, useEffect } from 'react';
import defaultImage from '../../assets/icons/main.logo.png';
import { getFollowerList } from '../../api/follower/follower';
const Followers = (uid) => {
  const [followers, setFollowers] = useState([]);
  const [visibleFollowers, setVisibleFollowers] = useState(10);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await getFollowerList(uid);
        console.log('response:', response);
        setFollowers(response.data);
      } catch (error) {
        console.error('팔로워 목록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchFollowers();
  }, [uid]);

  const handleShowMore = () => {
    setVisibleFollowers((prev) => prev + 10); // Show 10 more followers
  };

  return (
    <div className="flex flex-col items-center mb-20">
      <div className="backdrop-blur-md bg-white bg-opacity-40 text-stone-500 p-6 rounded-2xl max-w-md w-full h-full overflow-y-auto">
        <div className="flex justify-center items-center mb-4 relative">
          <h3 className="text-xl font-bold">팔로워 목록</h3>
        </div>
        <div className="flex flex-col space-y-4">
          {Array.from(
            { length: Math.ceil(visibleFollowers / 2) },
            (_, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-4">
                {followers
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((follower, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 w-1/2 justify-center"
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-full border border-gray-300 overflow-hidden">
                        <img
                          src={follower.image || defaultImage}
                          alt="Follower"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{follower.nickname}</span>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
        {visibleFollowers < followers.length && (
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

export default Followers;
