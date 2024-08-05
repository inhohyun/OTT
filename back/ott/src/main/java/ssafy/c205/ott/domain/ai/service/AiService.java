package ssafy.c205.ott.domain.ai.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import ssafy.c205.ott.domain.ai.dto.AiRequestDto;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@Slf4j
public class AiService {
    @Value("${gpu.server.url}")
    private String GPU_SERVER_BASE_URL;

    private final RestTemplate restTemplate;

    public AiService() {
        this.restTemplate = new RestTemplate();
    }

    public String ping() {
        return restTemplate.getForObject(GPU_SERVER_BASE_URL + "/", String.class);
    }

    public ResponseEntity<Map<String, Object>> processImage(AiRequestDto aiRequestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.set("memberId", String.valueOf(aiRequestDto.getMemberId()));
        body.set("modelImagePath", aiRequestDto.getModelImagePath());
        body.set("clothImagePath", aiRequestDto.getClothImagePath());
        body.set("category", String.valueOf(aiRequestDto.getCategory()));

        // 선택적 필드 추가
        if (aiRequestDto.getModelType() != null) {
            body.set("modelType", aiRequestDto.getModelType());
        }
        if (aiRequestDto.getScale() != null) {
            body.set("scale", String.valueOf(aiRequestDto.getScale()));
        }
        if (aiRequestDto.getSample() != null) {
            body.set("sample", String.valueOf(aiRequestDto.getSample()));
        }
        log.info(body.toString());

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(GPU_SERVER_BASE_URL + "/generate", request, Map.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to process image");
        }

        // GPU 서버로부터 받은 base64 인코딩된 이미지 데이터 그대로 반환
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("images", response.getBody().get("images"));

        return ResponseEntity.ok(responseBody);
    }

}
