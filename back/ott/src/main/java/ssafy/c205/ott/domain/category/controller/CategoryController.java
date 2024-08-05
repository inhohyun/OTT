package ssafy.c205.ott.domain.category.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.common.ApiResponse;
import ssafy.c205.ott.domain.category.dto.CategoryDto;
import ssafy.c205.ott.domain.category.dto.CategoryRequestDto;
import ssafy.c205.ott.domain.category.dto.RegisterCategorySuccessDto;
import ssafy.c205.ott.domain.category.repository.ClosetCategoryRepository;
import ssafy.c205.ott.domain.category.service.CategoryService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/{closetId}")
    public ApiResponse<RegisterCategorySuccessDto> registerCategory(@PathVariable long closetId, @RequestBody CategoryDto categoryDto) {
        return ApiResponse.success(categoryService.registerCategory(CategoryRequestDto.builder().id(closetId).name(categoryDto.getName()).build()));
    }

    @GetMapping("/{closetId}")
    public ApiResponse<List<CategoryDto>> getCategories(@PathVariable Long closetId) {
        return ApiResponse.success(categoryService.getCategories(closetId));
    }
}