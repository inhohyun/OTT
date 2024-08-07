package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
@Builder
public class ClothesImageDto {

    private Long clothesId;
    private ClothesImagePathDto imagePath;
}
