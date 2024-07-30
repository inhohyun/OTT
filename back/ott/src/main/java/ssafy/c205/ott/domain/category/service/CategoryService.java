package ssafy.c205.ott.domain.category.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.ClosetCategory;
import ssafy.c205.ott.domain.category.dto.CategoryDto;
import ssafy.c205.ott.domain.category.dto.RegisterCategorySuccessDto;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.category.repository.CategoryRepository;
import ssafy.c205.ott.domain.category.repository.ClosetCategoryRepository;
import ssafy.c205.ott.domain.closet.entity.Closet;
import ssafy.c205.ott.domain.closet.repository.ClosetRepository;
import ssafy.c205.ott.domain.closet.service.ClosetService;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ClosetCategoryRepository closetCategoryRepository;
    private final ClosetRepository closetRepository;

    public RegisterCategorySuccessDto registerCategory(long closetId, String name) {
        Category category = categoryRepository.findByName(name);
        if (category == null) {
            log.error("Category with name {} not found", name);
            category = new Category(name);
            categoryRepository.save(category);
        }
        Closet closet = closetRepository.findById(closetId).orElseThrow();
        ClosetCategory closetCategory = ClosetCategory.builder()
                .closet(closet)
                .category(category)
                .build();
        closetCategoryRepository.save(closetCategory);

        return RegisterCategorySuccessDto.builder()
                .categoryId(category.getId())
                .build();
    }
}
