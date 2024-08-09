package ssafy.c205.ott.domain.recommend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "추천서비스 컨트롤러", description = "룩북 서비스의 전반적인 추천서비스를 관리하는 클래스")
public class RecommendController {

    private final RecommendService recommendService;

    @Operation(summary = "K-Means 클러스터링 하는 API", description = "<big>유저의 키, 몸무게를 기준으로</big> 클러스터링 합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "클러스터링 완료"),
    })
    @GetMapping("/newHeightWeightRecommend")
    public ResponseEntity<?> heightweight() {
        recommendService.recommendByHeightWeight();
        return ResponseEntity.ok().body("클러스터링 완료");
    }

    @Operation(summary = "키, 몸무게를 기반으로 룩북을 추천", description = "<big>유저의 키, 몸무게를 기준으로</big> 룩북을 추천 합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "추천된 룩북 목록"),
        @ApiResponse(responseCode = "204", description = "룩북을 찾지 못했습니다."),
    })
    @GetMapping("/getHeightWeightRecommend")
    public ResponseEntity<?> getHeightWeightRecommend(@RequestParam("memberId") Long memberId) {
        List<BodyResponseDto> bodyResponseDtos = recommendService.getRecommendByHeightWeight(
            memberId);
        if (bodyResponseDtos == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("룩북을 찾지 못했습니다.");
        }
        Collections.shuffle(bodyResponseDtos);
        return ResponseEntity.ok().body(bodyResponseDtos);
    }

    @Operation(summary = "체형 기반으로 룩북을 추천", description = "<big>유저의 체형을 기준으로</big> 룩북을 추천 합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "추천된 룩북 목록"),
        @ApiResponse(responseCode = "204", description = "룩북을 찾지 못했습니다."),
    })
    @GetMapping("/getBodyRecommend")
    public ResponseEntity<?> getBodyRecommend(@RequestParam("memberId") Long memberId) {
        List<BodyResponseDto> bodyResponseDtos = recommendService.getRecommendByBody(memberId);
        if (bodyResponseDtos == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("룩북을 찾지 못했습니다.");
        }
        Collections.shuffle(bodyResponseDtos);
        return ResponseEntity.ok().body(bodyResponseDtos);
    }

    @Operation(summary = "태그 기반으로 룩북을 추천", description = "<big>유저의 태그를 기준으로</big> 룩북을 추천 합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "추천된 룩북 목록"),
        @ApiResponse(responseCode = "204", description = "데이터를 찾지 못했습니다."),
    })
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
