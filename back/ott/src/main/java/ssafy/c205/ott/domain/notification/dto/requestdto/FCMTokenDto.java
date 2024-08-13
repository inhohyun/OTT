package ssafy.c205.ott.domain.notification.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class FCMTokenDto {
    private Long memberId;
    private String token;
}
