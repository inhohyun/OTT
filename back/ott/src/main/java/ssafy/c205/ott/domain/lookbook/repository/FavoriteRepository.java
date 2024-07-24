package ssafy.c205.ott.domain.lookbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.lookbook.entity.Favorite;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByLookbookId(Long lookbookId);
}
