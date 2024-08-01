package ssafy.c205.ott.domain.ai.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {
    private final String GPU_SERVER_URL = "http://70.12.130.121:8000/api/process/ai";

    private RestTemplate restTemplate;

    public byte[] processImage(String modelPath, String clothPath) {
        Map<String, String> request = new HashMap<>();
        request.put("model_path", modelPath);
        request.put("cloth_path", clothPath);

        ResponseEntity<byte[]> response = restTemplate.postForEntity(GPU_SERVER_URL, request, byte[].class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new RuntimeException("Failed to process image");
        }
    }

}
