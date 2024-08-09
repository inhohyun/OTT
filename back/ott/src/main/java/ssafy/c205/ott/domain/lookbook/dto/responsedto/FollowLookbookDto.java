package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FollowLookbookDto {

    private LocalDateTime createdAt;
    private String imgThumbnail;
    private int cntFavorite;
    private int cntComment;

    @Builder
    public FollowLookbookDto(LocalDateTime createdAt, String imgThumbnail,
        int cntFavorite,
        int cntComment) {
        this.createdAt = createdAt;
        this.imgThumbnail = imgThumbnail;
        this.cntFavorite = cntFavorite;
        this.cntComment = cntComment;
    }

    public FollowLookbookDto() {

    }
}
