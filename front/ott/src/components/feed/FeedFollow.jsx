import React,{ useRef } from 'react';
import Lookbook from '../lookbook/Lookbook';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';

const FeedFollow = () => {
    // Dummy data for followers
    const followers = ['팔로워1', '팔로워2', '팔로워3', '팔로워4', '팔로워5', '팔로워6'];

    // Create an array with the length of 10 for rendering multiple Lookbook components
    const lookbooks = Array.from({ length: 10 });

    // References for scroll containers
    const scrollRefs = useRef(followers.map(() => React.createRef()));

    // Scroll functions
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

    return (
        <div className="flex flex-col items-start w-full p-5 space-y-5">
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
            {followers.map((follower, index) => (
                <div key={follower} className="w-full">
                    <p className="ml-2 text-xl font-bold">{follower}</p>
                    <div className="relative">
                        <button
                            onClick={() => scrollLeft(scrollRefs.current[index])}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                            style={{ backgroundImage: `url(${leftArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        ></button>
                        <div ref={scrollRefs.current[index]} className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
                            {lookbooks.map((_, lookbookIndex) => (
                                <Lookbook key={lookbookIndex} />
                            ))}
                        </div>
                        <button
                            onClick={() => scrollRight(scrollRefs.current[index])}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                            style={{ backgroundImage: `url(${rightArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        ></button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedFollow;
