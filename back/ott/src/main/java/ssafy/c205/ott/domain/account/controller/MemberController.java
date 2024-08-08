package ssafy.c205.ott.domain.account.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.common.ApiResponse;
import ssafy.c205.ott.common.oauth.dto.CustomOAuth2User;
import ssafy.c205.ott.domain.account.dto.request.FollowRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberSsoDto;
import ssafy.c205.ott.domain.account.dto.request.MemberUpdateRequestDto;
import ssafy.c205.ott.domain.account.dto.request.UploadProfileImageRequestDto;
import ssafy.c205.ott.domain.account.dto.response.*;
import ssafy.c205.ott.domain.account.service.MemberReadService;
import ssafy.c205.ott.domain.account.service.MemberValidator;
import ssafy.c205.ott.domain.account.service.MemberWriteService;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@Tag(name = "멤버 컨트롤러", description = "멤버 생성, 조회, 삭제 등 전반적인 멤버를 관리하는 클래스")
public class MemberController {
    //Todo: Authentication Id를 가져오는 작업 최적화 필요

    private final MemberReadService memberReadService;
    private final MemberWriteService memberWriteService;
    private final MemberValidator memberValidator;

    @Operation(summary = "자신의 id 가져오기", description = "<big>자신의 id를</big> 조회 합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 아이디"),
    })
    @GetMapping("/my")
    public ApiResponse<MemberIdDto> getMember(@AuthenticationPrincipal CustomOAuth2User currentMember) {
        return ApiResponse.success(MemberIdDto.builder().id(memberReadService.myIdSearch(currentMember).getId()).build());
    }

    @Operation(summary = "멤버 상세보기", description = "<big>유저 데이터를</big> 상세조회 합니다.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 정보"),
    })
    @GetMapping("/{memberId}")
    public ApiResponse<MemberInfoDto> getMember(@PathVariable Long memberId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        return ApiResponse.success(memberReadService.memberSearch(MemberRequestDto.builder()
                .id(memberId)
                .currentId(memberReadService.myIdSearch(currentMember).getId())
                .build()));
    }

    @Operation(summary = "유저정보 수정", description = "<big>유저 데이터를</big> 수정합니다.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 정보"),
    })
    @PutMapping("/{memberId}")
    public ApiResponse<UpdateMemberSuccessDto> updateMember(@PathVariable Long memberId, @RequestBody MemberUpdateRequestDto memberUpdateRequestDto) {
        return ApiResponse.success(memberWriteService.updateMember(memberId, memberUpdateRequestDto));
    }

    @Operation(summary = "회원탈퇴", description = "<big>회원탈퇴</big> 합니다.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 정보"),
    })
    @DeleteMapping("/{memberId}")
    public ApiResponse<DeleteMemberSuccessDto> deleteMember(@PathVariable Long memberId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        return ApiResponse.success(memberWriteService.deleteMember(MemberRequestDto.builder().id(memberId).currentId(memberReadService.myIdSearch(currentMember).getId()).build()));
    }

    @Operation(summary = "닉네임 중복조회", description = "<big>닉네임을</big> 중복 조회합니다.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 정보"),
    })
    @GetMapping("/validate-nickname/{nickname}")
    public ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable String nickname) {
        return ApiResponse.success(memberValidator.validateMemberNickname(nickname));
    }

    @Operation(summary = "닉네임으로 유저 검색", description = "<big>유저를</big> 닉네임과 페이지를 통해 조회합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 목록"),
    })
    @GetMapping("/more")
    public ApiResponse<List<MemberSearchResponseDto>> getMoreMembers(@RequestParam(name = "nickname", required = false) String nickname,
                                                                        @RequestParam(name = "offset", defaultValue = "0") int offset,
                                                                        @RequestParam(name = "limit", defaultValue = "10") int limit) {
        return ApiResponse.success(memberReadService.findActiveMembersByNickname(nickname, offset, limit));
    }

    @Operation(summary = "팔로우", description = "<big>유저를</big> 팔로우합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 팔로우"),
    })
    @PostMapping("/follow/{targetId}")
    public ApiResponse<FollowResponseDto> followMember(@PathVariable Long targetId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(memberReadService.myIdSearch(currentMember).getId())
                .targetMemberId(targetId)
                .build();
        return ApiResponse.success(memberWriteService.followMember(followRequestDto));
    }

    @Operation(summary = "언팔로우", description = "<big>유저를</big> 언팔로우합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 언팔로우"),
    })
    @PostMapping("/unfollow/{targetId}")
    public ApiResponse<FollowResponseDto> unfollowMember(@PathVariable Long targetId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(memberReadService.myIdSearch(currentMember).getId())
                .targetMemberId(targetId)
                .build();
        return ApiResponse.success(memberWriteService.unfollowMember(followRequestDto));
    }

    @Operation(summary = "팔로우 수락", description = "<big>유저의 팔로우를</big> 수락합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 팔로우 수락"),
    })
    @PostMapping("/follow/{requestId}/accept")
    public ApiResponse<FollowResponseDto> acceptFollow(@PathVariable Long requestId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(requestId)
                .targetMemberId(memberReadService.myIdSearch(currentMember).getId())
                .build();
        return ApiResponse.success(memberWriteService.acceptFollow(followRequestDto));
    }

    @Operation(summary = "팔로우 거절", description = "<big>유저의 팔로우를</big> 거절합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 팔로우 거절"),
    })
    @PostMapping("/follow/{requestId}/reject")
    public ApiResponse<FollowResponseDto> rejectFollow(@PathVariable Long requestId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(requestId)
                .targetMemberId(memberReadService.myIdSearch(currentMember).getId())
                .build();
        return ApiResponse.success(memberWriteService.rejectFollow(followRequestDto));
    }

    @Operation(summary = "프로필 이미지 업로드", description = "<big>프로필 이미지를</big> 업로드합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 프로필"),
    })
    @PostMapping("/profile-image/upload")
    public ApiResponse<ProfileImageSuccessDto> uploadProfile(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        UploadProfileImageRequestDto uploadProfileImageRequestDto = UploadProfileImageRequestDto.builder()
                .file(file)
                .memberId(memberReadService.myIdSearch(currentMember).getId())
                .build();
        return ApiResponse.success(memberWriteService.uploadProfileImage(uploadProfileImageRequestDto));
    }

    @Operation(summary = "팔로잉 목록", description = "<big>유저의 팔로잉 목록을</big> 조회합니다..")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 팔로잉 목록"),
    })
    @GetMapping("/follow/{memberId}/followings")
    public ApiResponse<List<FollowsResponseDto>> getFollowings(@PathVariable Long memberId) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .targetMemberId(memberId)
                .build();
        return ApiResponse.success(memberReadService.followingsSearch(followRequestDto));
    }

    @Operation(summary = "팔로워 목록", description = "<big>유저의 팔로워 목록을</big> 조회합니다..")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 팔로워 목록"),
    })
    @GetMapping("/follow/{memberId}/followers")
    public ApiResponse<List<FollowsResponseDto>> getFollowers(@PathVariable Long memberId) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .targetMemberId(memberId)
                .build();
        return ApiResponse.success(memberReadService.followersSearch(followRequestDto));
    }

    @Operation(summary = "팔로우 요청 목록", description = "<big>자신의 팔로우 요청 목록을</big> 조회합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "유저 팔로우 요청 목록"),
    })
    @GetMapping("/follow/request-list")
    public ApiResponse<List<FollowsResponseDto>> getFollowRequestList(@AuthenticationPrincipal CustomOAuth2User currentMember) {
        return ApiResponse.success(memberReadService.followRequestListSearch(MemberSsoDto.builder().sso(
                currentMember.getUsername()).build()));
    }
}