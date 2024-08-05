package ssafy.c205.ott.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.BodyType;
import ssafy.c205.ott.domain.account.entity.Follow;
import ssafy.c205.ott.domain.account.entity.FollowStatus;
import ssafy.c205.ott.domain.account.entity.Gender;
import ssafy.c205.ott.domain.closet.entity.Closet;
import ssafy.c205.ott.domain.lookbook.entity.Tag;

import java.util.List;

@Getter
@Builder
public class MemberInfoDto {
    private Long id;
    private String name;
    private String email;
    private String nickname;
    private String phoneNumber;
    private String introduction;
    private String profileImageUrl;
    private float height;
    private float weight;
    private Gender gender;
    private BodyType bodyType;
    private PublicStatus publicStatus;
    private List<Closet> closets;
    private List<Follow> followings;
    private List<Follow> followers;
    private List<Tag> tags;
    private int followingCount;
    private int followerCount;
    private FollowStatus followStatus;
}