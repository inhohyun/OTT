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

//  API 연결
// import { useState, useRef, useEffect } from 'react';
// // import axios from 'axios';
// import {
//   lookbookComment,
//   commentCreate,
//   replyCreate,
//   commentUpdate,
//   commentDelete,
//   replyUpdate,
//   replyDelete,
// } from '../../api/lookbook/comments';

// const SellComment = ({ comments = [], lookbookId }) => {
//   const currentUser = 'kimssafy'; // Replace with the actual current user nickname
//   const [commentList, setCommentList] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [replyTo, setReplyTo] = useState(null); // Track which comment is being replied to
//   const [editingComment, setEditingComment] = useState(''); // Track the editing comment content
//   const [editingReply, setEditingReply] = useState(''); // Track the editing reply content
//   const inputRef = useRef(null); // Ref for the input field

//   useEffect(() => {
//     if (comments.length > 0) {
//       setCommentList(
//         comments.map((comment) => ({
//           ...comment,
//           id: comment.commentId,
//           replies: (comment.children || []).map((reply) => ({
//             ...reply,
//             isEditing: false,
//           })),
//           showReplies: false,
//           isEditing: false,
//         }))
//       );
//     }
//   }, [comments]);

//   const fetchComments = () => {
//     try {
//       const status = 'comment';
//       const commentsData = lookbookComment(lookbookId, status);
//       setCommentList(
//         commentsData.map((comment) => ({
//           ...comment,
//           id: comment.commentId,
//           replies: (comment.children || []).map((reply) => ({
//             ...reply,
//             isEditing: false, // 수정상태 false
//           })),
//           showReplies: false, // 답글 보여주는 상태 false
//           isEditing: false, // 댓글 수정 상태 false
//         }))
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddComment = (e) => {
//     e.preventDefault();
//     if (newComment.trim() !== '') {
//       const formData = new FormData();
//       formData.append('uid', 1); // UID를 1로 설정
//       const message =
//         replyTo !== null
//           ? newComment.split(' ').slice(1).join(' ')
//           : newComment;
//       formData.append('msg', message);
//       formData.append('status', 'DM');

//       if (replyTo !== null) {
//         // 기존 댓글에 답글 추가
//         try {
//           replyCreate(formData, lookbookId, replyTo);
//           setNewComment('');
//           setReplyTo(null);
//           fetchComments();
//         } catch (error) {
//           console.error(error);
//         }
//       } else {
//         // 새로운 댓글 추가
//         try {
//           commentCreate(formData, lookbookId);
//           setNewComment('');
//           fetchComments(); // Fetch the latest comments after adding a new one
//         } catch (error) {
//           console.error('댓글 생성 실패:', error);
//         }
//       }
//     }
//   };

//   const handleReply = (commentId, author) => {
//     setReplyTo(commentId);
//     setNewComment(`@${author} `);
//     inputRef.current?.focus();
//     inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//   };

//   const toggleReplies = (commentId) => {
//     const updatedComments = commentList.map((comment) => {
//       if (comment.id === commentId) {
//         return { ...comment, showReplies: !comment.showReplies };
//       }
//       return comment;
//     });
//     setCommentList(updatedComments);
//   };

//   const handleEditComment = (commentId) => {
//     const updatedComments = commentList.map((comment) => {
//       if (comment.id === commentId) {
//         return { ...comment, isEditing: true };
//       }
//       return comment;
//     });
//     setEditingComment(
//       commentList.find((comment) => comment.id === commentId).msg
//     );
//     setCommentList(updatedComments);
//   };

//   const handleSaveEdit = (commentId) => {
//     const formData = new FormData();
//     formData.append('uid', 1);
//     formData.append('msg', editingComment);
//     formData.append('status', 'DM');

//     try {
//       commentUpdate(formData, lookbookId, commentId);
//       setNewComment('');
//       fetchComments();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteComment = (commentId) => {
//     try {
//       commentDelete(lookbookId, commentId);
//       fetchComments();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleKeyDown = (e, commentId) => {
//     if (e.key === 'Enter') {
//       handleSaveEdit(commentId);
//     }
//   };

//   const handleEditReply = (commentId, replyId) => {
//     const updatedComments = commentList.map((comment) => {
//       if (comment.id === commentId) {
//         return {
//           ...comment,
//           replies: comment.replies.map((reply) => {
//             if (reply.commentId === replyId) {
//               return { ...reply, isEditing: true };
//             }
//             return reply;
//           }),
//         };
//       }
//       return comment;
//     });
//     setEditingReply(
//       commentList
//         .find((comment) => comment.id === commentId)
//         .replies.find((reply) => reply.commentId === replyId).msg
//     );
//     setCommentList(updatedComments);
//   };

//   const handleSaveEditReply = (commentId, replyId) => {
//     const formData = new FormData();
//     formData.append('uid', 1);
//     formData.append('msg', editingComment);
//     formData.append('status', 'DM');

//     try {
//       replyUpdate(formData, lookbookId, replyId);
//       setNewComment('');
//       fetchComments();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteReply = (commentId, replyId) => {
//     try {
//       replyDelete(lookbookId, replyId);
//       fetchComments();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleKeyDownReply = (e, commentId, replyId) => {
//     if (e.key === 'Enter') {
//       handleSaveEditReply(commentId, replyId);
//     }
//   };

//   const timeAgo = (time) => {
//     const now = new Date();
//     const diff = (now - new Date(time)) / 1000;
//     if (diff < 60) {
//       return `${Math.floor(diff)}초 전`;
//     } else if (diff < 3600) {
//       return `${Math.floor(diff / 60)}분 전`;
//     } else if (diff < 86400) {
//       return `${Math.floor(diff / 3600)}시간 전`;
//     } else {
//       return `${Math.floor(diff / 86400)}일 전`;
//     }
//   };

//   return (
//     <div className="py-2">
//       {commentList.length === 0 ? (
//         <div className="text-center text-gray-500">댓글이 없습니다</div>
//       ) : (
//         commentList.map((comment) => (
//           <div key={comment.id} className="mb-4">
//             <div className="flex justify-between items-center">
//               {comment.isEditing ? (
//                 <input
//                   id="updateInput"
//                   type="text"
//                   value={editingComment}
//                   onChange={(e) => setEditingComment(e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(e, comment.id)}
//                   className="text-[14px] bg-gray-100 rounded-md flex-grow"
//                 />
//               ) : (
//                 <div className="text-[14px] bg-gray-100 rounded-md flex-grow">
//                   {comment.msg}
//                 </div>
//               )}
//               {comment.nickname === currentUser && (
//                 <div className="flex space-x-2">
//                   {!comment.isEditing && (
//                     <>
//                       <button
//                         onClick={() => handleEditComment(comment.id)}
//                         className="text-[10px] text-blue-500 ml-2"
//                         style={{ background: 'none', fontFamily: 'dohyeon' }}
//                       >
//                         수정
//                       </button>
//                       <button
//                         onClick={() => handleDeleteComment(comment.id)}
//                         className="text-[10px] text-red-500"
//                         style={{ background: 'none', fontFamily: 'dohyeon' }}
//                       >
//                         삭제
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//               <div className="text-[11px] text-slate-500 ml-2 mr-2">
//                 {timeAgo(comment.createdAt)}
//               </div>
//             </div>
//             <div className="flex items-center mt-1">
//               {comment.replies.length > 0 && (
//                 <button
//                   onClick={() => toggleReplies(comment.id)}
//                   className="text-[10px] mr-2"
//                   style={{ fontFamily: 'dohyeon', background: 'none' }}
//                 >
//                   답글 {comment.replies.length}개
//                 </button>
//               )}
//               <button
//                 onClick={() => handleReply(comment.id, comment.nickname)}
//                 className="text-[10px] text-stone-500"
//                 style={{ background: 'none', fontFamily: 'dohyeon' }}
//               >
//                 답글 달기
//               </button>
//             </div>
//             {comment.showReplies && (
//               <div className="ml-4 mt-2">
//                 {comment.replies.map((reply) => (
//                   <div key={reply.commentId} className="mb-2">
//                     <div className="flex justify-between items-center">
//                       {reply.isEditing ? (
//                         <input
//                           id="updateReplyInput"
//                           type="text"
//                           value={editingReply}
//                           onChange={(e) => setEditingReply(e.target.value)}
//                           onKeyDown={(e) =>
//                             handleKeyDownReply(e, comment.id, reply.commentId)
//                           }
//                           className="text-[13px] bg-gray-50 rounded-md flex-grow"
//                         />
//                       ) : (
//                         <div className="text-[13px] bg-gray-50 rounded-md flex-grow">
//                           ➥{reply.msg}
//                         </div>
//                       )}
//                       {reply.nickname === currentUser && (
//                         <div className="flex space-x-2">
//                           {!reply.isEditing && (
//                             <>
//                               <button
//                                 onClick={() =>
//                                   handleEditReply(comment.id, reply.commentId)
//                                 }
//                                 className="text-[10px] text-blue-500 ml-2"
//                                 style={{
//                                   background: 'none',
//                                   fontFamily: 'dohyeon',
//                                 }}
//                               >
//                                 수정
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   handleDeleteReply(comment.id, reply.commentId)
//                                 }
//                                 className="text-[10px] text-red-500"
//                                 style={{
//                                   background: 'none',
//                                   fontFamily: 'dohyeon',
//                                 }}
//                               >
//                                 삭제
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       )}
//                       <div className="text-[10px] text-slate-500 ml-2 mr-2">
//                         {timeAgo(reply.createdAt)}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       )}
//       <form onSubmit={handleAddComment} className="flex items-center mt-4 mr-4">
//         <input
//           ref={inputRef}
//           type="text"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           className="border rounded-full w-full p-2 mb-2 flex-grow"
//           placeholder="댓글을 작성하세요"
//           style={{ fontFamily: 'dohyeon' }}
//         />
//       </form>
//     </div>
//   );
// };

// export default SellComment;
