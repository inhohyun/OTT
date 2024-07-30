package ssafy.c205.ott.domain.lookbook.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.CommentStatus;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentMessageDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentSelectDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.CommentChildrenDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.CommentSelectResponseDto;
import ssafy.c205.ott.domain.lookbook.entity.Comment;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.repository.CommentRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final LookbookRepository lookbookRepository;

    @Override
    public void createComment(String postId, CommentMessageDto commentMessageDto) {
        Member member = null;
        Optional<Member> om = memberRepository.findByIdAndActiveStatus(
            Long.parseLong(commentMessageDto.getUid()), ActiveStatus.ACTIVE);

        Optional<Lookbook> ol = lookbookRepository.findById(Long.parseLong(postId));
        Lookbook lookbook = null;

        //Todo : 룩북 조회 결과 없음 예외처리
        if (ol.isPresent()) {
            lookbook = ol.get();
        }

        //Todo : 멤버 조회 실패 예외처리
        if (om.isPresent()) {
            member = om.get();
        }

        commentRepository.save(Comment
            .builder()
            .message(commentMessageDto.getMsg())
            .member(member)
            .lookbook(lookbook)
            .commentStatus(commentMessageDto.getStatus().equals("DM") ? CommentStatus.DM
                : CommentStatus.NOT_DELETED)
            .build());
    }

    @Override
    public void createReply(String postId, String commentId, CommentMessageDto commentMessageDto) {
        Member member = null;
        Lookbook lookbook = null;
        Comment parent = null;

        Optional<Member> om = memberRepository.findByIdAndActiveStatus(
            Long.parseLong(commentMessageDto.getUid()), ActiveStatus.ACTIVE);

        //Todo : 멤버를 못불러오는거 예외처리
        if (om.isPresent()) {
            member = om.get();
        }

        //Todo : 룩북 조회 실패 예외처리
        Optional<Lookbook> ol = lookbookRepository.findById(Long.parseLong(postId));
        if (ol.isPresent()) {
            lookbook = ol.get();
        }

        //Todo : 댓글 조회 예외처리
        Optional<Comment> oc = commentRepository.findById(Long.parseLong(commentId));
        if (oc.isPresent()) {
            parent = oc.get();
        }

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
            .id(parent.getId())
            .children(children)
            .build());
    }

    @Override
    public List<CommentSelectResponseDto> selectComment(String postId,
        CommentSelectDto commentSelectDto) {
        Lookbook lookbook = null;
        List<CommentSelectResponseDto> responseDtos = new ArrayList<>();

        //해당 룩북 조회
        //Todo : 룩북 조회 실패 예외처리
        Optional<Lookbook> ol = lookbookRepository.findById(Long.parseLong(postId));
        if (ol.isPresent()) {
            lookbook = ol.get();
        }

        List<Comment> comments = commentRepository.findByLookbookIdAndCommentStatusAndParentIsNull(
            lookbook.getId(),
            commentSelectDto.getStatus().equals("DM") ? CommentStatus.DM
                : CommentStatus.NOT_DELETED);
        for (Comment comment : comments) {
            //객체 생성
            CommentSelectResponseDto commentSelectResponseDto = CommentSelectResponseDto
                .builder()
                .nickname(lookbook.getMember().getNickname())
                .msg(comment.getMessage())
                .createdAt(comment.getCreatedAt())
                .children(new ArrayList<>())
                .build();

            //대댓글 내용 추가
            for (Comment child : comment.getChildren()) {
                commentSelectResponseDto.getChildren().add(CommentChildrenDto
                    .builder()
                    .createdAt(child.getCreatedAt())
                    .msg(child.getMessage())
                    .nickname(child.getMember().getNickname())
                    .build());
            }

            //responseDto에 추가
            responseDtos.add(commentSelectResponseDto);
        }

        return responseDtos;
    }
}
