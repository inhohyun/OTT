package ssafy.c205.ott.domain.item.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.item.entity.SalesStatus;
import ssafy.c205.ott.domain.item.entity.Sex;

@Getter
@Setter
@ToString
public class ItemUpdateDto {

    private String size;
    private String brand;
    private String purchase;
    private PublicStatus publicStatus;
    private String color;
    private Sex gender;
    private Long uid;
    private SalesStatus salesStatus;
    private Long categoryId;

    @Builder
    public ItemUpdateDto(String size, String brand, String purchase, PublicStatus publicStatus,
        String color, Sex gender, Long uid, SalesStatus salesStatus, Long categoryId) {
        this.size = size;
        this.brand = brand;
        this.purchase = purchase;
        this.publicStatus = publicStatus;
        this.color = color;
        this.gender = gender;
        this.uid = uid;
        this.salesStatus = salesStatus;
        this.categoryId = categoryId;
    }

    public ItemUpdateDto() {
    }
}
