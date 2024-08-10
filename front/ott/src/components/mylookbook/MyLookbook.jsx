import React, { useEffect, useState, useRef } from 'react';
import Lookbook from '../lookbook/Lookbook';
import LookbookList from '../lookbook/LookbookList';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import plus from '../../assets/icons/plusicon.png';
import useLookbookStore from '../../data/lookbook/detailStore';
import { fetchMyLookbooks } from '../../api/lookbook/mylookbook';
import useUserStore from '../../data/lookbook/userStore';
import EmptyLookbook from './EmptyLookbook';
import CustomSpinner from '../common/CustomSpinner';

const MyLookbook = () => {
  const initialLimit = 10;
  const { lookbooks, setLookbooks, deleteLookbook, hideDetail } =
    useLookbookStore();
  const [visibleLookbooks, setVisibleLookbooks] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  const scrollRefs = useRef({});
  const [isLoading, setIsLoading] = useState(true);

  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    const fetchInitialLookbooks = async () => {
      try {
        const lookbooksData = await fetchMyLookbooks(userId);
        if (Array.isArray(lookbooksData)) {
          setLookbooks(lookbooksData);

          const tags = Array.from(
            new Set(lookbooksData.flatMap((lb) => lb.tags || []))
          );
          console.log('Tags:', tags);

          setVisibleLookbooks(
            tags.reduce((acc, tag) => ({ ...acc, [tag]: initialLimit }), {})
          );

          tags.forEach((tag) => {
            if (!scrollRefs.current[tag]) {
              scrollRefs.current[tag] = React.createRef();
            }
          });
        } else {
          console.error('Fetched data is not an array:', lookbooksData);
        }
      } catch (error) {
        console.error('Error fetching lookbooks:', error);
      } finally {
        setIsLoading(false); // 로딩 완료 후 isLoading을 false로 설정
      }
    };

    fetchInitialLookbooks();
  }, [setLookbooks, userId]);

  const handleDelete = (deletedLookbookId) => {
    deleteLookbook(deletedLookbookId);
    // handleCloseDetail();
    hideDetail();
  };

  const handleCloseDetail = async () => {
    console.log('[*]모달 닫기');
    hideDetail();
    const lookbooksData = await fetchMyLookbooks(userId);
    console.log('[*] 내룩북 불러오기');
    if (Array.isArray(lookbooksData)) {
      await setLookbooks(lookbooksData);
    } else {
      console.error('Fetched data is not an array:', lookbooksData);
    }
  };

  const categorizedLookbooks = Array.isArray(lookbooks)
    ? lookbooks.reduce((acc, lookbook) => {
        const lookbookTags = Array.isArray(lookbook.tags) ? lookbook.tags : [];
        lookbookTags.forEach((tag) => {
          if (!acc[tag]) acc[tag] = [];
          acc[tag].push(lookbook);
        });
        return acc;
      }, {})
    : {};

  const tags = Object.keys(categorizedLookbooks);
  console.log('Categorized lookbooks:', categorizedLookbooks);

  const scrollLeft = (tag) => {
    if (scrollRefs.current[tag] && scrollRefs.current[tag].current) {
      scrollRefs.current[tag].current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = (tag) => {
    if (scrollRefs.current[tag] && scrollRefs.current[tag].current) {
      scrollRefs.current[tag].current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  const showMore = (tag) => {
    setVisibleLookbooks((prevState) => ({
      ...prevState,
      [tag]: prevState[tag] + initialLimit,
    }));
    setSelectedTag(tag);
  };

  const closeDetailedView = () => {
    setSelectedTag(null);
  };

  if (!Array.isArray(lookbooks) || !lookbooks.length) {
    return <EmptyLookbook />;
  }

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

      {tags.map((tag) => (
        <div key={tag} className="w-full">
          <p className="ml-2 text-xl font-bold">{tag}</p>
          <div className="relative">
            {categorizedLookbooks[tag] &&
              categorizedLookbooks[tag].length > 3 && (
                <button
                  key={`${tag}-left-button`}
                  onClick={() => scrollLeft(tag)}
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
              ref={scrollRefs.current[tag]}
              className="flex overflow-x-auto py-3 scrollbar-hide"
            >
              {categorizedLookbooks[tag] &&
                categorizedLookbooks[tag]
                  .slice(0, visibleLookbooks[tag])
                  .map((lookbook) => (
                    <div
                      key={`${tag}-${lookbook.id}`}
                      className="lookbook-container"
                    >
                      <Lookbook
                        data={lookbook}
                        onDelete={handleDelete}
                        onClose={handleCloseDetail}
                      />
                    </div>
                  ))}
              {visibleLookbooks[tag] <
                (categorizedLookbooks[tag]?.length || 0) && (
                <div key={`${tag}-show-more`} className="show-more-button">
                  <button
                    onClick={() => showMore(tag)}
                    className="relative bg-transparent border-none p-0 mb-32 cursor-pointer"
                  >
                    <img src={plus} alt="Show more" className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
            {categorizedLookbooks[tag] &&
              categorizedLookbooks[tag].length > 3 && (
                <button
                  key={`${tag}-right-button`}
                  onClick={() => scrollRight(tag)}
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
      {selectedTag && (
        <LookbookList
          key={`lookbook-list-${selectedTag}`}
          tag={selectedTag}
          lookbooks={categorizedLookbooks[selectedTag]}
          onClose={closeDetailedView}
        />
      )}
    </div>
  );
};

export default MyLookbook;
