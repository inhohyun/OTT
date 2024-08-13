package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentMessageDto {

    private Long memberId;
    private String msg;
    private String status;

    @Builder
    public CommentMessageDto(Long memberId, String msg, String status) {
        this.memberId = memberId;
        this.msg = msg;
        this.status = status;
    }

    public CommentMessageDto() {
    }
}
