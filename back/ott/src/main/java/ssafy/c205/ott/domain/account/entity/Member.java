package ssafy.c205.ott.domain.account.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

import lombok.*;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.common.entity.MemberTag;
import ssafy.c205.ott.common.entity.PublicStatus;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(nullable = false, unique = true)
    private String sso;

    @Column(unique = true)
    private String email;

    @Column(length = 25)
    private String nickname;
    @Column(length = 11)
    private String phoneNumber;
    private float height;
    private float weight;
    @Column(length = 100)
    private String introduction;
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private BodyType bodyType;

    @Enumerated(EnumType.STRING)
    private ActiveStatus activeStatus;

    @Enumerated(EnumType.STRING)
    private PublicStatus publicStatus;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

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
                             BodyType bodyType, PublicStatus publicStatus) {
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.introduction = introduction;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
        this.bodyType = bodyType;
        this.publicStatus = publicStatus;
    }

    public void deleteMember() {
        this.activeStatus = ActiveStatus.INACTIVE;
    }

    public void updateProfileImage(String ProfileImageUrl) {
        this.profileImageUrl = ProfileImageUrl;
    }

    public double distance(Member member) {
        return Math.sqrt(Math.pow((member.getHeight() - this.height), 2) + Math.pow(
            (member.getWeight() - this.weight), 2));
    }

    public void update(float height, float weight) {
        this.height = height;
        this.weight = weight;
    }

    public Member(float weight, float height, Long id) {
        this.weight = weight;
        this.height = height;
        this.id = id;
    }
}
