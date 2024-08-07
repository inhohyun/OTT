package ssafy.c205.ott.common.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.item.entity.Item;

@Entity @Getter
public class ItemCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Builder
    public ItemCategory(Long id, Category category, Item item) {
        this.id = id;
        this.category = category;
        this.item = item;
    }

    public ItemCategory() {
    }
}
