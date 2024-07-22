package ssafy.c205.ott.common.oauth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.common.oauth.entity.RefreshEntity;

public interface RefreshRepository extends JpaRepository<RefreshEntity, Long> {

    Boolean existsByRefresh(String refresh);

    @Transactional
    void deleteByRefresh(String refresh);
}
