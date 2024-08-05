package ssafy.c205.ott.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.item.entity.ItemImage;

public interface ItemImageRepository extends JpaRepository<ItemImage, Integer> {
}
