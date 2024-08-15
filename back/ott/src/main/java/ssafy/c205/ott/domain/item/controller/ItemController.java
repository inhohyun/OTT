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
import ssafy.c205.ott.domain.item.dto.responsedto.ItemCategoryResponseDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemResponseDto;
import ssafy.c205.ott.domain.item.entity.Item;
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
        @RequestParam(value = "frontImg", required = true) MultipartFile frontImg,
        @RequestParam(value = "backImg", required = false) MultipartFile backImg) {
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
        @RequestParam(value = "frontImg", required = false) MultipartFile frontImg,
        @RequestParam(value = "backImg", required = false) MultipartFile backImg) {
        Item item = itemService.updateItem(clothesId, itemUpdateDto, frontImg, backImg);
        return ResponseEntity.ok().body(item);
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

    @Operation(summary = "카테고리별 옷 조회하기", description = "<big>카테고리별 옷</big>을 조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "카테고리별 옷 리스트"),
    })
    @GetMapping("/{user_id}/{category_id}")
    public ResponseEntity<?> getItemByCategory(@PathVariable("user_id") Long userId,
        @PathVariable("category_id") Long categoryId, @RequestParam("closet_id") Long closetId) {
        return ResponseEntity.ok().body(itemService.selectByCategory(categoryId, userId, closetId));
    }

    @Operation(summary = "옷 북마크 하기", description = "옷을 <big>북마크</big>합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "북마크를 완료했습니다."),
    })
    @PostMapping("/bookmark/{cloth_id}")
    public ResponseEntity<?> bookmarkClothes(@PathVariable("cloth_id") Long clothesId) {
        log.info("룩북 아이디 : {}", clothesId);
        Long id = itemService.bookmarkClothes(clothesId);
        return ResponseEntity.ok().body(id);
    }

    @Operation(summary = "옷 북마크 해제", description = "옷의 <big>북마크를 해제</big>합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "북마크 해제를 완료했습니다."),
    })
    @PostMapping("/unbookmark/{cloth_id}")
    public ResponseEntity<?> unbookmarkClothes(@PathVariable("cloth_id") Long clothesId) {
        log.info("룩북 아이디 : {}", clothesId);
        Long id = itemService.unbookmarkClothes(clothesId);
        return ResponseEntity.ok().body(id);
    }

    @Operation(summary = "북마크된 옷 조회", description = "<big>북마크된 옷을 조회</big>합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "북마크된 옷 리스트"),
    })
    @GetMapping("/bookmark")
    public ResponseEntity<?> getBookmark(@RequestParam("memberId") Long memberId) {
        List<ItemCategoryResponseDto> itemCategoryResponseDtos = itemService.selectByBookmark(
            memberId);
        if (itemCategoryResponseDtos == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("북마크된 옷을 찾지 못했습니다.");
        }
        return ResponseEntity.ok().body(itemCategoryResponseDtos);
    }

    @Operation(summary = "상대방의 모든 옷 조회", description = "<big>RTC 상대의 모든 옷을</big> 조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "상대방의 모든 옷"),
    })
    @GetMapping("/rtc/{member_id}/list")
    public ResponseEntity<?> getItemListByRtc(@PathVariable("member_id") Long memberId) {
        return ResponseEntity.ok().body(itemService.selectByRtcList(memberId));
    }

    @Operation(summary = "상대방의 카테고리별 옷을 조회합니다.", description = "<big>상대방의 카테고리의 옷을 </big>조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "해당 카테고리의 상대 옷"),
    })
    @GetMapping("/rtc/{member_id}/{category_id}")
    public ResponseEntity<?> getCategoryItemListByRtc(@PathVariable("member_id") Long memberId,
        @PathVariable("category_id") Long categoryId, @RequestParam("closet_id") Long closetId) {
        return ResponseEntity.ok()
            .body(itemService.selectByRtcCategoryList(memberId, categoryId, closetId));
    }

}
