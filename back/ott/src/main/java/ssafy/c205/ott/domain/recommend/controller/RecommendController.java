package ssafy.c205.ott.domain.recommend.controller;

import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.c205.ott.domain.recommend.dto.responsedto.BodyResponseDto;
import ssafy.c205.ott.domain.recommend.service.RecommendService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommend")
public class RecommendController {

    private final RecommendService recommendService;

    @GetMapping("/newHeightWeightRecommend")
    public ResponseEntity<?> heightweight() {
        recommendService.recommendByHeightWeight();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getHeightWeightRecommend")
    public ResponseEntity<?> getHeightWeightRecommend(@RequestParam("memberId") Long memberId) {
        List<BodyResponseDto> bodyResponseDtos = recommendService.getRecommendByHeightWeight(
            memberId);
        if (bodyResponseDtos == null) {
            return ResponseEntity.noContent().build();
        }
        Collections.shuffle(bodyResponseDtos);
        return ResponseEntity.ok().body(bodyResponseDtos);
    }

    @GetMapping("/getBodyRecommend")
    public ResponseEntity<?> getBodyRecommend(@RequestParam("memberId") Long memberId) {
        List<BodyResponseDto> bodyResponseDtos = recommendService.getRecommendByBody(memberId);
        if (bodyResponseDtos == null) {
            return ResponseEntity.noContent().build();
        }
        Collections.shuffle(bodyResponseDtos);
        return ResponseEntity.ok().body(bodyResponseDtos);
    }

    @GetMapping("/getTagRecommend")
    public ResponseEntity<?> getTagRecommend(@RequestParam("memberId") Long memberId) {
        List<BodyResponseDto> recommendByTag = recommendService.getRecommendByTag(memberId);
        if (recommendByTag == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("데이터를 찾지 못했습니다.");
        }
        Collections.shuffle(recommendByTag);
        return ResponseEntity.ok().body(recommendByTag);
    }
}
