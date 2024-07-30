package ssafy.c205.ott.domain.account.dto.response;

import lombok.Getter;
import ssafy.c205.ott.domain.account.entity.Member;

@Getter
public class MemberSearchResponseDto {

    private final Long id;
    private final String name;
    private final String nickname;
    private final String profileImageUrl;

    public MemberSearchResponseDto(Member member) {
        this.id = member.getId();
        this.name = member.getName();
        this.nickname = member.getNickname();
        this.profileImageUrl = member.getProfileImageUrl();
    }
}
