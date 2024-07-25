package ssafy.c205.ott.domain.lookbook.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.domain.account.entity.Member;

@Entity
@Setter @ToString @Getter
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

    public Tag(String name, Long count) {
        this.name = name;
        this.count = count;
    }
}
