package ssafy.c205.ott.domain.closet.controller;

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
