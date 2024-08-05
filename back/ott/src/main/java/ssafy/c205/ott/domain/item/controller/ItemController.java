package ssafy.c205.ott.domain.item.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemCreateDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemResponseDto;
import ssafy.c205.ott.domain.item.service.ItemService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/clothes")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/")
    public ResponseEntity<?> createItem(@ModelAttribute ItemCreateDto itemCreateDto, @RequestParam(value = "img") List<MultipartFile> images) {
        itemService.createItem(itemCreateDto, images);
        return ResponseEntity.ok().body("옷 저장을 완료했습니다.");
    }

    @PutMapping("/{clothes_id}")
    public ResponseEntity<?> updateItem(@PathVariable("clothes_id") Long clothesId, @ModelAttribute ItemCreateDto itemCreateDto, @RequestParam(value = "img") List<MultipartFile> images) {
        itemService.updateItem(clothesId, itemCreateDto, images);
        return ResponseEntity.ok().body("옷 수정을 완료했습니다.");
    }

    @DeleteMapping("/{clothes_id}")
    public ResponseEntity<?> deleteItem(@PathVariable("clothes_id") Long clothesId) {
        itemService.deleteItem(clothesId);
        return ResponseEntity.ok().body("옷 삭제를 완료했습니다.");
    }

    @GetMapping("/{clothes_id}")
    public ResponseEntity<?> getItem(@PathVariable("clothes_id") Long clothesId) {
        ItemResponseDto itemResponseDto = itemService.selectItem(clothesId);
        if (itemResponseDto == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(itemResponseDto);
        }
    }
}
