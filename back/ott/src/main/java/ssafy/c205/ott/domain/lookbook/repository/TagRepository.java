package ssafy.c205.ott.domain.lookbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.lookbook.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
}
