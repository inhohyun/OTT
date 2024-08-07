package ssafy.c205.ott.domain.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.category.dto.CategoryRequestDto;
import ssafy.c205.ott.domain.category.exception.CategoryNameDuplicationException;
import ssafy.c205.ott.domain.category.repository.CategoryRepository;

@Service
@RequiredArgsConstructor
public class CategoryValidator {

    private final CategoryRepository categoryRepository;

    public void validateCategoryName(CategoryRequestDto categoryRequestDto) {
        if (categoryRepository.existsByNameAndClosetId(categoryRequestDto.getName(), categoryRequestDto.getClosetId())) {
            throw new CategoryNameDuplicationException();
        }
    }
}
