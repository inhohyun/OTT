package ssafy.c205.ott.domain.lookbook.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.common.entity.LookbookItem;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.Member;

@Entity
@Getter @Setter
public class Lookbook extends BaseEntity {
    //Todo: 좋아요 수 추가

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Long hitCount = 0L;
    private String content;

    @Enumerated(EnumType.STRING)
    private PublicStatus publicStatus = PublicStatus.PUBLIC;

    @Enumerated(EnumType.STRING)
    private ActiveStatus activeStatus = ActiveStatus.ACTIVE;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "lookbook", fetch = FetchType.LAZY)
    private List<LookbookItem> lookbookItemList = new ArrayList<>();

    @OneToMany(mappedBy = "lookbook", fetch = FetchType.LAZY)
    private List<LookbookTag> lookbookTags = new ArrayList<>();

    @OneToMany(mappedBy = "lookbook", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "lookbook", fetch = FetchType.LAZY)
    private List<LookbookImage> lookbookImages = new ArrayList<>();
}
