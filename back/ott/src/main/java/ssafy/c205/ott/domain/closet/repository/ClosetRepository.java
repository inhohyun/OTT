package ssafy.c205.ott.domain.closet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ssafy.c205.ott.domain.closet.entity.Closet;

import java.util.List;

@Repository
public interface ClosetRepository extends JpaRepository<Closet, Long> {
    List<Closet> findByMemberId(@Param("memberId") Long memberId);
}
