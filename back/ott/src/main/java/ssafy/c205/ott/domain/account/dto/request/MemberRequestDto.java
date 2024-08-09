package ssafy.c205.ott.domain.account.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberRequestDto {
    private Long id;
    private Long currentId;
}
