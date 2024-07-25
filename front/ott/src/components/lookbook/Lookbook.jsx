import React from 'react';
const Lookbook = ({ width = 'w-40', height = 'h-50', textSize = 'text-base', imgHeight = 'h-24' }) => {
    return (
        <div className={`${width} ${height} rounded-lg overflow-hidden shadow-lg bg-white m-3 flex-shrink-0`}>
            <div className="px-4 py-2 flex justify-between items-center">
                <div className={`font-bold ${textSize} mb-1`}>이름</div>
                <p className="text-gray-600 text-xs">몇시간전</p>
            </div>
            <div className="px-3 py-1">
                <img className={`w-full ${imgHeight} object-cover`} src="https://via.placeholder.com/150" alt="Lookbook Image" />
            </div>
            <div className="px-4 pb-2 flex justify-end items-center">
                <div className="flex items-center space-x-1">
                    <span className={`text-gray-600 ${textSize}`}>❤ 42</span>
                    <span className={`text-gray-600 ${textSize}`}>🗨 2</span>
                </div>
            </div>
        </div>
    );
};

export default Lookbook;
