package ssafy.c205.ott.domain.category.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.ItemCategory;
import ssafy.c205.ott.domain.category.dto.*;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.category.exception.CategoryAlreadyUseException;
import ssafy.c205.ott.domain.category.exception.CategoryNotFoundException;
import ssafy.c205.ott.domain.category.repository.CategoryRepository;
import ssafy.c205.ott.domain.closet.entity.Closet;
import ssafy.c205.ott.domain.closet.repository.ClosetRepository;
import ssafy.c205.ott.domain.item.repository.ItemCategoryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ClosetRepository closetRepository;
    private final CategoryValidator categoryValidator;
    private final ItemCategoryRepository itemCategoryRepository;

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
                        .closetId(category.getCloset().getId())
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

    public DeleteCategorySuccessDto deleteCategory(Long CategoryId) {
        Category category = categoryRepository.findById(CategoryId).orElseThrow(CategoryNotFoundException::new);

        List<ItemCategory> itemCategories = itemCategoryRepository.findByCategoryId(category.getId());
        DeleteCategorySuccessDto deleteCategorySuccessDto = new DeleteCategorySuccessDto();
        if (itemCategories.isEmpty()) {
            categoryRepository.deleteById(category.getId());
            return deleteCategorySuccessDto;
        }
        deleteCategorySuccessDto.message = new CategoryAlreadyUseException().getMessage();
        return deleteCategorySuccessDto;
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
