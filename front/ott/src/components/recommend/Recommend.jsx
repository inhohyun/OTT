import React, { useState, useRef } from 'react';
import { dummyLookbooks, dummyUsers } from '../lookbook/lookbookdata'; // Adjust the import path
import Lookbook from '../lookbook/Lookbook';
import LookbookDetail from '../lookbook/LookbookDetail';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import plus from '../../assets/icons/plusicon.png';
import LookbookList from '../lookbook/LookbookList';

const Recommend = () => {
  const categories = ['키·몸무게', '체형', '선호 스타일'];

  // Define user attributes for filtering recommendations
  const userAttributes = {
    height: 175,
    weight: 70,
    bodyType: 0,
    style: '#Casual', // Ensure this matches the format in lookbooks
  };

  const currentUser = 'John';

  const initialLimit = 10;
  const [visibleLookbooks, setVisibleLookbooks] = useState(
    categories.reduce(
      (acc, category) => ({ ...acc, [category]: initialLimit }),
      {}
    )
  );
  const [selectedLookbook, setSelectedLookbook] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const scrollRefs = categories.reduce(
    (acc, category) => ({ ...acc, [category]: useRef(null) }),
    {}
  );

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

  const showMore = (category) => {
    setSelectedCategory(category);
  };

  const closeDetailedView = () => {
    setSelectedCategory(null);
  };

  const filterLookbooksByNickname = (lookbooks, nicknames) => {
    return lookbooks.filter(
      (lookbook) =>
        nicknames.includes(lookbook.nickname) &&
        lookbook.nickname !== currentUser
    );
  };

  const filterUsersByAttribute = (users, attribute, value) => {
    return users.filter((user) => user[attribute] === value);
  };

  // 1. Filter users based on height or weight
  const matchingUsersByHeightWeight = dummyUsers.filter(
    (user) =>
      user.height === userAttributes.height ||
      user.weight === userAttributes.weight
  );

  // 2. Filter users based on body type
  const matchingUsersByBodyType = filterUsersByAttribute(
    dummyUsers,
    'bodyType',
    userAttributes.bodyType
  );

  // 3. Filter users based on preferred style tags
  const matchingUsersByStyle = dummyUsers.filter((user) =>
    user.tags.includes(userAttributes.style)
  );

  // 4. Extract nicknames from filtered users
  const nicknamesByHeightWeight = matchingUsersByHeightWeight.map(
    (user) => user.nickname
  );
  const nicknamesByBodyType = matchingUsersByBodyType.map(
    (user) => user.nickname
  );
  const nicknamesByStyle = matchingUsersByStyle.map((user) => user.nickname);

  // 5. Filter lookbooks based on nicknames
  const filteredLookbooks = {
    '키·몸무게': filterLookbooksByNickname(
      dummyLookbooks,
      nicknamesByHeightWeight
    ),
    '체형': filterLookbooksByNickname(dummyLookbooks, nicknamesByBodyType),
    '선호 스타일': filterLookbooksByNickname(dummyLookbooks, nicknamesByStyle),
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
          margin-right: -10px;
        }
        .button-no-style {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
      `}</style>

      {categories.map((category) => (
        <div key={category} className="w-full">
          <p className="ml-2 text-lg font-bold">#{category}</p>
          <div className="relative">
            {filteredLookbooks[category]?.length > 3 && (
              <button
                onClick={() => scrollLeft(scrollRefs[category])}
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
              ref={scrollRefs[category]}
              className="flex overflow-x-auto py-3 scrollbar-hide"
            >
              {filteredLookbooks[category]
                ?.slice(0, visibleLookbooks[category])
                .map((lookbook) => (
                  <div key={lookbook.id} className="lookbook-container">
                    <Lookbook
                      data={lookbook}
                      onClick={() => setSelectedLookbook(lookbook)}
                    />
                  </div>
                ))}
              {visibleLookbooks[category] <
                filteredLookbooks[category]?.length && (
                <div className="show-more-button">
                  <button
                    onClick={() => showMore(category)}
                    className="relative bg-transparent border-none p-2 mb-32 cursor-pointer"
                    style={{ marginLeft: '-8px' }}
                  >
                    <img src={plus} alt="Show more" className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
            {filteredLookbooks[category]?.length > 3 && (
              <button
                onClick={() => scrollRight(scrollRefs[category])}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 mr-2 w-6 h-6"
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
      {selectedCategory && (
        <LookbookList
          tag={selectedCategory}
          lookbooks={filteredLookbooks[selectedCategory]}
          onClose={closeDetailedView}
        />
      )}
      {selectedLookbook && (
        <LookbookDetail
          lookbook={selectedLookbook}
          onClose={closeDetailedView}
        />
      )}
    </div>
  );
};

export default Recommend;
