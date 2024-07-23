package ssafy.c205.ott.domain.lookbook.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookCreateDto;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.service.LookbookService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/lookbook")
public class LookbookController {

    private final LookbookService lookbookService;

    //룩북 생성
    @PostMapping("/")
    public ResponseEntity<?> createLookBook(@ModelAttribute LookbookCreateDto lookbookCreateDto) {
        return null;
    }

    //룩북 수정
    @PutMapping("/{lookbook_id}")
    public ResponseEntity<?> updateLookBook(@PathVariable String lookbookId) {
        return null;
    }

    //룩북 상세보기
    @GetMapping("/{lookbook_id}")
    public ResponseEntity<?> detailLookBook(@PathVariable String lookbookId) {
        return null;
    }

    //룩북 삭제하기
    @DeleteMapping("/{lookbook_id}")
    public ResponseEntity<?> deleteLookBook(@PathVariable String lookbookId) {
        return null;
    }

    //룩북 좋아요
    @PostMapping("/{lookbook_id}/like")
    public ResponseEntity<?> likeLookBook(@PathVariable String lookbookId) {
        return null;
    }

    //룩북 좋아요 수 조회
    @GetMapping("/{lookbook_id}/like-count")
    public ResponseEntity<?> likeLookBookCount(@PathVariable String lookbookId) {
        return null;
    }

    //나의 공개된 룩북 보기
    @GetMapping("/public")
    public ResponseEntity<?> publicLookBook(@RequestBody String userId) {
        return null;
    }

    //나의 비공개된 룩북 보기
    @GetMapping("/private")
    public ResponseEntity<?> privateLookBook(@RequestBody String userId) {
        return null;
    }

    //팔로우 중인 사람의 룩북 조회
    @GetMapping("/followings")
    public ResponseEntity<?> followingLookBook(@RequestBody String userId) {
        return null;
    }

    //태그를 통해 룩북 검색 -> UserId 부분 태그들로 변경할것
    @GetMapping("/search")
    public ResponseEntity<?> searchLookBook(@RequestBody String[] tags, String userId) {
        return null;
    }
}
