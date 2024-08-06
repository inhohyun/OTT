package ssafy.c205.ott.domain.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@Builder
@AllArgsConstructor
public class AiRequestDto {
    private Long memberId;
    private String modelImagePath;
    private String clothImagePath;
    private String modelType;
    private Integer category;
    private Float scale;
    private Integer sample;
    private MultipartFile modelImageFile;  // 추가
}
