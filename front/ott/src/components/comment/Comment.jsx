import React from 'react';

const Comment = ({ comments }) => {
    return (
        <div className="py-4">
            {comments.map((comment, index) => (
                <div key={index} className="mb-4">
                    <div className="text-sm bg-gray-100 rounded-md">
                        {comment.text}
                    </div>
                    <div className="text-xs text-slate-500 p-1 mt-1" style={{fontSize:'12px'}}>
                        {comment.time}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comment;