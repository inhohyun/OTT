import { useRef } from 'react';
import Lookbook from '../lookbook/Lookbook';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import React from 'react';

const PublicPosts = () => {
    // Create an array with the length of 10 for rendering multiple Lookbook components
    const lookbooks = Array.from({ length: 10 });

    // Reference for scroll container
    const containerRef = useRef(null);

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
        <div className="flex flex-col items-center w-full p-5 space-y-5">
            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                }
            `}</style>
            <div className="w-full">
                <div className="relative flex items-center">
                    <button
                        onClick={() => scrollLeft(containerRef)}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                        style={{ backgroundImage: `url(${leftArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                    ></button>
                    <div ref={containerRef} className="overflow-x-auto scrollbar-hide flex space-x-4">
                        <div className="flex flex-col space-y-4">
                            <div className="flex space-x-4">
                                {lookbooks.slice(0, 5).map((_, index) => (
                                    <Lookbook key={index} size="small"/>
                                ))}
                            </div>
                            <div className="flex space-x-4">
                                {lookbooks.slice(5).map((_, index) => (
                                    <Lookbook key={index + 5} size="small"/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => scrollRight(containerRef)}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                        style={{ backgroundImage: `url(${rightArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default PublicPosts;
