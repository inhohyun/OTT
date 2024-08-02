package ssafy.c205.ott.domain.account.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findBySso(String Sso);
    Optional<Member> findByIdAndActiveStatus(Long id, ActiveStatus activeStatus);
    Boolean existsByNickname(String nickname);

    @Query(value = "SELECT * FROM Member m WHERE (m.nickname LIKE %:nickname%) LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Member> findByNicknameContaining(@Param("nickname") String nickname, @Param("offset") int offset, @Param("limit") int limit);

}
