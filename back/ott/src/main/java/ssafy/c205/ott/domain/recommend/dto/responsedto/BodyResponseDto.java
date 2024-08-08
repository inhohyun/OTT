package ssafy.c205.ott.domain.recommend.dto.responsedto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BodyResponseDto {

    private Long memberId;
    private String nickname;
    private LocalDateTime createdAt;
    private String img;
    private int cntFavorite;
    private int cntComment;
    private Long lookbookId;
    private boolean isFavorite;

    @Builder
    public BodyResponseDto(Long memberId, String nickname, LocalDateTime createdAt, String img,
        int cntFavorite, int cntComment, Long lookbookId, boolean isFavorite) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.createdAt = createdAt;
        this.img = img;
        this.cntFavorite = cntFavorite;
        this.cntComment = cntComment;
        this.lookbookId = lookbookId;
        this.isFavorite = isFavorite;
    }

    public BodyResponseDto() {

    }
}
