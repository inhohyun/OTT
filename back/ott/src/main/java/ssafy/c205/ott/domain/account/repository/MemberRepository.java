package ssafy.c205.ott.domain.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.account.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByName(String name);
}
