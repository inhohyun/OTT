package ssafy.c205.ott.domain.item.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.item.entity.BookmarkStatus;
import ssafy.c205.ott.domain.item.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByMemberId(Long memberId);
    List<Item> findByMemberIdAndBookmarkStatus(Long memberId, BookmarkStatus bookmarkStatus);
}
