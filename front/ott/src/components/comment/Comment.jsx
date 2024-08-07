import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
import {
  lookbookComment,
  commentCreate,
  replyCreate,
  commentUpdate,
  commentDelete,
  replyUpdate,
  replyDelete,
} from '../../api/lookbook/comments';

const Comment = ({ comments = [], lookbookId, lookbook }) => {
  const currentUser = 'kimssafy'; // Replace with the actual current user nickname
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null); // Track which comment is being replied to
  const [editingComment, setEditingComment] = useState(''); // Track the editing comment content
  const [editingReply, setEditingReply] = useState(''); // Track the editing reply content
  const inputRef = useRef(null); // Ref for the input field

  useEffect(() => {
    if (comments.length > 0) {
      setCommentList(
        comments.map((comment) => ({
          ...comment,
          id: comment.commentId,
          replies: (comment.children || []).map((reply) => ({
            ...reply,
            isEditing: false,
          })),
          showReplies: false,
          isEditing: false,
        }))
      );
    }
  }, [comments]);

  const fetchComments = async () => {
    try {
      const status = 'comment';
      const commentsData = await lookbookComment(lookbook, status);
      // console.log('룩북아이디', lookbookId);
      setCommentList(
        commentsData.map((comment) => ({
          ...comment,
          id: comment.commentId,
          replies: (comment.children || []).map((reply) => ({
            ...reply,
            isEditing: false, // 수정상태 false
          })),
          showReplies: false, // 답글 보여주는 상태 false
          isEditing: false, // 댓글 수정 상태 false
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const formData = new FormData();
      formData.append('uid', 1); // UID를 1로 설정
      const message =
        replyTo !== null
          ? newComment.split(' ').slice(1).join(' ')
          : newComment;
      formData.append('msg', message);
      formData.append('status', 'comment');

      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }
      if (replyTo !== null) {
        // 기존 댓글에 답글 추가
        try {
          replyCreate(formData, lookbookId, replyTo);
          setNewComment('');
          setReplyTo(null);
          fetchComments();
        } catch (error) {
          console.error(error);
        }
      } else {
        // 새로운 댓글 추가
        try {
          commentCreate(formData, lookbookId);
          setNewComment('');
          fetchComments(); // Fetch the latest comments after adding a new one
        } catch (error) {
          console.error('댓글 생성 실패:', error);
        }
      }
    }
  };

  const handleReply = (commentId, author) => {
    setReplyTo(commentId);
    setNewComment(`@${author} `);
    inputRef.current?.focus();
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const toggleReplies = (commentId) => {
    const updatedComments = commentList.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, showReplies: !comment.showReplies };
      }
      return comment;
    });
    setCommentList(updatedComments);
  };

  const handleEditComment = (commentId) => {
    const updatedComments = commentList.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, isEditing: true };
      }
      return comment;
    });
    setEditingComment(
      commentList.find((comment) => comment.id === commentId).msg
    );
    setCommentList(updatedComments);
  };

  const handleSaveEdit = (commentId) => {
    const formData = new FormData();
    formData.append('uid', 1);
    formData.append('msg', editingComment);
    formData.append('status', 'comment');

    try {
      commentUpdate(formData, lookbookId, commentId);
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = (commentId) => {
    try {
      commentDelete(lookbookId, commentId);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e, commentId) => {
    if (e.key === 'Enter') {
      handleSaveEdit(commentId);
    }
  };

  const handleEditReply = (commentId, replyId) => {
    const updatedComments = commentList.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.commentId === replyId) {
              return { ...reply, isEditing: true };
            }
            return reply;
          }),
        };
      }
      return comment;
    });
    setEditingReply(
      commentList
        .find((comment) => comment.id === commentId)
        .replies.find((reply) => reply.commentId === replyId).msg
    );
    setCommentList(updatedComments);
  };

  const handleSaveEditReply = (commentId, replyId) => {
    const formData = new FormData();
    formData.append('uid', 1);
    formData.append('msg', editingComment);
    formData.append('status', 'comment');

    try {
      replyUpdate(formData, lookbookId, replyId);
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReply = (commentId, replyId) => {
    try {
      replyDelete(lookbookId, replyId);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDownReply = (e, commentId, replyId) => {
    if (e.key === 'Enter') {
      handleSaveEditReply(commentId, replyId);
    }
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
    <div className="py-2">
      {commentList.length === 0 ? (
        <div className="text-center text-gray-500">댓글이 없습니다</div>
      ) : (
        commentList.map((comment) => (
          <div key={comment.id} className="mb-4">
            <div className="flex justify-between items-center">
              {comment.isEditing ? (
                <input
                  id="updateInput"
                  type="text"
                  value={editingComment}
                  onChange={(e) => setEditingComment(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, comment.id)}
                  className="text-[14px] bg-gray-100 rounded-md flex-grow"
                />
              ) : (
                <div className="text-[14px] bg-gray-100 rounded-md flex-grow">
                  {comment.msg}
                </div>
              )}
              {comment.nickname === currentUser && (
                <div className="flex space-x-2">
                  {!comment.isEditing && (
                    <>
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="text-[10px] text-blue-500 ml-2"
                        style={{ background: 'none', fontFamily: 'dohyeon' }}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-[10px] text-red-500"
                        style={{ background: 'none', fontFamily: 'dohyeon' }}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              )}
              <div className="text-[11px] text-slate-500 ml-2 mr-2">
                {timeAgo(comment.createdAt)}
              </div>
            </div>
            <div className="flex items-center mt-1">
              {comment.replies.length > 0 && (
                <button
                  onClick={() => toggleReplies(comment.id)}
                  className="text-[10px] mr-2"
                  style={{ fontFamily: 'dohyeon', background: 'none' }}
                >
                  답글 {comment.replies.length}개
                </button>
              )}
              <button
                onClick={() => handleReply(comment.id, comment.nickname)}
                className="text-[10px] text-stone-500"
                style={{ background: 'none', fontFamily: 'dohyeon' }}
              >
                답글 달기
              </button>
            </div>
            {comment.showReplies && (
              <div className="ml-4 mt-2">
                {comment.replies.map((reply) => (
                  <div key={reply.commentId} className="mb-2">
                    <div className="flex justify-between items-center">
                      {reply.isEditing ? (
                        <input
                          id="updateReplyInput"
                          type="text"
                          value={editingReply}
                          onChange={(e) => setEditingReply(e.target.value)}
                          onKeyDown={(e) =>
                            handleKeyDownReply(e, comment.id, reply.commentId)
                          }
                          className="text-[13px] bg-gray-50 rounded-md flex-grow"
                        />
                      ) : (
                        <div className="text-[13px] bg-gray-50 rounded-md flex-grow">
                          ➥{reply.msg}
                        </div>
                      )}
                      {reply.nickname === currentUser && (
                        <div className="flex space-x-2">
                          {!reply.isEditing && (
                            <>
                              <button
                                onClick={() =>
                                  handleEditReply(comment.id, reply.commentId)
                                }
                                className="text-[10px] text-blue-500 ml-2"
                                style={{
                                  background: 'none',
                                  fontFamily: 'dohyeon',
                                }}
                              >
                                수정
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteReply(comment.id, reply.commentId)
                                }
                                className="text-[10px] text-red-500"
                                style={{
                                  background: 'none',
                                  fontFamily: 'dohyeon',
                                }}
                              >
                                삭제
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-500 ml-2 mr-2">
                        {timeAgo(reply.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
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
