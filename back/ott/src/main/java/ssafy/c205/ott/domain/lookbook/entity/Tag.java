package ssafy.c205.ott.domain.lookbook.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;

@Entity
@Setter
@ToString
@Getter
public class Tag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(nullable = false)
    private String name;

    private Long count = 0L;

    public Tag(String name) {
        this.name = name;
    }

    public Tag() {
    }

    @Builder
    public Tag(long id, String name, Long count) {
        this.id = id;
        this.name = name;
        this.count = count;
    }

    @Builder
    public Tag(String name, Long count) {
        this.name = name;
        this.count = count;
    }
}
