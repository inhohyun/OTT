package ssafy.c205.ott.domain.category.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RegisterCategorySuccessDto {
    private final String message = "등록 완료";
    private final Long categoryId;

    @Builder
    public RegisterCategorySuccessDto(Long categoryId) {
        this.categoryId = categoryId;
    }
}
