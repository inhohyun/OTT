package ssafy.c205.ott.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberUpdateRequestDto;
import ssafy.c205.ott.domain.account.dto.response.*;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.account.service.MemberReadService;
import ssafy.c205.ott.domain.account.service.MemberValidator;
import ssafy.c205.ott.domain.account.service.MemberWriteService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberReadService memberReadService;
    private final MemberWriteService memberWriteService;
    private final MemberValidator memberValidator;
    private final MemberRepository memberRepository;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteMemberSuccessDto> deleteMember(@PathVariable Long id) {
        DeleteMemberSuccessDto deleteMemberSuccessDto = memberWriteService.deleteMember(MemberRequestDto.builder().id(id).build());
        return ResponseEntity.ok(deleteMemberSuccessDto);
    }

    @GetMapping("/validate-nickname/{nickname}")
    public ResponseEntity<ValidateNicknameSuccessDto> validateNickname(@PathVariable String nickname) {
        ValidateNicknameSuccessDto nicknameSuccessDto = memberValidator.validateMemberNickname(nickname);
        return ResponseEntity.ok(nicknameSuccessDto);
    }

    @GetMapping("/more")
    public ResponseEntity<List<MemberSearchResponseDto>> getMoreMembers(@RequestParam(name = "nickname", required = false) String nickname,
                                                                        @RequestParam(name = "offset", defaultValue = "0") int offset,
                                                                        @RequestParam(name = "limit", defaultValue = "10") int limit) {
        List<Member> members = memberRepository.findByNicknameContaining(nickname, offset, limit);
        List<MemberSearchResponseDto> memberSearchResponseDtos = members.stream()
                .map(MemberSearchResponseDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(memberSearchResponseDtos);
    }

}