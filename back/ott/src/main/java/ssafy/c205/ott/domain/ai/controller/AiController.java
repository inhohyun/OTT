package ssafy.c205.ott.domain.ai.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.domain.ai.dto.AiRequestDto;
import ssafy.c205.ott.domain.ai.service.AiService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/process")
@Slf4j
public class AiController {
    private final AiService aiService;

    @GetMapping
    public ResponseEntity<String> getHealth() {
        return ResponseEntity.ok()
                .body("health");
    }

    @Operation(summary = "AI 서버 Health check", description = "<big>AI 서버 Health check</big> 합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "AI 서버 상태"),
    })
    @GetMapping("/ai")
    public ResponseEntity<String> getAiHealth() {
        return ResponseEntity.ok().body(aiService.ping());
    }

    @Operation(summary = "AI 요청하기", description = "<big>모델에 옷 이미지를 합성</big> 합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "옷이미지"),
    })
    @PostMapping(value = "/ai", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> processImage(@ModelAttribute AiRequestDto aiRequestDto, @RequestParam MultipartFile modelImageFile) {
        aiRequestDto.setModelImageFile(modelImageFile);
        return aiService.processImage(aiRequestDto);
    }
}
