package ssafy.c205.ott.domain.account.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FollowRequestDto {

    private Long requestMemberId;
    private Long targetMemberId;

}
