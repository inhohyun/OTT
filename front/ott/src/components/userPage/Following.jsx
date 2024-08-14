import { useState, useEffect } from 'react';
import defaultImage from '../../assets/icons/main.logo.png';
import { getFollowingList } from '../../api/following/following';
import { useNavigate } from 'react-router-dom';

const Following = ({ uid }) => {
  const [visibleFollowings, setVisibleFollowings] = useState(10);
  const [followings, setFollowings] = useState([]);

  const navigate = useNavigate();

  const handleShowMore = () => {
    setVisibleFollowings((prev) => prev + 10); // Show
  };

  useEffect(() => {
    const fetchFollings = async () => {
      try {
        const response = await getFollowingList(uid);
        console.log('팔로잉 목록 response', response);
        setFollowings(response.data);
      } catch (error) {
        console.error('팔로잉 목록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchFollings();
  }, [uid]);

  const handleClick = (user) => {
    navigate('/userpage', { state: { id: user.memberId } });
  };

  return (
    <div className="flex flex-col items-center mb-20">
      <div
        className="backdrop-blur-md bg-white bg-opacity-40 text-stone-500 p-6 rounded-2xl max-w-md w-full overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 150px)' }}
      >
        <div className="flex justify-center items-center mb-4 relative">
          <h3 className="text-xl font-bold">팔로잉 목록</h3>
        </div>
        <div className="flex flex-col space-y-4">
          {Array.from(
            { length: Math.ceil(visibleFollowings / 2) },
            (_, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-4">
                {followings
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((following, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 w-1/2 justify-center"
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-full border border-gray-300 overflow-hidden">
                        <img
                          src={following.image || defaultImage}
                          alt="Following"
                          className="w-full h-full object-cover"
                          onClick={() => handleClick(following)}
                        />
                      </div>
                      <span>{following.nickname}</span>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
        {visibleFollowings < followings.length && (
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
