package ssafy.c205.ott.domain.item.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.c205.ott.domain.item.entity.BookmarkStatus;

@Getter
@Setter
@ToString
public class ItemCategoryResponseDto {

    private String[] img;
    private Long clothId;
    private BookmarkStatus bookmarkStatus;

    @Builder
    public ItemCategoryResponseDto(String[] img, Long clothId, BookmarkStatus bookmarkStatus) {
        this.img = img;
        this.clothId = clothId;
        this.bookmarkStatus = bookmarkStatus;
    }

    public ItemCategoryResponseDto() {

    }
}
