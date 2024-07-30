import React, { useState, useRef } from 'react';

const Comment = ({ comments }) => {
  const [commentList, setCommentList] = useState(
    comments.map((comment) => ({
      ...comment,
      replies: comment.replies || [], // replies가 undefined일 경우 빈 배열로 초기화
      showReplies: false, // 답글 표시 여부
    }))
  );
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null); // 답글을 다는 대상의 인덱스를 관리
  const inputRef = useRef(null); // 입력 필드에 대한 ref 생성

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const now = new Date();
      const newCommentObject = {
        author: '사용자', // 실제 사용자 이름으로 대체할 수 있습니다.
        text: newComment,
        time: now,
        replies: [], // 대댓글 배열 추가
      };

      if (replyTo !== null) {
        // 답글을 다는 경우
        const updatedComments = [...commentList];
        updatedComments[replyTo].replies.push(newCommentObject);
        setCommentList(updatedComments);
        setReplyTo(null); // 답글 대상 초기화
      } else {
        // 일반 댓글을 다는 경우
        setCommentList([...commentList, newCommentObject]);
      }

      setNewComment('');
    }
  };

  const handleReply = (index, author) => {
    setReplyTo(index);
    setNewComment(`@${author} `); // 인풋 필드에 댓글 작성자 이름을 자동으로 추가
    inputRef.current?.focus(); // 입력 필드로 포커스 이동
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 스크롤 이동
  };

  const toggleReplies = (index) => {
    const updatedComments = [...commentList];
    updatedComments[index].showReplies = !updatedComments[index].showReplies;
    setCommentList(updatedComments);
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
      {commentList.map((comment, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center">
            <div className="text-[14px] bg-gray-100 rounded-md flex-grow">
              {comment.text}
            </div>
            <div className="text-[11px] text-slate-500 ml-2 mr-2">
              {timeAgo(comment.time)}
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
              onClick={() => handleReply(index, comment.author)}
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
                      ➥{reply.text}
                    </div>
                    <div className="text-[10px] text-slate-500 ml-2 mr-2">
                      {timeAgo(reply.time)}
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
