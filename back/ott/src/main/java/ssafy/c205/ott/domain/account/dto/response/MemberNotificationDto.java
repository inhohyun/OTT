package ssafy.c205.ott.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberNotificationDto {
    private Long memberId;
    private String memberName;
}
