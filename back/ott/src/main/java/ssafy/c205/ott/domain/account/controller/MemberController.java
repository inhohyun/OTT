package ssafy.c205.ott.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.common.ApiResponse;
import ssafy.c205.ott.common.security.CustomMemberDetails;
import ssafy.c205.ott.domain.account.dto.request.FollowRequestDto;
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
    public ApiResponse<MemberInfoDto> getMember(@PathVariable Long id) {
        return ApiResponse.success(memberReadService.memberSearch(MemberRequestDto.builder().id(id).build()));
    }

    @PutMapping("/{id}")
    public ApiResponse<UpdateMemberSuccessDto> updateMember(@PathVariable Long id, @RequestBody MemberUpdateRequestDto memberUpdateRequestDto) {
        return ApiResponse.success(memberWriteService.updateMember(memberUpdateRequestDto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<DeleteMemberSuccessDto> deleteMember(@PathVariable Long id) {
        return ApiResponse.success(memberWriteService.deleteMember(MemberRequestDto.builder().id(id).build()));
    }

    @GetMapping("/validate-nickname/{nickname}")
    public ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable String nickname) {
        return ApiResponse.success(memberValidator.validateMemberNickname(nickname));
    }

    @GetMapping("/more")
    public ApiResponse<List<MemberSearchResponseDto>> getMoreMembers(@RequestParam(name = "nickname", required = false) String nickname,
                                                                        @RequestParam(name = "offset", defaultValue = "0") int offset,
                                                                        @RequestParam(name = "limit", defaultValue = "10") int limit) {
        List<Member> members = memberRepository.findByNicknameContaining(nickname, offset, limit);
        return ApiResponse.success(members.stream()
                .map(MemberSearchResponseDto::new)
                .collect(Collectors.toList()));
    }

    @PostMapping("/follow/{targetId}")
    public ApiResponse<FollowResponseDto> followMember(@PathVariable Long targetId, @AuthenticationPrincipal CustomMemberDetails memberDetails) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(memberDetails.getMemberId())
                .targetMemberId(targetId)
                .build();
        return ApiResponse.success(memberWriteService.followMember(followRequestDto));
    }

    @PostMapping("/unfollow/{targetId}")
    public ApiResponse<FollowResponseDto> unfollowMember(@PathVariable Long targetId, @AuthenticationPrincipal CustomMemberDetails memberDetails) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(memberDetails.getMemberId())
                .targetMemberId(targetId)
                .build();
        return ApiResponse.success(memberWriteService.unfollowMember(followRequestDto));
    }

}