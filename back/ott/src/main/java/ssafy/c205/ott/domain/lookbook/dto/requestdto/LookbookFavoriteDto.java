package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString @Builder
public class LookbookFavoriteDto {
    private String uid;
    private String lookbookId;

    public LookbookFavoriteDto(String uid, String lookbookId) {
        this.uid = uid;
        this.lookbookId = lookbookId;
    }

    public LookbookFavoriteDto() {
    }
}
