package ssafy.c205.ott.common.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.domain.item.entity.Item;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;

@Entity @Getter @ToString
public class LookbookItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lookbook_id", nullable = false)
    private Lookbook lookbook;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Builder
    public LookbookItem(Long id, Lookbook lookbook, Item item) {
        this.id = id;
        this.lookbook = lookbook;
        this.item = item;
    }

    public LookbookItem() {

    }
}
