package ssafy.c205.ott.domain.item.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Getter
public class ItemImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String itemImagePath;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemStatus itemStatus;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "item_id")
    private Item item;

    @Builder
    public ItemImage(Long id, String itemImagePath, ItemStatus itemStatus, Item item) {
        this.id = id;
        this.itemImagePath = itemImagePath;
        this.itemStatus = itemStatus;
        this.item = item;
    }

    public ItemImage() {
    }
}
