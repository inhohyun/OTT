package ssafy.c205.ott.domain.category.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CategoryRequestDto {
    long id;
    String name;
}
