package ssafy.c205.ott.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberUpdateRequestDto;
import ssafy.c205.ott.domain.account.dto.response.DeleteMemberSuccessDto;
import ssafy.c205.ott.domain.account.dto.response.MemberInfoDto;
import ssafy.c205.ott.domain.account.dto.response.UpdateMemberSuccessDto;
import ssafy.c205.ott.domain.account.dto.response.ValidateNicknameSuccessDto;
import ssafy.c205.ott.domain.account.service.MemberReadService;
import ssafy.c205.ott.domain.account.service.MemberValidator;
import ssafy.c205.ott.domain.account.service.MemberWriteService;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class MemberController {

    private final MemberReadService memberReadService;
    private final MemberWriteService memberWriteService;
    private final MemberValidator memberValidator;

    @GetMapping("/{id}")
    public ResponseEntity<MemberInfoDto> getMember(@PathVariable Long id) {
        MemberInfoDto memberInfoDto = memberReadService.memberSearch(MemberRequestDto.builder().id(id).build());
        return ResponseEntity.ok(memberInfoDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateMemberSuccessDto> updateMember(@PathVariable Long id, @RequestBody MemberUpdateRequestDto memberUpdateRequestDto) {
        UpdateMemberSuccessDto updateMemberSuccessDto = memberWriteService.updateMember(memberUpdateRequestDto);
        return ResponseEntity.ok(updateMemberSuccessDto);
    }

}