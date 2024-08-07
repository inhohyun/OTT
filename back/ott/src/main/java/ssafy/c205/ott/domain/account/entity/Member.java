package ssafy.c205.ott.domain.account.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.common.entity.MemberTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.closet.entity.Closet;
import ssafy.c205.ott.domain.lookbook.entity.Tag;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
    // Todo: sso, accessToken, refreshToken 해결
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(unique = true, nullable = false)
    private String email;

    @NotNull
    @Column(nullable = false)
    private String password;

    @NotNull
    @Column(nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotNull
    @Column(nullable = false)
    private float height;

    @NotNull
    @Column(nullable = false)
    private float weight;

    @Enumerated(EnumType.STRING)
    private BodyType bodyType;
    private String introduction;

    @Enumerated(EnumType.STRING)
    private ActiveStatus activeStatus;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private PublicStatus publicStatus;

    @OneToMany(mappedBy = "toMember", fetch = FetchType.LAZY)
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "fromMember", fetch = FetchType.LAZY)
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberTag> memberTags = new ArrayList<>();

    @Builder
    public Member(String name, String sso, String email, MemberRole role) {
        this.name = name;
        this.sso = sso;
        this.email = email;
        this.role = role;
        this.activeStatus = ActiveStatus.ACTIVE;
        this.publicStatus = PublicStatus.PUBLIC;
    }

    public void updateNameAndEmail(String email, String name) {
        this.email = email;
        this.name = name;
    }

    public void updateMember(String nickname, String phoneNumber, String introduction,
                             float height, float weight, Gender gender,
                             BodyType bodyType, PublicStatus publicStatus, List<MemberTag> memberTags) {
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.introduction = introduction;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
        this.bodyType = bodyType;
        this.publicStatus = publicStatus;
        this.memberTags = memberTags;
    }

    public void deleteMember() {
        this.activeStatus = ActiveStatus.INACTIVE;
    }

    public void updateProfileImage(String ProfileImageUrl) {
        this.profileImageUrl = ProfileImageUrl;
    }
}
