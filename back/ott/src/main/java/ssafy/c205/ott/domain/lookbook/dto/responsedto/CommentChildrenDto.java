package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString @Builder
public class CommentChildrenDto {

    private Long commentId;
    private String msg;
    private String nickname;
    private LocalDateTime createdAt;
}
