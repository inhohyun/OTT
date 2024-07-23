import { useRef } from 'react';
import Lookbook from '../lookbook/Lookbook';
import leftArrow from '../../assets/icons/left_arrow_icon.png'
import rightArrow from '../../assets/icons/right_arrow_icon.png'


const Recommend = () => {
    // Create an array with the length of 10 for rendering multiple Lookbook components
    const lookbooks = Array.from({ length: 10 });

    // References for scroll containers
    const cmKgSectionRef = useRef(null);
    const typeSectionRef = useRef(null);
    const styleSectionRef = useRef(null);

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
            <div className="w-full">
                <p className="ml-2 text-xl font-bold">#키·몸무게</p>
                <div className="relative">
                <button
                    onClick={() => scrollLeft(cmKgSectionRef)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                    style={{ backgroundImage: `url(${leftArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                ></button>
                    <div ref={cmKgSectionRef} className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
                        {lookbooks.map((_, index) => (
                            <Lookbook key={index} />
                        ))}
                    </div>
                    <button onClick={() => scrollRight(cmKgSectionRef)} 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                        style={{ backgroundImage: `url(${rightArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        >
                    </button>
                </div>
            </div>
            <div className="w-full">
                <p className="ml-2 text-xl font-bold">#체형</p>
                <div className="relative">
                <button
                    onClick={() => scrollLeft(typeSectionRef)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                    style={{ backgroundImage: `url(${leftArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                ></button>
                    <div ref={typeSectionRef} className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
                        {lookbooks.map((_, index) => (
                            <Lookbook key={index} />
                        ))}
                    </div>
                    <button onClick={() => scrollRight(typeSectionRef)} 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                        style={{ backgroundImage: `url(${rightArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        >
                    </button>
                </div>
            </div>
            <div className="w-full">
                <p className="ml-2 text-xl font-bold">#선호 스타일</p>
                <div className="relative">
                <button
                    onClick={() => scrollLeft(styleSectionRef)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                    style={{ backgroundImage: `url(${leftArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                ></button>
                    <div ref={styleSectionRef} className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
                        {lookbooks.map((_, index) => (
                            <Lookbook key={index} />
                        ))}
                    </div>
                    <button
                    onClick={() => scrollRight(styleSectionRef)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
                    style={{ backgroundImage: `url(${rightArrow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                ></button>
                </div>
            </div>
        </div>
    );
};

export default Recommend;
