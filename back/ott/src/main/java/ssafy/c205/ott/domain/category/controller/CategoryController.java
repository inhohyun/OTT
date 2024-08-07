package ssafy.c205.ott.domain.category.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.common.ApiResponse;
import ssafy.c205.ott.domain.category.dto.*;
import ssafy.c205.ott.domain.category.service.CategoryService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/{closetId}")
    public ApiResponse<RegisterCategorySuccessDto> registerCategory(@PathVariable Long closetId, @RequestBody CategoryDto categoryDto) {
        return ApiResponse.success(categoryService.registerCategory(CategoryRequestDto.builder().closetId(closetId).name(categoryDto.getName()).build()));
    }

    @GetMapping("/{closetId}")
    public ApiResponse<List<CategoryDto>> getCategories(@PathVariable Long closetId) {
        return ApiResponse.success(categoryService.getCategories(closetId));
    }

    @PutMapping("/{closetId}")
    public ApiResponse<UpdateCategorySuccessDto> updateCategory(@PathVariable Long closetId, @RequestBody UpdateCategoryRequestDto updateCategoryRequestDto) {
        return ApiResponse.success(categoryService.updateCategory(updateCategoryRequestDto));
    }

    @DeleteMapping("/{closetId}")
    public ApiResponse<DeleteCategorySuccessDto> deleteCategory(@PathVariable Long closetId) {
        return ApiResponse.success(categoryService.deleteCategory(CategoryRequestDto.builder().closetId(closetId).build()));
    }
}