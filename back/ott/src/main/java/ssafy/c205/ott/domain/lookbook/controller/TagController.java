package ssafy.c205.ott.domain.lookbook.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.c205.ott.domain.lookbook.service.TagService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/tag")
@Tag(name = "태그 컨트롤러", description = "태그 생성, 수정, 삭제 등 전반적인 태그를 관리하는 클래스")
public class TagController {

    private final TagService tagService;

    @Operation(summary = "태그 추가하기", description = "태그를 생성합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "태그 생성에 성공하였습니다.")
    })
    @PostMapping("/{name}")
    public ResponseEntity<?> addTag(@PathVariable("name") String name) {
        tagService.addTag(name);
        return ResponseEntity.ok().body("태그 생성에 성공하였습니다.");
    }

    @Operation(summary = "태그 조회하기", description = "태그를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "태그 정보")
    })
    @GetMapping("/{name}")
    public ResponseEntity<?> getTag(@PathVariable("name") String name) {
        return ResponseEntity.ok().body(tagService.getTag(name));
    }

    @Operation(summary = "태그 삭제하기", description = "태그를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "태그 삭제에 성공하였습니다.")
    })
    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteTag(@PathVariable("name") String name) {
        tagService.deleteTag(name);
        return ResponseEntity.ok().body("태그 삭제에 성공하였습니다.");
    }
}
