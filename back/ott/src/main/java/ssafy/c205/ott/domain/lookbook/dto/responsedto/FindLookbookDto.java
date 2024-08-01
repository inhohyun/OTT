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
    private Long uid;
    private LocalDateTime createdAt;
    private int cntLike;
    private int cntComment;

    @Builder
    public FindLookbookDto(String imageURL, Long uid, LocalDateTime createdAt, int cntLike,
        int cntComment) {
        this.imageURL = imageURL;
        this.uid = uid;
        this.createdAt = createdAt;
        this.cntLike = cntLike;
        this.cntComment = cntComment;
    }

    public FindLookbookDto() {
    }
}
