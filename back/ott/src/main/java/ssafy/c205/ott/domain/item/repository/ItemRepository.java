package ssafy.c205.ott.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.item.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
