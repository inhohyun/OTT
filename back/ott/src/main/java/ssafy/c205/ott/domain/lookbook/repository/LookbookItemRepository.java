package ssafy.c205.ott.domain.lookbook.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import ssafy.c205.ott.common.entity.LookbookItem;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;

public interface LookbookItemRepository extends CrudRepository<LookbookItem, Long> {
    List<LookbookItem> findByLookbook(Lookbook lookbook);
}
