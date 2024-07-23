package ssafy.c205.ott.domain.lookbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.common.entity.LookbookTag;

public interface LookbookTagRepository extends JpaRepository<LookbookTag, Long> {
}
