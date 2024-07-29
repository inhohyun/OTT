package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.c205.ott.common.entity.LookbookItem;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.lookbook.entity.Comment;
import ssafy.c205.ott.domain.lookbook.entity.LookbookImage;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @ToString @Builder
public class LookbookDetailDto {
    private long id;
    private long hitCount;
    private String content;
    private Member member;
    private List<LookbookItem> lookbookItems;
    private List<LookbookTag> lookbookTags;
    private List<Comment> comments;
    private List<LookbookImage> lookbookImages;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
