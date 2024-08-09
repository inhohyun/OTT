package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LookbookDto {

    private String uid;
    private String content;
    private String[] clothes;
    private String[] tags;
    private String publicStatus;

    @Builder
    public LookbookDto(String uid, String content, String[] clothes, String[] tags,
        String publicStatus) {
        this.uid = uid;
        this.content = content;
        this.clothes = clothes;
        this.tags = tags;
        this.publicStatus = publicStatus;
    }

    public LookbookDto() {
    }
}
