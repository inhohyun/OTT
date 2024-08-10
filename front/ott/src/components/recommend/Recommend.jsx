import React, { useState, useRef, useEffect } from 'react';
import {
  heightWeight,
  bodyType,
  getTagRecommend,
} from '../../api/lookbook/recommend'; // Adjust the import path
import useLookbookStore from '../../data/lookbook/detailStore';
import Lookbook from '../lookbook/Lookbook';
import LookbookDetail from '../lookbook/LookbookDetail';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import plus from '../../assets/icons/plusicon.png';
import LookbookList from '../lookbook/LookbookList';
import CustomSpinner from '../common/CustomSpinner';

const Recommend = () => {
  const categories = ['키·몸무게', '체형', '선호 스타일'];
  const [heightWeightRecommend, setHeightWeightRecommend] = useState([]);
  const [bodyTypeRecommend, setBodyTypeRecommend] = useState([]);
  const [styleRecommend, setStyleRecommend] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { hideDetail } = useLookbookStore();

  const memberId = 1;

  const fetchData = async () => {
    try {
      const heightWeightData = await heightWeight(memberId);
      const bodyTypeData = await bodyType(memberId);
      const styleData = await getTagRecommend(memberId);

      setHeightWeightRecommend(heightWeightData);
      setBodyTypeRecommend(bodyTypeData);
      setStyleRecommend(styleData);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberId]);

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

  const closeDetailedView = async () => {
    // console.log('모달 닫기한다고');
    hideDetail();
    await fetchData();
    // console.log('리렌더링');
    setSelectedCategory(null);
    setSelectedLookbook(null);
  };

  // Filtered lookbooks by API data
  const filteredLookbooks = {
    '키·몸무게': heightWeightRecommend,
    '체형': bodyTypeRecommend,
    '선호 스타일': styleRecommend,
  };

  if (isLoading) {
    return <CustomSpinner />;
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
              {filteredLookbooks[category]?.length > 0 ? (
                filteredLookbooks[category]
                  .slice(0, visibleLookbooks[category])
                  .map((lookbook) => {
                    return (
                      <div key={lookbook.id} className="lookbook-container">
                        <Lookbook
                          data={lookbook}
                          onClick={() => setSelectedLookbook(lookbook)}
                          onClose={closeDetailedView}
                        />
                      </div>
                    );
                  })
              ) : (
                // <p className="ml-2 text-lg font-bold">
                //   {category} 추천 리스트가 비어있음.
                // </p>
                <></>
              )}
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
      {/* {selectedLookbook && (
        <LookbookDetail
          lookbook={selectedLookbook}
          onClose={closeDetailedView}
        />
      )} */}
    </div>
  );
};

export default Recommend;
