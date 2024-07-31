package ssafy.c205.ott.domain.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import ssafy.c205.ott.domain.account.entity.FollowStatus;

@Builder
@AllArgsConstructor
public class FollowResponseDto {
    private String message;
    private int followerCount;
    private FollowStatus followStatus;
}