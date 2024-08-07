package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.c205.ott.common.entity.LookbookItem;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.lookbook.entity.ActiveStatus;
import ssafy.c205.ott.domain.lookbook.entity.Comment;
import ssafy.c205.ott.domain.lookbook.entity.LookbookImage;

@Getter
@Setter
@ToString
public class TagLookbookDto {

    private Long lookbookId;
    private String nickname;
    private int cntLike;
    private int cntComment;
    private LocalDateTime createdAt;
    private String img;
    private boolean isLike;

    @Builder
    public TagLookbookDto(Long lookbookId, String nickname, int cntLike, int cntComment,
        LocalDateTime createdAt, String img, boolean isLike) {
        this.lookbookId = lookbookId;
        this.nickname = nickname;
        this.cntLike = cntLike;
        this.cntComment = cntComment;
        this.createdAt = createdAt;
        this.img = img;
        this.isLike = isLike;
    }

    public TagLookbookDto() {
    }
}
