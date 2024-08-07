package ssafy.c205.ott.domain.account.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberSsoDto {
    private String sso;
}
