package ssafy.c205.ott.domain.category.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.category.dto.*;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.category.exception.CategoryNotFoundException;
import ssafy.c205.ott.domain.category.repository.CategoryRepository;
import ssafy.c205.ott.domain.closet.entity.Closet;
import ssafy.c205.ott.domain.closet.repository.ClosetRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ClosetRepository closetRepository;
    private final CategoryValidator categoryValidator;

    public RegisterCategorySuccessDto registerCategory(CategoryRequestDto categoryRequestDto) {
        categoryValidator.validateCategoryName(categoryRequestDto);
        Closet closet = findClosetById(categoryRequestDto.getClosetId());
        Category category = Category.builder()
                .name(categoryRequestDto.getName())
                .closet(closet)
                .build();
        categoryRepository.save(category);
        return buildRegisterCategorySuccessDto(category);
    }

    public List<CategoryDto> getCategories(Long closetId) {
        List<Category> findClosetCategory = categoryRepository.findByClosetId(closetId);
        return findClosetCategory.stream()
                .map(category -> CategoryDto.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public UpdateCategorySuccessDto updateCategory(UpdateCategoryRequestDto updateCategoryRequestDto) {
        Category category = categoryRepository.findByIdAndClosetId(updateCategoryRequestDto.getCategoryId(), updateCategoryRequestDto.getClosetId()).orElseThrow(CategoryNotFoundException::new);
        category.updateCategory(updateCategoryRequestDto.getNewName());
        categoryRepository.save(category);
        return UpdateCategorySuccessDto.builder().categoryId(category.getId()).build();
    }

    public DeleteCategorySuccessDto deleteCategory(CategoryRequestDto categoryRequestDto) {
        Category category = categoryRepository.findByName(categoryRequestDto.getName()).orElseThrow(CategoryNotFoundException::new);
        categoryRepository.deleteById(category.getId());
        return new DeleteCategorySuccessDto();
    }

    private Closet findClosetById(long closetId) {
        return closetRepository.findById(closetId)
                .orElseThrow();
    }

    private RegisterCategorySuccessDto buildRegisterCategorySuccessDto(Category category) {
        return RegisterCategorySuccessDto.builder()
                .categoryId(category.getId())
                .build();
    }
}
