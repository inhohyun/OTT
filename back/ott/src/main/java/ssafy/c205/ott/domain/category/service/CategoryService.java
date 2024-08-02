package ssafy.c205.ott.domain.category.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.ClosetCategory;
import ssafy.c205.ott.domain.category.dto.CategoryRequestDto;
import ssafy.c205.ott.domain.category.dto.DeleteCategorySuccessDto;
import ssafy.c205.ott.domain.category.dto.RegisterCategorySuccessDto;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.category.exception.CategoryNotFoundException;
import ssafy.c205.ott.domain.category.repository.CategoryRepository;
import ssafy.c205.ott.domain.category.repository.ClosetCategoryRepository;
import ssafy.c205.ott.domain.closet.entity.Closet;
import ssafy.c205.ott.domain.closet.repository.ClosetRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryService {
    // Todo: Closet Not Fount 예외처리
    private final CategoryRepository categoryRepository;
    private final ClosetCategoryRepository closetCategoryRepository;
    private final ClosetRepository closetRepository;

    public RegisterCategorySuccessDto registerCategory(CategoryRequestDto categoryRequestDto) {
        Category category = findOrCreateCategoryByName(categoryRequestDto.getName());
        Closet closet = findClosetById(categoryRequestDto.getId());
        saveClosetCategory(closet, category);

        return buildRegisterCategorySuccessDto(category);
    }

    private Category findOrCreateCategoryByName(String name) {
        return categoryRepository.findByName(name)
                .orElseGet(() -> createAndSaveCategory(name));
    }

    private Category createAndSaveCategory(String name) {
        log.error("Category with name {} not found, creating a new one.", name);
        Category category = new Category(name);
        categoryRepository.save(category);
        return category;
    }

    private Closet findClosetById(long closetId) {
        return closetRepository.findById(closetId)
                .orElseThrow();
    }

    private void saveClosetCategory(Closet closet, Category category) {
        ClosetCategory closetCategory = ClosetCategory.builder()
                .closet(closet)
                .category(category)
                .build();
        closetCategoryRepository.save(closetCategory);
    }

    private RegisterCategorySuccessDto buildRegisterCategorySuccessDto(Category category) {
        return RegisterCategorySuccessDto.builder()
                .categoryId(category.getId())
                .build();
    }
}
