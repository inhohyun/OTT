package ssafy.c205.ott.domain.recommend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.domain.account.entity.Member;

@Entity
@Getter
public class MemberGroup extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int groupId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public MemberGroup(int groupId, Member member) {
        this.groupId = groupId;
        this.member = member;
    }

    public MemberGroup() {
    }
}
