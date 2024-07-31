package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString @Builder
public class FindLookbookDto {
    private String imageURL;
    private Long uid;
    private LocalDateTime createdAt;
}
