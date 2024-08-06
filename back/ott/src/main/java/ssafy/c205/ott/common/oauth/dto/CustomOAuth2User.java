package ssafy.c205.ott.common.oauth.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import ssafy.c205.ott.domain.account.dto.response.MemberRegisterDto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final MemberRegisterDto memberRegisterDTO;

    public CustomOAuth2User(MemberRegisterDto memberRegisterDTO) {
        this.memberRegisterDTO = memberRegisterDTO;
    }

    public Long getId() {
        return memberRegisterDTO.getId();
    }

    @Override
    public Map<String, Object> getAttributes() {

        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return memberRegisterDTO.getRole().name();
            }
        });

        return collection;
    }

    @Override
    public String getName() {
        return memberRegisterDTO.getName();
    }

    public String getUsername() {
        return memberRegisterDTO.getSso();
    }
}
