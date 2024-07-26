import React, { useState, useRef } from 'react';
import Lookbook from '../lookbook/Lookbook';
import LookbookList from '../lookbook/LookbookList';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import plus from '../../assets/icons/plusicon.png';

const Recommend = () => {
    const lookbooksData = {
        '키·몸무게': Array.from({ length: 15 }, (_, idx) => ({ id: idx + 1, attributes: { height: 180, weight: 75, bodyType: 'Athletic', style: 'Casual' } })),
        '체형': Array.from({ length: 8 }, (_, idx) => ({ id: idx + 1, attributes: { height: 160, weight: 60, bodyType: 'Slim', style: 'Formal' } })),
        '선호 스타일': Array.from({ length: 12 }, (_, idx) => ({ id: idx + 1, attributes: { height: 170, weight: 70, bodyType: 'Average', style: 'Casual' } })),
    };

    const initialLimit = 10;
    const [visibleLookbooks, setVisibleLookbooks] = useState(
        Object.keys(lookbooksData).reduce((acc, key) => ({ ...acc, [key]: initialLimit }), {})
    );
    const [selectedCategory, setSelectedCategory] = useState(null);

    const scrollRefs = {
        '키·몸무게': useRef(null),
        '체형': useRef(null),
        '선호 스타일': useRef(null),
    };

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
                    margin-right: -10px; /* Adjusted margin to ensure separation */
                }
                .button-no-style {
                    background: none;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                }
            `}</style>
            {Object.keys(lookbooksData).map((category) => (
                <div key={category} className="w-full">
                    <p className="ml-2 text-lg font-bold">#{category}</p>
                    <div className="relative">
                        <button
                            onClick={() => scrollLeft(scrollRefs[category])}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full w-6 h-6"
                            style={{ backgroundImage: `url(${leftArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        ></button>
                        <div ref={scrollRefs[category]} className="flex overflow-x-auto py-3 scrollbar-hide">
                            {lookbooksData[category].slice(0, visibleLookbooks[category]).map((lookbook) => (
                                <div key={lookbook.id} className="lookbook-container">
                                    <Lookbook data={lookbook} />
                                </div>
                            ))}
                            {visibleLookbooks[category] < lookbooksData[category].length && (
                                <div className="show-more-button">
                                    <button 
                                        onClick={() => showMore(category)} 
                                        className="relative bg-transparent border-none p-2 mb-32 cursor-pointer"
                                        style={{ marginLeft: '-8px' }} // Adjust this value as needed
                                    >
                                        <img src={plus} alt="Show more" className="w-6 h-6" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => scrollRight(scrollRefs[category])}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 mr-2 rounded-full w-6 h-6 z-10"
                            style={{ backgroundImage: `url(${rightArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        ></button>
                    </div>
                </div>
            ))}
            {selectedCategory && (
                <LookbookList
                    tag={selectedCategory}
                    lookbooks={lookbooksData[selectedCategory]}
                    onClose={closeDetailedView}
                />
            )}
        </div>
    );
};

export default Recommend;
