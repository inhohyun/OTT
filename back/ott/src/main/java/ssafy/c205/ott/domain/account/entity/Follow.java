package ssafy.c205.ott.domain.account.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Follow extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "to_member")
    private Member toMember;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "from_member")
    private Member fromMember;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FollowStatus followStatus;

    public void updateFollowStatus() {
        this.followStatus = FollowStatus.FOLLOWING;
    }

}
