package ssafy.c205.ott.domain.recommend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.common.entity.MemberTag;

public interface MemberTagRepository extends JpaRepository<MemberTag, Long> {
    List<MemberTag> findByMemberId(Long memberId);
}
