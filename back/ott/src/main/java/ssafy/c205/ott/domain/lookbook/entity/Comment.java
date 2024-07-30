package ssafy.c205.ott.domain.lookbook.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.common.entity.CommentStatus;
import ssafy.c205.ott.domain.account.entity.Member;

@Entity
@Getter
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;

    @NotNull
    @Enumerated(EnumType.STRING)
    private CommentStatus commentStatus;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Comment> children = new ArrayList<>();

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;

    @Builder
    public Comment(Long id, String message, CommentStatus commentStatus, Member member,
        Comment parent,
        List<Comment> children, Lookbook lookbook) {
        this.id = id;
        this.message = message;
        this.commentStatus = commentStatus;
        this.member = member;
        this.parent = parent;
        this.children = children;
        this.lookbook = lookbook;
    }

    public Comment() {
    }
}
