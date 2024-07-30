package ssafy.c205.ott.domain.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.account.entity.Follow;
import ssafy.c205.ott.domain.account.entity.Member;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByToMemberIdAndFromMemberId(Long toMemberId, Long fromMemberId);
    void deleteByToMemberAndFromMember(Member toMember, Member fromMember);
}
