package ssafy.c205.ott.domain.item.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.c205.ott.domain.item.entity.BookmarkStatus;

@Getter
@Setter
@ToString
public class ItemListResponseDto {

    private String[] imgUrls;
    private Long clothesId;
    private BookmarkStatus bookmarkStatus;

    @Builder
    public ItemListResponseDto(String[] imgUrls, Long clothesId, BookmarkStatus bookmarkStatus) {
        this.imgUrls = imgUrls;
        this.clothesId = clothesId;
        this.bookmarkStatus = bookmarkStatus;
    }

    public ItemListResponseDto() {
    }
}
