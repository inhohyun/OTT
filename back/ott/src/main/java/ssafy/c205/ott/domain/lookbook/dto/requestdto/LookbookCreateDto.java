package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.c205.ott.common.entity.PublicStatus;

@Getter @Setter @ToString
public class LookbookCreateDto {
    private String userId;
    private String content;
    private String[] clothes;
    private String[] tags;
    private PublicStatus publicStatus;
}
