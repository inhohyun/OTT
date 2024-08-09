package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.c205.ott.domain.item.entity.ItemStatus;

@Getter @Setter
@ToString
@Builder
public class ClothesImagePathDto {

    private String path;
    private ItemStatus itemStatus;
}
