package ssafy.c205.ott.domain.recommend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.domain.recommend.entity.MemberGroup;

public interface MemberGroupRepository extends JpaRepository<MemberGroup, Long> {

    @Transactional
    @Modifying
    @Query(value = "truncate membergroup", nativeQuery = true)
    void truncateMemberGroup();

    MemberGroup findByMemberId(Long memberId);
    List<MemberGroup> findByGroupId(int groupId);
}
