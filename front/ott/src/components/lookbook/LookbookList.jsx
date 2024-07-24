import React from 'react';
import Lookbook from "./Lookbook";
import deleteicon from '../../assets/icons/blackdeleteicon.png'

const LookbookList = ({ tag, lookbooks, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
            onClick={onClose}
        >
            <div 
                className="bg-white p-4 rounded-lg shadow-lg overflow-auto w-full max-w-md h-full max-h-3/4"
                onClick={(e) => e.stopPropagation()}  // Prevent modal from closing when clicking inside
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">#{tag}</h2>
                    <button onClick={onClose} className="w-6 h-6 p-0 bg-transparent border-none">
                        <img src={deleteicon} alt="Close" className="w-full h-full bg-transparent" />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {lookbooks.map((_, index) => (
                        <Lookbook key={index} width="w-30" height="h-50" textSize="text-sm" imgHeight="h-16" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LookbookList;