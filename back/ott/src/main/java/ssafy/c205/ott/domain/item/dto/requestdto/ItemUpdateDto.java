package ssafy.c205.ott.domain.item.dto.requestdto;

import lombok.*;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.item.entity.SalesStatus;
import ssafy.c205.ott.domain.item.entity.Sex;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
public class ItemUpdateDto {

    private String size;
    private String brand;
    private String purchase;
    private PublicStatus publicStatus;
    private String color;
    private Sex gender;
    private Long memberId;
    private SalesStatus salesStatus;
    private Long originalCategoryId;
    private Long newCategoryId;
    private Long clothesId;

}
