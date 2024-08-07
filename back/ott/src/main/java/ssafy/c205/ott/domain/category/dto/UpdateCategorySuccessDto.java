package ssafy.c205.ott.domain.category.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateCategorySuccessDto {
    private final String message = "수정 완료";
    private final Long categoryId;

    @Builder
    public UpdateCategorySuccessDto(Long categoryId) {
        this.categoryId = categoryId;
    }
}
