package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class LookbookDetailDto {

    private long viewCount;
    private String content;
    private String nickname;
    private List<ClothesImageDto> images;
    private List<String> tags;
    private List<ClothesImageDto> salesClothes;
    private LocalDateTime createdAt;
    private String thumnail;
    private int cntFavorite;
    private int cntComment;
    private boolean isFavorite;
    private String profileImg;
    private boolean isFollow;

    @Builder
    public LookbookDetailDto(long viewCount, String content, String nickname,
        List<ClothesImageDto> images, List<String> tags, List<ClothesImageDto> salesClothes,
        LocalDateTime createdAt, String thumnail, int cntFavorite, int cntComment,
        boolean isFavorite,
        String profileImg, boolean isFollow) {
        this.viewCount = viewCount;
        this.content = content;
        this.nickname = nickname;
        this.images = images;
        this.tags = tags;
        this.salesClothes = salesClothes;
        this.createdAt = createdAt;
        this.thumnail = thumnail;
        this.cntFavorite = cntFavorite;
        this.cntComment = cntComment;
        this.isFavorite = isFavorite;
        this.profileImg = profileImg;
        this.isFollow = isFollow;
    }

    public LookbookDetailDto() {

    }
}
