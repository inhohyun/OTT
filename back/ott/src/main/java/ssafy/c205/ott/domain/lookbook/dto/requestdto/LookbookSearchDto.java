package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LookbookSearchDto {

    private String[] tags;
    private Long memberId;

    @Builder
    public LookbookSearchDto(String[] tags, Long memberId) {
        this.tags = tags;
        this.memberId = memberId;
    }

    public LookbookSearchDto() {

    }
}
