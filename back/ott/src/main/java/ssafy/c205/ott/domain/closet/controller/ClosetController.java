package ssafy.c205.ott.domain.closet.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.common.ApiResponse;
import ssafy.c205.ott.domain.closet.dto.ClosetDto;
import ssafy.c205.ott.domain.closet.service.ClosetService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/closet")
public class ClosetController {
    private final ClosetService closetService;

    @Operation(summary = "옷장 목록", description = "<big>옷장 목록</big>을 조회 합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "옷장 정보"),
    })
    @GetMapping("/{memberId}")
    public ApiResponse<List<ClosetDto>> list(@PathVariable("memberId") long memberId) {
        log.info("memberId: {}", memberId);
        List<ClosetDto> closetDtoList = closetService.findByMemberId(memberId);
        log.info("closetDtoList: {}", closetDtoList);
        if (closetDtoList == null || closetDtoList.isEmpty()) {

        }
        return ApiResponse.success(closetDtoList);
    }



}
