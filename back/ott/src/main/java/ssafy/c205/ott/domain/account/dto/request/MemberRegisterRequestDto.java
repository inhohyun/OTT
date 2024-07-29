package ssafy.c205.ott.domain.account.dto.request;

import lombok.Builder;
import lombok.Getter;
import ssafy.c205.ott.domain.account.entity.MemberRole;

@Builder
@Getter
public class MemberRegisterRequestDto {

    private MemberRole role;
    private String name;
    private String email;
    private String sso;

}