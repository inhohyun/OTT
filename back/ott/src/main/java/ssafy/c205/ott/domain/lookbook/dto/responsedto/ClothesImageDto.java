package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClothesImageDto {

    private Long clothesId;
    private ClothesImagePathDto imagePath;
}
