package ssafy.c205.ott.domain.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import ssafy.c205.ott.domain.account.entity.FollowStatus;

@Getter
@Builder
@AllArgsConstructor
public class FollowResponseDto {
    private String message;
    private int followerCount;
    private FollowStatus followStatus;
}