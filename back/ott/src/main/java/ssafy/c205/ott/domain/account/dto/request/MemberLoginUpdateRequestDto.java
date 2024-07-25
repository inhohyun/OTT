package ssafy.c205.ott.domain.account.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberLoginUpdateRequestDto {
    private Long memberId;
    private String email;
    private String name;
}