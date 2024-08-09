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

    private String[] img;
    private Long clothesId;
    private BookmarkStatus bookmarkStatus;

    @Builder
    public ItemListResponseDto(String[] img, Long clothesId, BookmarkStatus bookmarkStatus) {
        this.img = img;
        this.clothesId = clothesId;
        this.bookmarkStatus = bookmarkStatus;
    }

    public ItemListResponseDto() {
    }
}
