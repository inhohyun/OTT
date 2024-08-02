package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentSelectDto {

    private String status;


    @Builder
    public CommentSelectDto(String status) {
        this.status = status;
    }

    public CommentSelectDto() {
    }
}
