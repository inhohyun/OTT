package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class FollowLookbookResponseDto {
    private String nickname;
    private String imgProfile;
    private List<FollowLookbookDto> followLookbookDtoList;

    @Builder
    public FollowLookbookResponseDto(String nickname, String imgProfile,
        List<FollowLookbookDto> followLookbookDtoList) {
        this.nickname = nickname;
        this.imgProfile = imgProfile;
        this.followLookbookDtoList = followLookbookDtoList;
    }

    public FollowLookbookResponseDto() {}
}
