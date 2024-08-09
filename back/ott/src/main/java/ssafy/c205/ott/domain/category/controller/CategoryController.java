package ssafy.c205.ott.domain.category.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @Operation(summary = "카테고리 등록", description = "<big>카테고리를</big> 등록합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "카테고리 등록"),
    })
    @PostMapping("/{closetId}")
    public ApiResponse<RegisterCategorySuccessDto> registerCategory(@PathVariable Long closetId, @RequestBody CategoryDto categoryDto) {
        return ApiResponse.success(categoryService.registerCategory(CategoryRequestDto.builder().closetId(closetId).name(categoryDto.getName()).build()));
    }

    @Operation(summary = "카테고리 조회", description = "<big>카테고리를</big> 조회합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "카테고리 조회"),
    })
    @GetMapping("/{closetId}")
    public ResponseEntity<?> getCategories(@PathVariable Long closetId) {
        return ResponseEntity.ok().body(categoryService.getCategories(closetId));
    }
//    @GetMapping("/{closetId}")
//    public ApiResponse<List<CategoryDto>> getCategories(@PathVariable Long closetId) {
//        return ApiResponse.success(categoryService.getCategories(closetId));
//    }

    @Operation(summary = "카테고리 수정", description = "<big>카테고리를</big> 수정합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "카테고리 수정"),
    })
    @PutMapping("/{closetId}")
    public ApiResponse<UpdateCategorySuccessDto> updateCategory(@PathVariable Long closetId, @RequestBody UpdateCategoryRequestDto updateCategoryRequestDto) {
        return ApiResponse.success(categoryService.updateCategory(updateCategoryRequestDto));
    }

    @Operation(summary = "카테고리 삭제", description = "<big>카테고리를</big> 삭제합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "카테고리 삭제"),
    })
    @DeleteMapping("/{closetId}")
    public ApiResponse<DeleteCategorySuccessDto> deleteCategory(@PathVariable Long closetId) {
        return ApiResponse.success(categoryService.deleteCategory(CategoryRequestDto.builder().closetId(closetId).build()));
    }
}