package ssafy.c205.ott.domain.lookbook.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.lookbook.entity.ActiveStatus;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.entity.LookbookImageStatus;

public interface LookbookRepository extends JpaRepository<Lookbook, Long> {

    List<Lookbook> findByMemberIdAndPublicStatusAndActiveStatus(Long memberId,
        PublicStatus publicStatus, ActiveStatus activeStatus);

    Lookbook findByActiveStatus(ActiveStatus activeStatus);

    List<Lookbook> findByMemberIdAndActiveStatus(Long memberId, ActiveStatus activeStatus);
}
