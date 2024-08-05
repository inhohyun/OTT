package ssafy.c205.ott.domain.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.c205.ott.common.entity.ClosetCategory;

import java.util.List;

@Repository
public interface ClosetCategoryRepository extends JpaRepository<ClosetCategory, Long> {
    List<ClosetCategory> findByClosetId(Long closetId);
}
