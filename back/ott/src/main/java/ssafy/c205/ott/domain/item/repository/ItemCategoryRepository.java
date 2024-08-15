package ssafy.c205.ott.domain.item.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.c205.ott.common.entity.ItemCategory;
import ssafy.c205.ott.common.entity.PublicStatus;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {

    @Query("SELECT ic FROM ItemCategory ic WHERE ic.item.member.id = :memberId AND ic.category.id = :categoryId")
    List<ItemCategory> findByMemberIdAndCategoryId(@Param("memberId") Long memberId,
        @Param("categoryId") Long categoryId);

    @Query("SELECT ic FROM ItemCategory ic WHERE ic.item.id = :itemId AND ic.category.id = :categoryId")
    ItemCategory findByItemIdAndCategoryId(@Param("itemId") Long itemId,
        @Param("categoryId") Long categoryId);

    List<ItemCategory> findByCategoryId(Long categoryId);

    @Query("SELECT ic FROM ItemCategory ic WHERE ic.item.member.id = :memberId AND ic.category.id = :categoryId And ic.item.publicStatus = :publicStatus")
    List<ItemCategory> findByMemberIdAndCategoryIdAndPublicStatus(@Param("memberId") Long memberId,
        @Param("categoryId") Long categoryId, @Param("publicStatus") PublicStatus publicStatus);
}
