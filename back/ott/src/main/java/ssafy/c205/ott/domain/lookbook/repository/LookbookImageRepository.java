package ssafy.c205.ott.domain.lookbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.lookbook.entity.LookbookImage;

public interface LookbookImageRepository extends JpaRepository<LookbookImage, Long> {
}
