package ssafy.c205.ott.domain.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.c205.ott.domain.category.entity.Category;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
    boolean existsByNameAndClosetId(String name, Long closetId);
    List<Category> findByClosetId(Long id);
    Optional<Category> findByIdAndClosetId(Long id, Long closetId);
}
