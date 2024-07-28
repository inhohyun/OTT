import React from 'react';
import Lookbook from "./Lookbook";
import deleteicon from '../../assets/icons/blackdeleteicon.png';

const LookbookList = ({ tag, lookbooks, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
            onClick={onClose}
        >
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
            <div 
                className="bg-white p-2 rounded-2xl shadow-lg w-full max-w-xs overflow-hidden"
                style={{ maxHeight: '75vh' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-2 mt-2">
                    <h2 className="text-xs font-bold" style={{ fontSize: '20px' }}>#{tag}</h2>
                    <button onClick={onClose} className="w-6 h-6 p-0 bg-transparent border-none">
                        <img src={deleteicon} alt="Close" className="w-full h-full bg-transparent" />
                    </button>
                </div>
                <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(75vh - 64px)' }}>
                    <div className="grid grid-cols-2 gap-0 mb-0"> {/* gap과 margin 줄이기 */}
                        {lookbooks.map((lookbook, index) => (
                            <Lookbook key={index} data={lookbook} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LookbookList;
