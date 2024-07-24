package ssafy.c205.ott.domain.lookbook.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookFavoriteDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;
import ssafy.c205.ott.domain.lookbook.service.LookbookService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/lookbook")
public class LookbookController {

    private final LookbookService lookbookService;

    //룩북 생성 -> 이미지가 잘 저장되나? 이미지를 선택 안했는지?
    //Todo : 이미지 잘 저장되는지와 이미지를 선택 했는지 예외처리
    @PostMapping("/")
    public ResponseEntity<?> createLookbook(@ModelAttribute LookbookDto lookbookCreateDto) {
        lookbookService.createLookbook(lookbookCreateDto);
        return new ResponseEntity<String>("룩북 저장을 완료하였습니다.", HttpStatus.OK);
    }

    //룩북 수정
    @PutMapping("/{lookbook_id}")
    public ResponseEntity<?> updateLookbook(@PathVariable String lookbookId, @ModelAttribute LookbookDto lookbookDto) {
        boolean isUpdateSuccess = lookbookService.updateLookbook(lookbookId, lookbookDto);
        if (isUpdateSuccess) {
            return new ResponseEntity<String>("옷 정보 수정을 완료했습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("옷 정보 수정을 실패했습니다.", HttpStatus.CONFLICT);
        }
    }

    //룩북 상세보기 -> 옷이 조회되지 않을때 예외처리 완료 / 다른 예외 생각해볼것
    @GetMapping("/{lookbook_id}")
    public ResponseEntity<?> detailLookbook(@PathVariable String lookbookId) {
        LookbookDetailDto lookbookDetailDto = lookbookService.detailLookbook(lookbookId);
        if (lookbookDetailDto == null) {
            log.error("룩북 상세조회 실패");
            return new ResponseEntity<String>("해당 룩북을 찾지 못했습니다.", HttpStatus.NOT_FOUND);
        } else {
            log.info("룩북 상세보기 성공");
            return new ResponseEntity<LookbookDetailDto>(lookbookDetailDto, HttpStatus.OK);
        }
    }

    //룩북 삭제하기
    @DeleteMapping("/{lookbook_id}")
    public ResponseEntity<?> deleteLookbook(@PathVariable String lookbookId) {
        boolean isDeleteSuccess = lookbookService.deleteLookbook(lookbookId);
        if (isDeleteSuccess) {
            return new ResponseEntity<String>("룩북 삭제를 성공하였습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("룩북 삭제를 실패하였습니다.", HttpStatus.CONFLICT);
        }
    }

    //룩북 좋아요
    @PostMapping("/{lookbook_id}/like")
    public ResponseEntity<?> likeLookbook(@PathVariable String lookbookId, @ModelAttribute LookbookFavoriteDto lookbookFavoriteDto) {
        boolean isFavoriteSuccess = lookbookService.likeLookbook(lookbookFavoriteDto);
        if (isFavoriteSuccess) {
            return new ResponseEntity<String>("룩북 좋아요를 성공했습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("룩북 좋아요를 실패했습니다.", HttpStatus.CONFLICT);
        }
    }

    //룩북 좋아요 수 조회
    @GetMapping("/{lookbook_id}/like-count")
    public ResponseEntity<?> likeLookbookCount(@PathVariable String lookbookId) {
        int likeCnt = lookbookService.cntLikeLookbook(lookbookId);
        if (likeCnt == -1) {
            return new ResponseEntity<String>("좋아요 개수를 조회하지 못했습니다.", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<Integer>(likeCnt, HttpStatus.OK);
        }
    }

    //나의 공개된 룩북 보기
    @GetMapping("/public")
    public ResponseEntity<?> publicLookbook(@RequestBody String userId) {
        return null;
    }

    //나의 비공개된 룩북 보기
    @GetMapping("/private")
    public ResponseEntity<?> privateLookbook(@RequestBody String userId) {
        return null;
    }

    //팔로우 중인 사람의 룩북 조회
    @GetMapping("/followings")
    public ResponseEntity<?> followingLookbook(@RequestBody String userId) {
        return null;
    }

    //태그를 통해 룩북 검색 -> UserId 부분 태그들로 변경할것
    @GetMapping("/search")
    public ResponseEntity<?> searchLookbook(@RequestBody String[] tags, String userId) {
        return null;
    }
}
