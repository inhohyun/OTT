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
    private int cntLike;
    private int cntComment;
    private boolean isLike;

    @Builder
    public FindLookbookDto(String imageURL, Long memberId, LocalDateTime createdAt, int cntLike,
        int cntComment, boolean isLike) {
        this.imageURL = imageURL;
        this.memberId = memberId;
        this.createdAt = createdAt;
        this.cntLike = cntLike;
        this.cntComment = cntComment;
        this.isLike = isLike;
    }

    public FindLookbookDto() {
    }
}
