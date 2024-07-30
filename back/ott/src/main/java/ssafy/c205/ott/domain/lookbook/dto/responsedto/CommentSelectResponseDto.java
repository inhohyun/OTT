package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class CommentSelectResponseDto {

    private String nickname;
    private String msg;
    private LocalDateTime createdAt;
    private List<CommentChildrenDto> children;
}
