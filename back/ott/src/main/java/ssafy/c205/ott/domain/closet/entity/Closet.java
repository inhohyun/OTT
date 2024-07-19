package ssafy.c205.ott.domain.closet.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.common.entity.ClosetCategory;
import ssafy.c205.ott.domain.account.entity.Member;

@Entity
@Getter
public class Closet extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "closet", fetch = FetchType.LAZY)
    private List<ClosetCategory> closetCategories = new ArrayList<>();

}
