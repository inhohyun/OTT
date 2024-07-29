package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssafy.c205.ott.common.entity.LookbookItem;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.lookbook.entity.ActiveStatus;
import ssafy.c205.ott.domain.lookbook.entity.Comment;
import ssafy.c205.ott.domain.lookbook.entity.LookbookImage;

@Getter @ToString @Builder
public class TagLookbookDto {
    private Long id;
    private Long hitCount;
    private String content;
    private PublicStatus publicStatus;
    private ActiveStatus activeStatus;
    private Member member;
    private List<LookbookItem> lookbookItemList = new ArrayList<>();
    private List<LookbookTag> lookbookTags = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();
    private List<LookbookImage> lookbookImages = new ArrayList<>();
}
