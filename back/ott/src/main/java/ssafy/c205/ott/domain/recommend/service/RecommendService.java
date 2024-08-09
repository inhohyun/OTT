package ssafy.c205.ott.domain.recommend.service;

import java.util.List;
import ssafy.c205.ott.domain.recommend.dto.responsedto.BodyResponseDto;

public interface RecommendService {

    void recommendByHeightWeight();

    List<BodyResponseDto> getRecommendByHeightWeight(Long memberId);

    List<BodyResponseDto> getRecommendByBody(Long memberId);

    List<BodyResponseDto> getRecommendByTag(Long memberId);
}
