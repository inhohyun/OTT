package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FindLookbookDto {

    private String imageURL;
    private Long memberId;
    private LocalDateTime createdAt;
    private int cntFavorite;
    private int cntComment;
    private boolean isFavorite;

    @Builder
    public FindLookbookDto(String imageURL, Long memberId, LocalDateTime createdAt, int cntFavorite,
        int cntComment, boolean isFavorite) {
        this.imageURL = imageURL;
        this.memberId = memberId;
        this.createdAt = createdAt;
        this.cntFavorite = cntFavorite;
        this.cntComment = cntComment;
        this.isFavorite = isFavorite;
    }

    public FindLookbookDto() {
    }
}
