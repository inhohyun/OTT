package ssafy.c205.ott.domain.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.account.entity.Follow;
import ssafy.c205.ott.domain.account.entity.FollowStatus;
import ssafy.c205.ott.domain.account.entity.Member;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByToMemberIdAndFromMemberId(Long toMemberId, Long fromMemberId);
    void deleteByToMemberAndFromMember(Member toMember, Member fromMember);
    boolean existsByToMemberIdAndFromMemberId(Long toMemberId, Long fromMemberId);
    Optional<Follow> findByToMemberAndFromMember(Member toMember, Member fromMember);
    List<Follow> findByToMemberId(Long toMemberId);
    List<Follow> findByFromMemberId(Long fromMemberId);
    List<Follow> findByToMemberSsoAndFollowStatus(String toMemberSso, FollowStatus followStatus);
    Integer countByFromMemberId(Long fromMemberId);
    Integer countByToMemberId(Long toMemberId);
}
