package ssafy.c205.ott.domain.lookbook.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;

@Entity @Getter
public class LookbookImage extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String imageUrl;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lookbook_id")
    private Lookbook lookbook;

    @Enumerated(EnumType.STRING)
    private LookbookImageStatus lookbookImageStatus;
}
