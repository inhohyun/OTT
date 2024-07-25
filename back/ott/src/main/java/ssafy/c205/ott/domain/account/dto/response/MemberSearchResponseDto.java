package ssafy.c205.ott.domain.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import ssafy.c205.ott.domain.account.entity.Member;

@Getter
public class MemberSearchResponseDto {

    private Long id;
    private String name;
    private String nickname;
    private String profileImageUrl;

    public MemberSearchResponseDto(Member member) {
        this.id = member.getId();
        this.name = member.getName();
        this.nickname = member.getNickname();
        this.profileImageUrl = member.getProfileImageUrl();
    }
}
