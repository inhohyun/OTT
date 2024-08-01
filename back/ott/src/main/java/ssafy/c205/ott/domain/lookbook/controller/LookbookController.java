package ssafy.c205.ott.domain.lookbook.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookFavoriteDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookSearchDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.FindLookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.TagLookbookDto;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.service.LookbookService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lookbook")
@Tag(name = "룩북 컨트롤러", description = "룩북 생성, 조회, 삭제, 룩북 좋아요 등 전반적인 룩북을 관리하는 클래스")
public class LookbookController {

    private final LookbookService lookbookService;

    @Operation(summary = "룩북 생성하기", description = "<big>룩북 데이터를</big> 생성합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "룩북 저장을 완료하였습니다."),
    })
    //룩북 생성 -> 이미지가 잘 저장되나? 이미지를 선택 안했는지?
    //Todo : 이미지 잘 저장되는지와 이미지를 선택 했는지 예외처리
    @PostMapping("/")
    public ResponseEntity<?> createLookbook(@ModelAttribute LookbookDto lookbookCreateDto, @RequestParam(value = "img", required = false) MultipartFile file) {
        log.info("Dto : {}", lookbookCreateDto.toString());
        log.info("File : {}", file.getOriginalFilename());
        lookbookService.createLookbook(lookbookCreateDto, file);
        log.info("Dto : {}", lookbookCreateDto.getUid());
        log.info("File : {}", file.getOriginalFilename());
        return new ResponseEntity<String>("룩북 저장을 완료하였습니다.", HttpStatus.OK);
    }

    //룩북 수정
    @Operation(summary = "룩북 수정하기", description = "<big>룩북 데이터를</big>를 수정합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "룩북 정보 수정을 완료했습니다."),
    })
    @PutMapping("/{lookbook_id}")
    public ResponseEntity<?> updateLookbook(@PathVariable("lookbook_id") String lookbookId, @ModelAttribute LookbookDto lookbookDto, @RequestParam(value = "img") MultipartFile file) {
        boolean isUpdateSuccess = lookbookService.updateLookbook(lookbookId, lookbookDto, file);
        if (isUpdateSuccess) {
            return new ResponseEntity<String>("룩북 정보 수정을 완료했습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("룩북 정보 수정을 실패했습니다.", HttpStatus.CONFLICT);
        }
    }

    //룩북 상세보기 -> 옷이 조회되지 않을때 예외처리 완료 / 다른 예외 생각해볼것
    @Operation(summary = "룩북 상세조회하기", description = "<big>룩북 상세데이터를</big> 조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "해당 룩북의 상세 데이터"),
    })
    @GetMapping("/{lookbook_id}")
    public ResponseEntity<?> detailLookbook(@PathVariable("lookbook_id") String lookbookId) {
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
    @Operation(summary = "룩북 삭제하기", description = "<big>룩북 데이터를</big> 삭제합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "룩북 삭제를 성공하였습니다."),
    })
    @DeleteMapping("/{lookbook_id}")
    public ResponseEntity<?> deleteLookbook(@PathVariable("lookbook_id") String lookbookId) {
        boolean isDeleteSuccess = lookbookService.deleteLookbook(lookbookId);
        if (isDeleteSuccess) {
            return new ResponseEntity<String>("룩북 삭제를 성공하였습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("룩북 삭제를 실패하였습니다.", HttpStatus.CONFLICT);
        }
    }

    //룩북 좋아요
    @Operation(summary = "룩북 좋아요", description = "<big>룩북을</big>좋아요합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "룩북 좋아요를 성공했습니다."),
    })
    @PostMapping("/{lookbook_id}/like")
    public ResponseEntity<?> likeLookbook(@PathVariable("lookbook_id") String lookbookId, @ModelAttribute LookbookFavoriteDto lookbookFavoriteDto) {
        boolean isFavoriteSuccess = lookbookService.likeLookbook(lookbookFavoriteDto);
        if (isFavoriteSuccess) {
            return new ResponseEntity<String>("룩북 좋아요를 성공했습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("룩북 좋아요를 실패했습니다.", HttpStatus.CONFLICT);
        }
    }

    @Operation(summary = "룩북 좋아요 삭제", description = "<big>룩북을</big>좋아요를 삭제합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "룩북 좋아요 삭제를 성공했습니다."),
    })
    @PostMapping("/{lookbook_id}/dislike")
    public ResponseEntity<?> dislikeLookbook(@PathVariable("lookbook_id") String lookbookId, @ModelAttribute LookbookFavoriteDto lookbookFavoriteDto) {
        boolean isFavoriteSuccess = lookbookService.dislikeLookbook(lookbookFavoriteDto);
        if (isFavoriteSuccess) {
            return new ResponseEntity<String>("룩북 좋아요 삭제를 성공했습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("룩북 좋아요 삭제를 실패했습니다.", HttpStatus.CONFLICT);
        }
    }

    //룩북 좋아요 수 조회
    @Operation(summary = "룩북 좋아요 수 조회하기", description = "<big>룩북 좋아요 개수를</big>를 조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "룩북의 좋아요 개수"),
    })
    @GetMapping("/{lookbook_id}/like-count")
    public ResponseEntity<?> likeLookbookCount(@PathVariable("lookbook_id") String lookbookId) {
        int likeCnt = lookbookService.cntLikeLookbook(lookbookId);
        if (likeCnt == -1) {
            return new ResponseEntity<String>("좋아요 개수를 조회하지 못했습니다.", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<Integer>(likeCnt, HttpStatus.OK);
        }
    }

    //나의 공개된 룩북 보기
    @Operation(summary = "나의 공개된 룩북 조회", description = "<big>나의 공개된 룩북 데이터를</big>조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "나의 공개된 룩북을 리스트로 반환"),
    })
    @GetMapping("/public")
    public ResponseEntity<?> publicLookbook(@RequestParam String uid) {
        List<FindLookbookDto> publicLookbooks = lookbookService.findPublicLookbooks(uid);
        if (publicLookbooks == null) {
            log.error("{}의 공개된 룩북을 조회하지 못함", uid);
            return new ResponseEntity<String>("공개된 룩북을 조회하지 못했습니다.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<FindLookbookDto>>(publicLookbooks, HttpStatus.OK);
    }

    //나의 비공개된 룩북 보기
    @Operation(summary = "나의 비공개된 룩북조회하기", description = "<big>나의 비공개된 룩북 데이터를</big>조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "나의 비공개된 룩북 조회"),
    })
    @GetMapping("/private")
    public ResponseEntity<?> privateLookbook(@RequestParam String uid) {
        List<FindLookbookDto> privateLookbooks = lookbookService.findPrivateLookbooks(uid);
        if (privateLookbooks == null) {
            return new ResponseEntity<String>("비공개된 룩북을 조회하지 못했습니다.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<FindLookbookDto>>(privateLookbooks, HttpStatus.OK);
    }

    //팔로우 중인 사람의 룩북 조회
    @Operation(summary = "팔로워 룩북 조회하기", description = "<big>팔로잉하는 사람들의 룩북을</big>조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "팔로잉 룩북 리스트를 반환"),
    })
    @GetMapping("/followings")
    public ResponseEntity<?> followingLookbook(@RequestBody String uid) {
        return null;
    }

    //태그를 통해 룩북 검색 -> UserId 부분 태그들로 변경할것
    @Operation(summary = "태그로 이루어진 룩북 검색", description = "<big>태그로 이루어진 룩북을</big>조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "해당 태그의 룩북을 리스트로 반환"),
    })
    @GetMapping("/search")
    public ResponseEntity<?> searchLookbook(@RequestBody LookbookSearchDto lookbookSearchDto) {
        List<TagLookbookDto> findByTags = lookbookService.findByTag(lookbookSearchDto.getTags());
        if (findByTags == null) {
            return new ResponseEntity<String>("태그가 포함된 게시물을 찾지 못했습니다.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<TagLookbookDto>>(findByTags, HttpStatus.OK);
    }
}
