package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString @Builder
public class LookbookFavoriteDto {
    private Long memberId;
    private String lookbookId;

    public LookbookFavoriteDto(Long memberId, String lookbookId) {
        this.memberId = memberId;
        this.lookbookId = lookbookId;
    }

    public LookbookFavoriteDto() {
    }
}
