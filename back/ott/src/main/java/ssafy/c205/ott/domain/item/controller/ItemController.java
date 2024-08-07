package ssafy.c205.ott.domain.item.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemCreateDto;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemUpdateDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemResponseDto;
import ssafy.c205.ott.domain.item.service.ItemService;

@Slf4j
@RestController
@RequestMapping("/api/clothes")
@RequiredArgsConstructor
@Tag(name = "옷 컨트롤러", description = "옷 생성, 조회, 삭제, 옷 북마크 등 전반적인 옷을 관리하는 클래스")
public class ItemController {

    private final ItemService itemService;

    @Operation(summary = "옷 생성하기", description = "<big>옷</big>을 생성합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "옷 저장을 완료했습니다."),
    })
    @PostMapping("/")
    public ResponseEntity<?> createItem(@ModelAttribute ItemCreateDto itemCreateDto,
        @RequestParam(value = "frontImg", required = true) MultipartFile frontImg, @RequestParam(value = "backImg", required = false) MultipartFile backImg) {
        if (frontImg == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("필요 이미지가 없습니다.");
        }
        itemService.createItem(itemCreateDto, frontImg, backImg);
        return ResponseEntity.ok().body("옷 저장을 완료했습니다.");
    }

    @Operation(summary = "옷 수정하기", description = "<big>옷</big>을 수정합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "옷 수정을 완료했습니다."),
    })
    @PutMapping("/{clothes_id}")
    public ResponseEntity<?> updateItem(@PathVariable("clothes_id") Long clothesId,
        @ModelAttribute ItemUpdateDto itemUpdateDto,
        @RequestParam(value = "frontImg", required = false) MultipartFile frontImg, @RequestParam(value = "backImg", required = false) MultipartFile backImg) {
        itemService.updateItem(clothesId, itemUpdateDto, frontImg, backImg);
        return ResponseEntity.ok().body("옷 수정을 완료했습니다.");
    }

    @Operation(summary = "옷 삭제하기", description = "<big>옷</big>을 삭제합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "옷 삭제를 완료했습니다."),
    })
    @DeleteMapping("/{clothes_id}")
    public ResponseEntity<?> deleteItem(@PathVariable("clothes_id") Long clothesId) {
        itemService.deleteItem(clothesId);
        return ResponseEntity.ok().body("옷 삭제를 완료했습니다.");
    }

    @Operation(summary = "옷 상세조회 하기", description = "<big>옷</big>을 상세조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "옷 정보"),
    })
    @GetMapping("/{clothes_id}")
    public ResponseEntity<?> getItem(@PathVariable("clothes_id") Long clothesId) {
        ItemResponseDto itemResponseDto = itemService.selectItem(clothesId);
        if (itemResponseDto == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(itemResponseDto);
        }
    }

    @Operation(summary = "모든 옷 조회하기", description = "<big>모든 옷</big>을 조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "모든 옷 리스트"),
    })
    @GetMapping("/{user_id}/list")
    public ResponseEntity<?> getItemList(@PathVariable("user_id") Long userId) {
        return ResponseEntity.ok().body(itemService.selectItemList(userId));
    }

    @GetMapping("/{user_id}/{category_id}")
    public ResponseEntity<?> getItemByCategory(@PathVariable("user_id") Long userId,
        @PathVariable("category_id") Long categoryId, @RequestParam("closet_id") Long closetId) {
        return ResponseEntity.ok().body(itemService.selectByCategory(categoryId, userId, closetId));
    }

    @PostMapping("/bookmark/{cloth_id}")
    public ResponseEntity<?> bookmarkClothes(@PathVariable("cloth_id") Long clothesId) {
        log.info("룩북 아이디 : {}", clothesId);
        itemService.bookmarkLookbook(clothesId);
        return ResponseEntity.ok().body("북마크를 완료했습니다.");
    }

    @PostMapping("/unbookmark/{cloth_id}")
    public ResponseEntity<?> unbookmarkClothes(@PathVariable("cloth_id") Long clothesId) {
        log.info("룩북 아이디 : {}", clothesId);
        itemService.unbookmarkLookbook(clothesId);
        return ResponseEntity.ok().body("북마크 해제를 완료했습니다.");
    }
}
