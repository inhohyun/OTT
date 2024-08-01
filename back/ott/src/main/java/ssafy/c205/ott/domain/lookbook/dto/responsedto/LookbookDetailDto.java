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

@Getter @Setter
@ToString @Builder
public class LookbookDetailDto {
    private long viewCount;
    private String content;
    private String nickname;
    private List<ClothesImageDto> images;
    private List<String> tags;
    private List<ClothesImageDto> salesClothes;
    private LocalDateTime createdAt;
    private String thumnail;
    private int cntLike;
}
