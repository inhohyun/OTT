package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class CommentChildrenDto {

    private String msg;
    private String nickname;
    private LocalDateTime createdAt;
}
