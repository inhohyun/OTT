import React from 'react';

// 더미 데이터
const comments = [
    { id: 1, user: 'seller', content: '판매자 댓글입니다.', replies: [{ id: 2, user: 'buyer1', content: '구매자1 댓글입니다.' }, { id: 3, user: 'seller', content: '판매자 답글입니다.' }] },
    { id: 4, user: 'buyer2', content: '구매자2 댓글입니다.', replies: [{ id: 5, user: 'seller', content: '판매자 답글입니다.' }] },
    { id: 6, user: 'buyer3', content: '구매자3 댓글입니다.', replies: [] },
];

const userRole = 'seller'; // 현재 사용자의 역할: 'seller', 'buyer1', 'buyer2', 'buyer3', 'other'

const SellComment = () => {
    return (
        <div>
            {comments.map(comment => (
                <div key={comment.id} style={{ marginBottom: '20px' }}>
                    <div>
                        {/* 판매자이거나, 댓글 작성자거나, seller는 모든 댓글을 볼 수 있음 */}
                        {userRole === 'seller' || comment.user === userRole || comment.user === 'seller' ? (
                            <p><strong>{comment.user}</strong>: {comment.content}</p>
                        ) : (
                            <p><strong>{comment.user}</strong>: <em>비공개 댓글입니다.</em></p>
                        )}
                    </div>
                    {comment.replies.length > 0 && (
                        <div style={{ paddingLeft: '20px' }}>
                            {comment.replies.map(reply => (
                                <div key={reply.id} style={{ display: 'flex', alignItems: 'center' }}>
                                    <span role="img" aria-label="reply" style={{ marginRight: '5px' }}>➥</span> 
                                    {/* 판매자이거나, 댓글 작성자거나, seller는 모든 답글을 볼 수 있음 */}
                                    {(userRole === 'seller' || reply.user === userRole || reply.user === 'seller' || comment.user === userRole) ? (
                                        <p><strong>{reply.user}</strong>: {reply.content}</p>
                                    ) : (
                                        <p><strong>{reply.user}</strong>: <em>비공개 답글입니다.</em></p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SellComment;
