package ssafy.c205.ott.domain.ai.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import ssafy.c205.ott.common.exception.S3FileNotExistException;
import ssafy.c205.ott.common.util.AmazonS3Util;
import ssafy.c205.ott.domain.ai.dto.AiRequestDto;
import ssafy.c205.ott.domain.ai.exception.AiBadRequestException;
import ssafy.c205.ott.domain.notification.util.NotificationMessage;
import ssafy.c205.ott.domain.notification.service.NotificationService;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiService {
    @Value("${gpu.server.url}")
    private String GPU_SERVER_BASE_URL;

    private final NotificationService notificationService;
    private final AmazonS3Util amazonS3Util;

    public String ping() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(GPU_SERVER_BASE_URL + "/", String.class);
    }

    public ResponseEntity<Map<String, Object>> processImage(AiRequestDto aiRequestDto) {
        // 모델 사진 업로드
        aiRequestDto.setModelImagePath(amazonS3Util.saveFile(aiRequestDto.getModelImageFile(), aiRequestDto.getMemberId() + "/aimodel/"));

        if (aiRequestDto.getModelImagePath() == null || aiRequestDto.getClothImagePath() == null) {
            throw new S3FileNotExistException();
        }

        if (aiRequestDto.getMemberId() == null || aiRequestDto.getCategory() == null) {
            throw new AiBadRequestException();
        }

        // 최대 4장만 가능하도록 제한
        aiRequestDto.setSample(Math.min(4, aiRequestDto.getSample()));

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
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(GPU_SERVER_BASE_URL + "/generate", request, Map.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to process image");
        }

        // GPU 서버로부터 받은 base64 인코딩된 이미지 데이터 그대로 반환
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("images", response.getBody().get("images"));
        log.info(responseBody.toString());

        // 모델 사진 삭제
        amazonS3Util.deleteFile(aiRequestDto.getModelImagePath());

        // AI 이미지 완성 알림
        notificationService.createNotification(NotificationMessage.AI_COMPLETE, aiRequestDto.getMemberId());

        return ResponseEntity.ok(responseBody);
    }
}
