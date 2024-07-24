package ssafy.c205.ott.domain.lookbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.c205.ott.common.entity.LookbookTag;

import java.util.List;

public interface LookbookTagRepository extends JpaRepository<LookbookTag, Long> {
    @Query("SELECT lt FROM LookbookTag lt WHERE lt.tag.name = :tagName")
    List<LookbookTag> findByTagName(@Param("tagName") String tagName);
}
