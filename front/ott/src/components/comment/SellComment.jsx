import React, { useState, useRef } from 'react';

// 더미 데이터
const initialComments = [
  {
    id: 1,
    user: 'seller',
    content: '판매자 댓글입니다.',
    time: new Date(new Date().getTime() - 3600 * 1000), // 1시간 전
    replies: [
      {
        id: 2,
        user: 'buyer1',
        content: '구매자1 댓글입니다.',
        time: new Date(new Date().getTime() - 1800 * 1000), // 30분 전
      },
      {
        id: 3,
        user: 'seller',
        content: '판매자 답글입니다.',
        time: new Date(new Date().getTime() - 900 * 1000), // 15분 전
      },
    ],
  },
  {
    id: 4,
    user: 'buyer2',
    content: '구매자2 댓글입니다.',
    time: new Date(new Date().getTime() - 7200 * 1000), // 2시간 전
    replies: [
      {
        id: 5,
        user: 'seller',
        content: '판매자 답글입니다.',
        time: new Date(new Date().getTime() - 3600 * 1000), // 1시간 전
      },
    ],
  },
  {
    id: 6,
    user: 'buyer3',
    content: '구매자3 댓글입니다.',
    time: new Date(new Date().getTime() - 86400 * 1000), // 하루 전
    replies: [],
  },
];

const userRole = 'buyer3'; // 현재 사용자의 역할: 'seller', 'buyer1', 'buyer2', 'buyer3', 'other'

const SellComment = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const inputRef = useRef(null); // 입력 필드에 대한 ref 생성

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      if (replyTo !== null) {
        // 대댓글 추가
        const updatedComments = comments.map((comment) =>
          comment.id === replyTo
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now(), // 고유한 ID 사용
                    user: userRole,
                    content: newComment,
                    time: new Date(), // 현재 시간
                  },
                ],
              }
            : comment
        );
        setComments(updatedComments);
        setReplyTo(null);
      } else {
        // 일반 댓글 추가
        const newCommentObject = {
          id: Date.now(), // 고유 ID 보장
          user: userRole,
          content: newComment,
          time: new Date(), // 현재 시간
          replies: [],
        };
        setComments([...comments, newCommentObject]);
      }
      setNewComment('');
    }
  };

  const handleReplyTo = (commentId, author) => {
    setReplyTo(commentId);
    setNewComment(`@${author} `); // 인풋 필드에 댓글 작성자 이름을 자동으로 추가
    inputRef.current?.focus(); // 입력 필드로 포커스 이동
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 스크롤 이동
  };

  const timeAgo = (time) => {
    const now = new Date();
    const diff = (now - new Date(time)) / 1000; // 초 단위로 차이 계산
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
      {comments.map((comment, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center">
            <div className="text-[14px] bg-gray-100 rounded-md flex-grow">
              <strong>{comment.user}</strong>: {comment.content}
            </div>
            <div className="text-[11px] text-slate-500 ml-2 mr-2">
              {timeAgo(comment.time)}
            </div>
          </div>
          <button
            onClick={() => handleReplyTo(comment.id, comment.user)}
            className="text-[10px] mt-1 text-stone-500"
            style={{ background: 'none', fontFamily: 'dohyeon' }}
          >
            답글 달기
          </button>
          <div className="ml-4 mt-2">
            {comment.replies.map((reply, replyIndex) => (
              <div key={replyIndex} className="mb-2">
                <div className="flex justify-between items-center">
                  <div className="text-[13px] bg-gray-50 rounded-md p-2 flex-grow">
                    ➥<strong>{reply.user}</strong>: {reply.content}
                  </div>
                  <div className="text-[10px] text-slate-500 ml-2 mr-2">
                    {timeAgo(reply.time)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <form onSubmit={handleAddComment} className="flex items-center mt-4">
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

export default SellComment;
