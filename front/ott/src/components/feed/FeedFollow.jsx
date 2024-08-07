// import React, { useState, useRef, useEffect } from 'react';
// import { dummyLookbooks } from '../lookbook/lookbookdata'; // Adjust the import path
// import Lookbook from '../lookbook/Lookbook';
// import LookbookList from '../lookbook/LookbookList';
// import leftArrow from '../../assets/icons/left_arrow_icon.png';
// import rightArrow from '../../assets/icons/right_arrow_icon.png';
// import plus from '../../assets/icons/plusicon.png';
// import axios from 'axios';

// const FeedFollow = () => {
//   const followers = ['ChrisBrown'];

//   const allLookbooks = followers.reduce((acc, follower) => {
//     acc[follower] = dummyLookbooks.filter(
//       (lookbook) => lookbook.nickname === follower
//     );
//     return acc;
//   }, {});

//   const initialLimit = 10;
//   const [visibleLookbooks, setVisibleLookbooks] = useState(
//     followers.reduce(
//       (acc, follower) => ({ ...acc, [follower]: initialLimit }),
//       {}
//     )
//   );
//   const [selectedFollower, setSelectedFollower] = useState(null);

//   const scrollRefs = useRef(followers.map(() => React.createRef()));

//   const scrollLeft = (ref) => {
//     if (ref.current) {
//       ref.current.scrollBy({ left: -200, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = (ref) => {
//     if (ref.current) {
//       ref.current.scrollBy({ left: 200, behavior: 'smooth' });
//     }
//   };

//   const showMore = (follower) => {
//     setSelectedFollower(follower);
//   };

//   const closeDetailedView = () => {
//     setSelectedFollower(null);
//   };

//   return (
//     <div className="relative flex flex-col items-start w-full pl-2 space-y-3">
//       <style>{`
//                 .scrollbar-hide::-webkit-scrollbar {
//                     display: none;
//                 }
//                 .scrollbar-hide {
//                     -ms-overflow-style: none;
//                     scrollbar-width: none;
//                 }
//                 .lookbook-container, .show-more-button {
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     margin: 0;
//                     padding: 0;
//                 }
//                 .lookbook-container {
//                     margin-right : -10px;
//                 }
//                 .button-no-style {
//                     background: none;
//                     border: none;
//                     padding: 0;
//                     cursor: pointer;
//                 }
//             `}</style>

//       {followers.map((follower, index) => (
//         <div key={follower} className="w-full">
//           <p className="ml-2 text-xl font-bold">{follower}</p>
//           <div className="relative">
//             {allLookbooks[follower].length > 3 && (
//               <button
//                 onClick={() => scrollLeft(scrollRefs.current[index])}
//                 className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
//                 style={{
//                   backgroundImage: `url(${leftArrow})`,
//                   backgroundSize: 'contain',
//                   backgroundRepeat: 'no-repeat',
//                   backgroundPosition: 'center',
//                   border: 'none',
//                   backgroundColor: 'transparent',
//                 }}
//               ></button>
//             )}
//             <div
//               ref={scrollRefs.current[index]}
//               className="flex overflow-x-auto py-3 scrollbar-hide"
//             >
//               {allLookbooks[follower]
//                 .slice(0, visibleLookbooks[follower])
//                 .map((lookbook, lookbookIndex) => (
//                   <div key={lookbookIndex} className="lookbook-container">
//                     <Lookbook data={lookbook} />
//                   </div>
//                 ))}
//               {visibleLookbooks[follower] < allLookbooks[follower].length && (
//                 <div className="show-more-button">
//                   <button
//                     onClick={() => showMore(follower)}
//                     className="relative bg-transparent border-none p-2 mb-32 cursor-pointer"
//                   >
//                     <img src={plus} alt="Show more" className="w-6 h-6" />
//                   </button>
//                 </div>
//               )}
//             </div>
//             {allLookbooks[follower].length > 3 && (
//               <button
//                 onClick={() => scrollRight(scrollRefs.current[index])}
//                 className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 w-6 h-6"
//                 style={{
//                   backgroundImage: `url(${rightArrow})`,
//                   backgroundSize: 'contain',
//                   backgroundRepeat: 'no-repeat',
//                   backgroundPosition: 'center',
//                   border: 'none',
//                   backgroundColor: 'transparent',
//                 }}
//               ></button>
//             )}
//           </div>
//         </div>
//       ))}
//       {selectedFollower && (
//         <LookbookList
//           tag={selectedFollower}
//           lookbooks={allLookbooks[selectedFollower]}
//           onClose={closeDetailedView}
//         />
//       )}
//     </div>
//   );
// };

// export default FeedFollow;

import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import Lookbook from '../lookbook/Lookbook';
import LookbookList from '../lookbook/LookbookList';
import { followFeed } from '../../api/lookbook/feed';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import plus from '../../assets/icons/plusicon.png';
import useUserStore from '../../data/lookbook/userStore';

const FeedFollow = () => {
  const [followersData, setFollowersData] = useState([]);
  const [visibleLookbooks, setVisibleLookbooks] = useState({});
  const [selectedFollower, setSelectedFollower] = useState(null);

  const scrollRefs = useRef([]);

  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    try {
      const data = followFeed();
      // const data = followFeed(userId);
      setFollowersData(data);
      setVisibleLookbooks(
        data.reduce(
          (acc, follower) => ({ ...acc, [follower.nickname]: 10 }),
          {}
        )
      );
      // 각 팔로워의 스크롤 컨테이너에 대한 참조를 생성합니다.
      scrollRefs.current = data.map(() => React.createRef());
    } catch (error) {
      console.error(error);
    }
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
          <p className="ml-2 text-xl font-bold">{follower.nickname}</p>
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
                    <Lookbook data={lookbook} />
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
