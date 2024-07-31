package ssafy.c205.ott.domain.account.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "멤버 컨트롤러", description = "멤버 생성, 조회, 삭제 등 전반적인 멤버를 관리하는 클래스")
public class MemberController {

    private final MemberReadService memberReadService;
    private final MemberWriteService memberWriteService;
    private final MemberValidator memberValidator;
    private final MemberRepository memberRepository;

    @Operation(summary = "멤버 상세보기", description = "<big>유저 데이터를</big> 상세조회 합니다.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 정보"),
    })
    @GetMapping("/{id}")
    public ApiResponse<MemberInfoDto> getMember(@PathVariable("id") Long id) {
        MemberInfoDto memberInfoDto = memberReadService.memberSearch(MemberRequestDto.builder().id(id).build());
        return ApiResponse.success(memberInfoDto);
    }

    @Operation(summary = "유저정보 수정", description = "<big>유저 데이터를</big> 수정합니다.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 정보"),
    })
    @PutMapping("/{id}")
    public ApiResponse<UpdateMemberSuccessDto> updateMember(@PathVariable Long id, @RequestBody MemberUpdateRequestDto memberUpdateRequestDto) {
        UpdateMemberSuccessDto updateMemberSuccessDto = memberWriteService.updateMember(memberUpdateRequestDto);
        return ApiResponse.success(updateMemberSuccessDto);
    }

    @Operation(summary = "회원탈퇴", description = "<big>회원탈퇴</big> 합니다.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 정보"),
    })
    @DeleteMapping("/{id}")
    public ApiResponse<DeleteMemberSuccessDto> deleteMember(@PathVariable Long id) {
        DeleteMemberSuccessDto deleteMemberSuccessDto = memberWriteService.deleteMember(MemberRequestDto.builder().id(id).build());
        return ApiResponse.success(deleteMemberSuccessDto);
    }

    @Operation(summary = "닉네임 중복조회", description = "<big>닉네임을</big> 중복 조회합니다.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 정보"),
    })
    @GetMapping("/validate-nickname/{nickname}")
    public ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable String nickname) {
        ValidateNicknameSuccessDto nicknameSuccessDto = memberValidator.validateMemberNickname(nickname);
        return ApiResponse.success(nicknameSuccessDto);
    }

    @GetMapping("/more")
    public ApiResponse<List<MemberSearchResponseDto>> getMoreMembers(@RequestParam(name = "nickname", required = false) String nickname,
                                                                        @RequestParam(name = "offset", defaultValue = "0") int offset,
                                                                        @RequestParam(name = "limit", defaultValue = "10") int limit) {
        List<Member> members = memberRepository.findByNicknameContaining(nickname, offset, limit);
        List<MemberSearchResponseDto> memberSearchResponseDtos = members.stream()
                .map(MemberSearchResponseDto::new)
                .collect(Collectors.toList());
        return ApiResponse.success(memberSearchResponseDtos);
    }

    @PostMapping("/follow/{targetId}")
    public ApiResponse<FollowResponseDto> followMember(@PathVariable Long targetId, @AuthenticationPrincipal CustomMemberDetails memberDetails) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(memberDetails.getMemberId())
                .targetMemberId(targetId)
                .build();
        return ApiResponse.success(memberWriteService.followMember(followRequestDto));
    }

}