import React, { useState } from 'react';
import cancel from '../../assets/icons/blackdeleteicon.png';
import Comment from '../comment/Comment';
import SellComment from '../comment/SellComment';

const LookbookDetail = ({ lookbook, onClose }) => {
    if (!lookbook) return null;

    // Safeguard to ensure these properties are arrays
    const tags = Array.isArray(lookbook.tags) ? lookbook.tags : [];
    const itemsForSale = Array.isArray(lookbook.itemsForSale) ? lookbook.itemsForSale : [];
    const comments = Array.isArray(lookbook.comments) ? lookbook.comments : [];

    // State to determine which comment section to display
    const [showSellComments, setShowSellComments] = useState(false);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    className="absolute top-4 right-4 p-0 bg-transparent border-none" 
                    onClick={onClose}
                >
                    <img src={cancel} alt="cancel_icon" className='w-4 h-4'/>
                </button>
                <div className='flex items-center mb-4'>
                    <div className="flex-grow">
                        <h2 className="text-xl font-bold">{lookbook.creatorName}</h2>
                        <p className="text-sm text-gray-500">{lookbook.date}</p>
                    </div>
                    <button className="bg-purple-300 text-white text-sm px-3 py-3 rounded-lg me-3" style={{fontFamily:'dohyeon'}}>
                        팔로우
                    </button>
                </div>
                <div className="w-full border-solid border-t-2 border-slate-500 mt-4"></div>
                <div className="mb-4 flex mt-2">
                    <div className="flex justify-center w-[200px] h-[200px]">
                        <img src={lookbook.image} alt={lookbook.name} className="w-full h-auto object-cover rounded-lg" />
                    </div>
                    <div className="flex flex-col items-start gap-2 mt-3 ml-3">
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-black text-white text-sm rounded-lg px-2 py-1 inline-block">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-lg font-semibold">판매중인 옷</h4>
                    <div className="flex flex-wrap gap-4">
                        {itemsForSale.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                <p className="text-sm">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-4">
                        <span>❤ {lookbook.likes}</span>
                        <span>Views {lookbook.views}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                        <p 
                            className={`text-lg cursor-pointer ${!showSellComments ? 'text-black font-bold' : 'text-slate-500'}`}
                            onClick={() => setShowSellComments(false)}
                        >
                            댓글
                        </p>
                        <p 
                            className={`text-lg cursor-pointer ${showSellComments ? 'text-black font-bold' : 'text-slate-500'}`}
                            onClick={() => setShowSellComments(true)}
                        >
                            판매용 댓글
                        </p>
                    </div>
                    {showSellComments ? (
                        <SellComment comments={comments} />
                    ) : (
                        <Comment comments={comments} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LookbookDetail;
