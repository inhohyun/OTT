package ssafy.c205.ott.domain.item.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.c205.ott.common.entity.ItemCategory;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {
    @Query("SELECT ic FROM ItemCategory ic WHERE ic.item.member.id = :memberId AND ic.category.id = :categoryId")
    List<ItemCategory> findByMemberIdAndCategoryId(@Param("memberId") Long memberId, @Param("categoryId") Long categoryId);
}
