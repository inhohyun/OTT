import React, { useState, useRef } from 'react';
import { dummyLookbooks } from '../lookbook/lookbookdata'; // Import the dummy data
import Lookbook from '../lookbook/Lookbook';
import LookbookList from '../lookbook/LookbookList';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import plus from '../../assets/icons/plusicon.png';

const MyLookbook = () => {
  const currentUser = 'John'; // Replace with dynamic user data in a real application

  // Filter lookbooks based on the current user
  const userLookbooks = dummyLookbooks.filter(
    (lookbook) => lookbook.nickname === currentUser
  );

  // Categorize lookbooks by tags
  const categorizedLookbooks = userLookbooks.reduce((acc, lookbook) => {
    lookbook.tags.forEach((tag) => {
      if (!acc[tag]) acc[tag] = [];
      acc[tag].push(lookbook);
    });
    return acc;
  }, {});

  const tags = Object.keys(categorizedLookbooks);

  const initialLimit = 10;
  const [visibleLookbooks, setVisibleLookbooks] = useState(
    tags.reduce((acc, tag) => ({ ...acc, [tag]: initialLimit }), {})
  );
  const [selectedTag, setSelectedTag] = useState(null);

  const scrollRefs = useRef(tags.map(() => React.createRef()));

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

  const showMore = (tag) => {
    setSelectedTag(tag);
  };

  const closeDetailedView = () => {
    setSelectedTag(null);
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

      {tags.map((tag, index) => (
        <div key={tag} className="w-full">
          <p className="ml-2 text-xl font-bold">{tag}</p>
          <div className="relative">
            {categorizedLookbooks[tag].length > 3 && (
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
              {categorizedLookbooks[tag]
                .slice(0, visibleLookbooks[tag])
                .map((lookbook) => (
                  <div key={lookbook.id} className="lookbook-container">
                    <Lookbook data={lookbook} />
                  </div>
                ))}
              {visibleLookbooks[tag] < categorizedLookbooks[tag].length && (
                <div className="show-more-button">
                  <button
                    onClick={() => showMore(tag)}
                    className="relative bg-transparent border-none p-0 mb-32 cursor-pointer"
                  >
                    <img src={plus} alt="Show more" className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
            {categorizedLookbooks[tag].length > 3 && (
              <button
                onClick={() => scrollRight(scrollRefs.current[index])}
                className="absolute right-0 top-1/2 transform -translate-y-1/2  p-1 mr-2 w-6 h-6"
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
      {selectedTag && (
        <LookbookList
          tag={selectedTag}
          lookbooks={categorizedLookbooks[selectedTag]}
          onClose={closeDetailedView}
        />
      )}
    </div>
  );
};

export default MyLookbook;
