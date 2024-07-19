package ssafy.c205.ott.common.entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.closet.entity.Closet;

@Entity
public class ClosetCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "closet_id", nullable = false)
    private Closet closet;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

}
