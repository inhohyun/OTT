package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class LookbookMineDto {
    private String img;
    private String[] tags;
    private int cntFavorite;
    private int cntComment;
    private Long lookbookId;
    private boolean isFavorite;
    private LocalDateTime createdAt;

    @Builder
    public LookbookMineDto(String img, String[] tags, int cntFavorite, int cntComment, Long lookbookId, boolean isFavorite, LocalDateTime createdAt) {
        this.img = img;
        this.tags = tags;
        this.cntFavorite = cntFavorite;
        this.cntComment = cntComment;
        this.lookbookId = lookbookId;
        this.isFavorite = isFavorite;
        this.createdAt = createdAt;
    }

    public LookbookMineDto() {}
}
