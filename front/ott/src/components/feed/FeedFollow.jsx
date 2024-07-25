import React, { useState, useRef } from 'react';
import Lookbook from '../lookbook/Lookbook';
import LookbookList from '../lookbook/LookbookList';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import plus from '../../assets/icons/plusicon.png';

const FeedFollow = () => {
    const followers = ['팔로워1', '팔로워2', '팔로워3', '팔로워4', '팔로워5', '팔로워6'];

    const allLookbooks = {
        '팔로워1': Array.from({ length: 5 }),
        '팔로워2': Array.from({ length: 20 }),
        '팔로워3': Array.from({ length: 8 }),
        '팔로워4': Array.from({ length: 15 }),
        '팔로워5': Array.from({ length: 3 }),
        '팔로워6': Array.from({ length: 12 }),
    };

    const initialLimit = 10;

    const [visibleLookbooks, setVisibleLookbooks] = useState(
        followers.reduce((acc, follower) => ({ ...acc, [follower]: initialLimit }), {})
    );
    const [selectedFollower, setSelectedFollower] = useState(null);

    const scrollRefs = useRef(followers.map(() => React.createRef()));

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

    const showMore = (follower) => {
        setSelectedFollower(follower);
    };

    const closeDetailedView = () => {
        setSelectedFollower(null);
    };

    return (
        <div className="relative flex flex-col items-start w-full p-5 space-y-5">
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
                    margin: 0 2px; /* Further reduced margin */
                }
                .button-no-style {
                    background: none;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                }
            `}</style>
            {followers.map((follower, index) => (
                <div key={follower} className="w-full">
                    <p className="ml-2 text-xl font-bold">{follower}</p>
                    <div className="relative">
                        <button
                            onClick={() => scrollLeft(scrollRefs.current[index])}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full w-8 h-8"
                            style={{ backgroundImage: `url(${leftArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        ></button>
                        <div ref={scrollRefs.current[index]} className="flex overflow-x-auto py-4 scrollbar-hide">
                            {allLookbooks[follower].slice(0, visibleLookbooks[follower]).map((_, lookbookIndex) => (
                                <div key={lookbookIndex} className="lookbook-container">
                                    <Lookbook />
                                </div>
                            ))}
                            {visibleLookbooks[follower] < allLookbooks[follower].length && (
                                <div className="show-more-button">
                                    <button onClick={() => showMore(follower)} className="relative top-[-70px] bg-transparent border-none p-0 m-0 cursor-pointer">
                                        <img src={plus} alt="Show more" className="w-6 h-6" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => scrollRight(scrollRefs.current[index])}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full w-8 h-8"
                            style={{ backgroundImage: `url(${rightArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        ></button>
                    </div>
                </div>
            ))}
            {selectedFollower && (
                <LookbookList
                    tag={selectedFollower}
                    lookbooks={allLookbooks[selectedFollower]}
                    onClose={closeDetailedView}
                />
            )}
        </div>
    );
};

export default FeedFollow;
