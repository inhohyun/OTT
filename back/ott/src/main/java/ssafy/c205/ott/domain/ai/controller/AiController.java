package ssafy.c205.ott.domain.ai.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.c205.ott.domain.ai.service.AiService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/process")
@Slf4j
public class AiController {
    private final AiService aiService;


    @PostMapping("/ai")
    public ResponseEntity<byte[]> processImage(@RequestParam String modelPath, @RequestParam String clothPath) {
        log.info("Processing image");
        byte[] result = aiService.processImage(modelPath, clothPath);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return ResponseEntity.ok()
                .headers(headers)
                .body(result);
    }
}
