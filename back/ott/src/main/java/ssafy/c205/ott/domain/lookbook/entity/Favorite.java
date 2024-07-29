package ssafy.c205.ott.domain.lookbook.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.domain.account.entity.Member;

@Entity @Getter
public class Favorite extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;

    @Builder
    public Favorite(Long id, Member member, Lookbook lookbook) {
        this.id = id;
        this.member = member;
        this.lookbook = lookbook;
    }

    public Favorite() {
    }
}
