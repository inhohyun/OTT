package ssafy.c205.ott.domain.account.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.common.entity.MemberTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.closet.entity.Closet;
import ssafy.c205.ott.domain.lookbook.entity.Tag;

@Entity
@Getter
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
    @Column(nullable = false)
    private String sso;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    private float height;

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

    @OneToMany(mappedBy = "member")
    private List<Closet> closets = new ArrayList<>();

    @OneToMany(mappedBy = "toMember", fetch = FetchType.LAZY)
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "fromMember", fetch = FetchType.LAZY)
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberTag> memberTags = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @Builder
    public Member(String name, String sso, String email, MemberRole role) {
        this.name = name;
        this.sso = sso;
        this.email = email;
        this.role = role;
    }

    public void updateEmailAndName(String email, String name) {
        this.email = email;
        this.name = name;
    }
}
