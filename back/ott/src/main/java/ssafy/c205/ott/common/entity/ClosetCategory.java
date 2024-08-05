package ssafy.c205.ott.common.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.closet.entity.Closet;

@Getter
@Entity
@NoArgsConstructor
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

    @Builder
    public ClosetCategory(Closet closet, Category category) {
        this.closet = closet;
        this.category = category;
    }
}
