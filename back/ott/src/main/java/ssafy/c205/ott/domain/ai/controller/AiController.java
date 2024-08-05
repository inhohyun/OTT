package ssafy.c205.ott.domain.ai.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
        import ssafy.c205.ott.domain.ai.dto.AiRequestDto;
import ssafy.c205.ott.domain.ai.service.AiService;

import java.io.File;
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

    @GetMapping("/ai")
    public ResponseEntity<String> getAiHealth() {
        return ResponseEntity.ok().body(aiService.ping());
    }

    @PostMapping(value = "/ai", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> processImage(@ModelAttribute AiRequestDto aiRequestDto) {
        log.info(aiRequestDto.toString());

        return aiService.processImage(aiRequestDto);
    }
}
