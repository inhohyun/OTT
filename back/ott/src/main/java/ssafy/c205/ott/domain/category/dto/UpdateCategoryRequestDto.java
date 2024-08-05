package ssafy.c205.ott.domain.category.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UpdateCategoryRequestDto {
    private Long categoryId;
    private Long closetId;
    private String newName;
}
