import React from 'react';

const Lookbook = ({ size = 'normal' }) => {
    const sizeClasses = size === 'small' ? 'w-40 h-45' : 'w-60 h-60';
    const textSizeClasses = size === 'small' ? 'text-sm' : 'text-lg';
    const imageSizeClasses = size === 'small' ? 'h-24' : 'h-32';

    return (
        <div className={`${sizeClasses} rounded-lg overflow-hidden shadow-lg bg-white m-3 flex-shrink-0`}>
            <div className="px-6 py-3 flex justify-between items-center">
                <div className={`font-bold ${textSizeClasses} mb-1`}>이름</div>
                <p className="text-gray-600 text-sm">몇시간전</p>
            </div>
            <div className="px-3 py-1">
                <img className={`w-full ${imageSizeClasses} object-cover`} src="https://via.placeholder.com/150" alt="Lookbook Image" />
            </div>
            <div className="px-6 pt-1 pb-1 flex justify-end items-center">
                <div className="flex items-center space-x-1">
                    <span className="text-gray-600 text-sm">❤ 42</span>
                    <span className="text-gray-600 text-sm">🗨 2</span>
                </div>
            </div>
        </div>
    );
};

export default Lookbook;
