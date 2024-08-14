package ssafy.c205.ott.domain.lookbook.service;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ssafy.c205.ott.common.entity.CommentStatus;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentMessageDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentSelectDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.CommentChildrenDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.CommentSelectResponseDto;
import ssafy.c205.ott.domain.lookbook.entity.Comment;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.exception.CommentNotFoundException;
import ssafy.c205.ott.domain.lookbook.exception.LookbookNotFoundException;
import ssafy.c205.ott.domain.lookbook.repository.CommentRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.notification.dto.request.CommentNotificationDto;
import ssafy.c205.ott.domain.notification.entity.NotificationType;
import ssafy.c205.ott.domain.notification.service.NotificationWriteService;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final LookbookRepository lookbookRepository;
    private final NotificationWriteService notificationWriteService;

    @Override
    public void createComment(String postId, CommentMessageDto commentMessageDto) {

        Member member = memberRepository.findByIdAndActiveStatus(
                commentMessageDto.getMemberId(), ActiveStatus.ACTIVE)
            .orElseThrow(MemberNotFoundException::new);

        Lookbook lookbook = lookbookRepository.findById(Long.parseLong(postId)).orElseThrow(
            LookbookNotFoundException::new);

        Comment c = commentRepository.save(Comment
            .builder()
            .message(commentMessageDto.getMsg())
            .member(member)
            .lookbook(lookbook)
            .commentStatus(commentMessageDto.getStatus().equals("DM") ? CommentStatus.DM
                : CommentStatus.NOT_DELETED)
            .build());

        notificationWriteService.createCommentNotification(CommentNotificationDto
            .builder()
            .notificationType(NotificationType.COMMENT)
            .memberId(lookbook.getMember().getId())
            .lookbookId(lookbook.getId())
            .commentId(c.getId())
            .commentAuthorId(member.getId())
            .commentAuthorName(member.getName())
            .build());
    }

    @Override
    public void createReply(String postId, String commentId, CommentMessageDto commentMessageDto) {
        Member member = memberRepository.findByIdAndActiveStatus(
                commentMessageDto.getMemberId(), ActiveStatus.ACTIVE)
            .orElseThrow(MemberNotFoundException::new);

        Lookbook lookbook = lookbookRepository.findById(Long.parseLong(postId))
            .orElseThrow(LookbookNotFoundException::new);
        Comment parent = commentRepository.findById(Long.parseLong(commentId)).orElseThrow(
            CommentNotFoundException::new);

        // 대댓글 저장
        Comment replyComment = Comment
            .builder()
            .member(member)
            .message(commentMessageDto.getMsg())
            .commentStatus(commentMessageDto.getStatus().equals("DM") ? CommentStatus.DM
                : CommentStatus.NOT_DELETED)
            .parent(parent)
            .lookbook(lookbook)
            .build();
        commentRepository.save(replyComment);

        // Parent에 child 댓글에 추가
        List<Comment> children = parent.getChildren();
        children.add(replyComment);
        commentRepository.save(Comment
            .builder()
            .lookbook(lookbook)
            .id(parent.getId())
            .member(parent.getMember())
            .message(parent.getMessage())
            .commentStatus(parent.getCommentStatus())
            .children(children)
            .build());

        //Todo : 대댓글이 잘 작성되었는지 확인하여 예외처리 할 필요
    }

    @Override
    public List<CommentSelectResponseDto> selectComment(String postId,
        CommentSelectDto commentSelectDto) {
        List<CommentSelectResponseDto> responseDtos = new ArrayList<>();

        //해당 룩북 조회
        Lookbook lookbook = lookbookRepository.findById(Long.parseLong(postId))
            .orElseThrow(LookbookNotFoundException::new);
        List<Comment> comments = commentRepository.findByLookbookIdAndCommentStatusAndParentIsNull(
            lookbook.getId(),
            commentSelectDto.getStatus().equals("DM") ? CommentStatus.DM
                : CommentStatus.NOT_DELETED);
        for (Comment comment : comments) {
            List<CommentChildrenDto> childrenDtos = new ArrayList<>();

            //대댓글 내용 추가
            for (Comment child : comment.getChildren()) {
                if (child.getCommentStatus() == CommentStatus.DELETED) {
                    continue;
                }
                childrenDtos.add(CommentChildrenDto
                    .builder()
                    .commentId(child.getId())
                    .createdAt(child.getCreatedAt())
                    .msg(child.getMessage())
                    .nickname(child.getMember().getNickname())
                    .memberId(child.getMember().getId())
                    .build());
            }

            //객체 생성
            CommentSelectResponseDto commentSelectResponseDto = CommentSelectResponseDto
                .builder()
                .nickname(comment.getMember().getNickname())
                .msg(comment.getMessage())
                .createdAt(comment.getCreatedAt())
                .children(childrenDtos)
                .commentId(comment.getId())
                .memberId(comment.getMember().getId())
                .build();

            //responseDto에 추가
            responseDtos.add(commentSelectResponseDto);
        }
        return responseDtos;
    }

    @Override
    public void updateComment(String postId, String commentId,
        CommentMessageDto commentMessageDto) {
        // 댓글 가져오기
        Comment comment = commentRepository.findById(Long.parseLong(commentId))
            .orElseThrow(CommentNotFoundException::new);

        // 데이터 업데이트
        commentRepository.save(Comment
            .builder()
            .id(comment.getId())
            .message(commentMessageDto.getMsg())
            .commentStatus(comment.getCommentStatus())
            .children(comment.getChildren())
            .member(comment.getMember())
            .parent(comment.getParent())
            .lookbook(comment.getLookbook())
            .build());
    }

    //댓글 삭제
    @Override
    public void deleteComment(String postId, String commentId) {
        //댓글 불러오기
        Comment comment = commentRepository.findById(Long.parseLong(commentId))
            .orElseThrow(CommentNotFoundException::new);

        //댓글 삭제하기 => 상태를 Delete 상태로 변경하기
        commentRepository.save(Comment
            .builder()
            .id(comment.getId())
            .lookbook(comment.getLookbook())
            .member(comment.getMember())
            .parent(comment.getParent())
            .message(comment.getMessage())
            .children(comment.getChildren())
            .commentStatus(CommentStatus.DELETED)
            .build());
    }

    @Override
    public int countComment(String postId) {
        List<Comment> comments = commentRepository.findByLookbookIdAndCommentStatus(
            Long.parseLong(postId),
            CommentStatus.NOT_DELETED);
        if (comments == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, postId + "의 댓글을 찾지 못했습니다.");
        }
        return comments.size();
    }
}
