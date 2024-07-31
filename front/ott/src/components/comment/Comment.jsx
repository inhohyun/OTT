import React, { useState, useRef } from 'react';

const Comment = ({ comments }) => {
  const [commentList, setCommentList] = useState(
    comments.map((comment) => ({
      ...comment,
      replies: comment.children || [], // Initialize with children if available
      showReplies: false, // Control the visibility of replies
    }))
  );
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null); // Track which comment is being replied to
  const inputRef = useRef(null); // Ref for the input field

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const now = new Date().toISOString(); // Get current time in ISO format
      const newCommentObject = {
        nickname: '사용자', // Replace with the actual user nickname
        msg: newComment,
        createdAt: now,
        replies: [], // Array to store replies
      };

      if (replyTo !== null) {
        // Adding a reply to an existing comment
        const updatedComments = [...commentList];
        updatedComments[replyTo].replies.push(newCommentObject);
        setCommentList(updatedComments);
        setReplyTo(null); // Reset the replyTo state
      } else {
        // Adding a new comment
        setCommentList([...commentList, newCommentObject]);
      }

      setNewComment('');
    }
  };

  const handleReply = (index, author) => {
    setReplyTo(index);
    setNewComment(`@${author} `);
    inputRef.current?.focus();
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const toggleReplies = (index) => {
    const updatedComments = [...commentList];
    updatedComments[index].showReplies = !updatedComments[index].showReplies;
    setCommentList(updatedComments);
  };

  const timeAgo = (time) => {
    const now = new Date();
    const diff = (now - new Date(time)) / 1000;
    if (diff < 60) {
      return `${Math.floor(diff)}초 전`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}분 전`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)}시간 전`;
    } else {
      return `${Math.floor(diff / 86400)}일 전`;
    }
  };

  return (
    <div className="py-4">
      {commentList.map((comment, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center">
            <div className="text-[14px] bg-gray-100 rounded-md flex-grow">
              {comment.msg}
            </div>
            <div className="text-[11px] text-slate-500 ml-2 mr-2">
              {timeAgo(comment.createdAt)}
            </div>
          </div>
          <div className="flex items-center mt-1">
            {comment.replies.length > 0 && (
              <button
                onClick={() => toggleReplies(index)}
                className="text-[10px] mr-2"
                style={{ fontFamily: 'dohyeon', background: 'none' }}
              >
                답글 {comment.replies.length}개
              </button>
            )}
            <button
              onClick={() => handleReply(index, comment.nickname)}
              className="text-[10px] text-stone-500"
              style={{ background: 'none', fontFamily: 'dohyeon' }}
            >
              답글 달기
            </button>
          </div>
          {comment.showReplies && (
            <div className="ml-4 mt-2">
              {comment.replies.map((reply, replyIndex) => (
                <div key={replyIndex} className="mb-2">
                  <div className="flex justify-between items-center">
                    <div className="text-[13px] bg-gray-50 rounded-md p-2 flex-grow">
                      ➥{reply.msg}
                    </div>
                    <div className="text-[10px] text-slate-500 ml-2 mr-2">
                      {timeAgo(reply.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <form onSubmit={handleAddComment} className="flex items-center mt-4 mr-4">
        <input
          ref={inputRef}
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border rounded-full w-full p-2 mb-2 flex-grow"
          placeholder="댓글을 작성하세요"
          style={{ fontFamily: 'dohyeon' }}
        />
      </form>
    </div>
  );
};

export default Comment;
