package ssafy.c205.ott.domain.account.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findBySso(String Sso);
    Optional<Member> findByIdAndActiveStatus(Long id, ActiveStatus activeStatus);
    Boolean existsByNickname(String nickname);
    List<Member> findByActiveStatus(ActiveStatus activeStatus);

    @Query("SELECT m FROM Member m WHERE m.nickname LIKE %:nickname% AND m.activeStatus = :activeStatus")
    Page<Member> findByNicknameContainingAndActiveStatus(@Param("nickname") String nickname, @Param("activeStatus") ActiveStatus activeStatus, Pageable pageable);
}
