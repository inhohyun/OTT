package ssafy.c205.ott.domain.account.dto.request;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
public class UploadProfileImageRequestDto {
    private MultipartFile file;
    private Long memberId;
}
