package ssafy.c205.ott.domain.notification.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WebRtcRequestDto {
    private Long targetMemberId;
    private String sessionId;
}
