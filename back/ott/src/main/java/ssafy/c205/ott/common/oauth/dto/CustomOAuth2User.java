package ssafy.c205.ott.common.oauth.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import ssafy.c205.ott.domain.account.dto.response.MemberDto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final MemberDto memberDTO;

    public CustomOAuth2User(MemberDto memberDTO) {
        this.memberDTO = memberDTO;
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
                return memberDTO.getRole().name();
            }
        });

        return collection;
    }

    @Override
    public String getName() {
        return memberDTO.getName();
    }

    public String getUsername() {
        return memberDTO.getSso();
    }
}
