package ssafy.c205.ott.common.entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.domain.item.entity.Item;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;

@Entity
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
}
