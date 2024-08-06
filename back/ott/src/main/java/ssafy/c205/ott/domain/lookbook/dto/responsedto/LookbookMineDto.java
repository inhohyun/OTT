package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class LookbookMineDto {
    private String img;
    private String[] tags;
    private int cntLike;
    private int cntComment;
    private Long lookbookId;

    @Builder
    public LookbookMineDto(String img, String[] tags, int cntLike, int cntComment, Long lookbookId) {
        this.img = img;
        this.tags = tags;
        this.cntLike = cntLike;
        this.cntComment = cntComment;
        this.lookbookId = lookbookId;
    }

    public LookbookMineDto() {}
}
