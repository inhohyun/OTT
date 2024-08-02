package ssafy.c205.ott.domain.account.dto.response;

import lombok.Builder;

@Builder
public class FollowsResponseDto {
    private Long memberId;
    private String name;
    private String nickname;
    private String profileImageUrl;
}
