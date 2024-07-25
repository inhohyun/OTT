package ssafy.c205.ott.domain.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findBySso(String Sso);
    Optional<Member> findByIdAndActiveStatus(Long id, ActiveStatus activeStatus);
    Boolean existsByNickname(String nickname);
}
