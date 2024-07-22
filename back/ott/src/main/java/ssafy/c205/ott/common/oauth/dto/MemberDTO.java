package ssafy.c205.ott.common.oauth.dto;

import lombok.Getter;
import lombok.Setter;
import ssafy.c205.ott.domain.account.entity.MemberRole;

@Getter
@Setter
public class MemberDTO {

    private MemberRole role;
    private String name;
    private String email;
    private String sso;
}
