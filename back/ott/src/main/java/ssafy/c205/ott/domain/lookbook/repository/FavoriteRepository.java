package ssafy.c205.ott.domain.lookbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.lookbook.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
}
