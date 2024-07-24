package ssafy.c205.ott.domain.lookbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;

import java.util.List;

public interface LookbookRepository extends JpaRepository<Lookbook, Long> {
    List<Lookbook> findByMemberIdAndPublicStatus(Long memberId, PublicStatus publicStatus);
}
