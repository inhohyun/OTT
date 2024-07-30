package ssafy.c205.ott.domain.category.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.common.ApiResponse;
import ssafy.c205.ott.domain.category.dto.CategoryDto;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.category.service.CategoryService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/{closetId}")
    public ApiResponse<Void> registerCategory(@PathVariable long closetId, @RequestBody CategoryDto categoryDto) {
        categoryService.registerCategory(closetId, categoryDto.getName());
    }

//    @PutMapping("/{closetId}/")
}
