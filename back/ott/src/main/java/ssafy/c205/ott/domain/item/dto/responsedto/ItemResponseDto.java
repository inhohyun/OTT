package ssafy.c205.ott.domain.item.dto.responsedto;

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
public class ItemResponseDto {
    private String size;
    private String brand;
    private String purchase;
    private PublicStatus publicStatus;
    private String color;
    private Sex gender;
    private SalesStatus salesStatus;
    private String category;
    private String[] imageUrls;
    private Long clothesId;

    @Builder
    public ItemResponseDto(String size, String brand, String purchase, PublicStatus publicStatus, String color, Sex gender, SalesStatus salesStatus, String category, String[] imageUrls, Long clothesId) {
        this.size = size;
        this.brand = brand;
        this.purchase = purchase;
        this.publicStatus = publicStatus;
        this.color = color;
        this.gender = gender;
        this.salesStatus = salesStatus;
        this.category = category;
        this.imageUrls = imageUrls;
        this.clothesId = clothesId;
    }

    private ItemResponseDto() {

    }
}
