import React, { useState, useEffect, useRef } from 'react';
import Lookbook from '../lookbook/Lookbook';
import LookbookList from '../lookbook/LookbookList';
import { followFeed } from '../../api/lookbook/feed';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import plus from '../../assets/icons/plusicon.png';
import useUserStore from '../../data/lookbook/userStore';
import CustomSpinner from '../common/CustomSpinner';
import NoFeed from '../../components/feed/NoFeed';
import useLookbookStore from '../../data/lookbook/detailStore';

const FeedFollow = () => {
  const [followersData, setFollowersData] = useState([]);
  const [visibleLookbooks, setVisibleLookbooks] = useState({});
  const [selectedFollower, setSelectedFollower] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { hideDetail } = useLookbookStore();

  const scrollRefs = useRef([]);

  const userId = useUserStore((state) => state.userId);

  // fetchFollowFeed 함수를 컴포넌트 바깥에서 정의
  const fetchFollowFeed = async () => {
    try {
      const data = await followFeed(userId);
      // console.log('Follow feed data:', data);
      setFollowersData(data);
      setVisibleLookbooks(
        data.reduce(
          (acc, follower) => ({ ...acc, [follower.nickname]: 1000 }),
          {}
        )
      );
      scrollRefs.current = data.map(() => React.createRef());
    } catch (error) {
      // console.error('Failed to fetch follow feed', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowFeed();
  }, []);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const showMore = (followerNickname) => {
    setSelectedFollower(followerNickname);
  };

  const closeDetailedView = () => {
    setSelectedFollower(null);
  };

  const handleCloseDetail = async () => {
    // console.log('[*]모달 닫기');
    hideDetail();
    setIsLoading(true);

    try {
      const lookbookData = await followFeed(userId);
      // console.log('Updated feed data:', lookbookData);
      setFollowersData(lookbookData);
    } catch (error) {
      // console.error('Failed to update follow feed', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!Array.isArray(followersData) || isLoading) {
    return <CustomSpinner />;
  }

  if (!followersData.length) {
    return <NoFeed />;
  }

  return (
    <div className="relative flex flex-col items-start w-full pl-2 space-y-3">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .lookbook-container, .show-more-button {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
        }
        .lookbook-container {
            margin-right : -10px;
        }
        .button-no-style {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
        }
      `}</style>

      {followersData.map((follower, index) => (
        <div key={follower.nickname} className="w-full">
          <div className="relative">
            {follower.followLookbookDtoList.length > 3 && (
              <button
                onClick={() => scrollLeft(scrollRefs.current[index])}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
                style={{
                  backgroundImage: `url(${leftArrow})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  border: 'none',
                  backgroundColor: 'transparent',
                }}
              ></button>
            )}
            <div
              ref={scrollRefs.current[index]}
              className="flex overflow-x-auto py-3 scrollbar-hide"
            >
              {follower.followLookbookDtoList
                .slice(0, visibleLookbooks[follower.nickname])
                .map((lookbook) => (
                  <div key={lookbook.lookbookId} className="lookbook-container">
                    <Lookbook
                      data={{
                        lookbookId: lookbook.lookbookId,
                        nickname: follower.nickname,
                        cntComment: lookbook.cntComment,
                        cntFavorite: lookbook.cntFavorite,
                        createdAt: lookbook.createdAt,
                        favorite: lookbook.favorite,
                        img: lookbook.imgThumbnail,
                        memberId: follower.memberId,
                        imgProfile: follower.imgProfile,
                        introduction: follower.introduction,
                      }}
                      onClose={handleCloseDetail}
                    />
                  </div>
                ))}
              {visibleLookbooks[follower.nickname] <
                follower.followLookbookDtoList.length && (
                <div className="show-more-button">
                  <button
                    onClick={() => showMore(follower.nickname)}
                    className="relative bg-transparent border-none p-2 mb-32 cursor-pointer"
                  >
                    <img src={plus} alt="Show more" className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
            {follower.followLookbookDtoList.length > 3 && (
              <button
                onClick={() => scrollRight(scrollRefs.current[index])}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
                style={{
                  backgroundImage: `url(${rightArrow})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  border: 'none',
                  backgroundColor: 'transparent',
                }}
              ></button>
            )}
          </div>
        </div>
      ))}
      {selectedFollower && (
        <LookbookList
          tag={selectedFollower}
          lookbooks={
            followersData.find((f) => f.nickname === selectedFollower)
              .followLookbookDtoList
          }
          onClose={closeDetailedView}
        />
      )}
    </div>
  );
};

export default FeedFollow;
