package ssafy.c205.ott.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FollowsResponseDto {
    private Long memberId;
    private String name;
    private String nickname;
    private String profileImageUrl;
}
