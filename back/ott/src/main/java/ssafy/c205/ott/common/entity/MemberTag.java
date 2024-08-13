package ssafy.c205.ott.common.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.lookbook.entity.Tag;

@Getter
@Entity
@NoArgsConstructor
public class MemberTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @Builder
    public MemberTag(Member member, Tag tag) {
        this.member = member;
        this.tag = tag;
    }
}
