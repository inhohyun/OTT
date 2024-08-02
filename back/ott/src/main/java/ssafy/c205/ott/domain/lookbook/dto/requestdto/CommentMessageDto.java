package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentMessageDto {

    private String uid;
    private String msg;
    private String status;

    @Builder
    public CommentMessageDto(String uid, String msg, String status) {
        this.uid = uid;
        this.msg = msg;
        this.status = status;
    }

    public CommentMessageDto() {
    }
}
