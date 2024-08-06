package ssafy.c205.ott.domain.account.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.common.ApiResponse;
import ssafy.c205.ott.common.oauth.dto.CustomOAuth2User;
import ssafy.c205.ott.domain.account.dto.request.FollowRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberUpdateRequestDto;
import ssafy.c205.ott.domain.account.dto.request.UploadProfileImageRequestDto;
import ssafy.c205.ott.domain.account.dto.response.*;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.account.service.MemberReadService;
import ssafy.c205.ott.domain.account.service.MemberValidator;
import ssafy.c205.ott.domain.account.service.MemberWriteService;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberReadService memberReadService;
    private final MemberWriteService memberWriteService;
    private final MemberValidator memberValidator;

    @GetMapping("/my")
    public ApiResponse<MemberIdDto> getMember(@AuthenticationPrincipal CustomOAuth2User currentMember) {
        return ApiResponse.success(MemberIdDto.builder().id(memberReadService.myIdSearch(currentMember).getId()).build());
    }

    @GetMapping("/{id}")
    public ApiResponse<MemberInfoDto> getMember(@PathVariable Long id, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        return ApiResponse.success(memberReadService.memberSearch(MemberRequestDto.builder()
                .id(id)
                .currentId(memberReadService.myIdSearch(currentMember).getId())
                .build()));
    }

    @PutMapping("/{id}")
    public ApiResponse<UpdateMemberSuccessDto> updateMember(@PathVariable Long id, @RequestBody MemberUpdateRequestDto memberUpdateRequestDto) {
        return ApiResponse.success(memberWriteService.updateMember(memberUpdateRequestDto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<DeleteMemberSuccessDto> deleteMember(@PathVariable Long id, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        return ApiResponse.success(memberWriteService.deleteMember(MemberRequestDto.builder().id(id).currentId(memberReadService.myIdSearch(currentMember).getId()).build()));
    }

    @GetMapping("/validate-nickname/{nickname}")
    public ApiResponse<ValidateNicknameSuccessDto> validateNickname(@PathVariable String nickname) {
        return ApiResponse.success(memberValidator.validateMemberNickname(nickname));
    }

    @GetMapping("/more")
    public ApiResponse<List<MemberSearchResponseDto>> getMoreMembers(@RequestParam(name = "nickname", required = false) String nickname,
                                                                        @RequestParam(name = "offset", defaultValue = "0") int offset,
                                                                        @RequestParam(name = "limit", defaultValue = "10") int limit) {
        return ApiResponse.success(memberReadService.findActiveMembersByNickname(nickname, offset, limit));
    }

    @PostMapping("/follow/{targetId}")
    public ApiResponse<FollowResponseDto> followMember(@PathVariable Long targetId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(currentMember.getId())
                .targetMemberId(targetId)
                .build();
        return ApiResponse.success(memberWriteService.followMember(followRequestDto));
    }

    @PostMapping("/unfollow/{targetId}")
    public ApiResponse<FollowResponseDto> unfollowMember(@PathVariable Long targetId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(currentMember.getId())
                .targetMemberId(targetId)
                .build();
        return ApiResponse.success(memberWriteService.unfollowMember(followRequestDto));
    }

    @PostMapping("/follow/{requestId}/accept")
    public ApiResponse<FollowResponseDto> acceptFollow(@PathVariable Long requestId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(requestId)
                .targetMemberId(currentMember.getId())
                .build();
        return ApiResponse.success(memberWriteService.acceptFollow(followRequestDto));
    }

    @PostMapping("/follow/{requestId}/reject")
    public ApiResponse<FollowResponseDto> rejectFollow(@PathVariable Long requestId, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .requestMemberId(requestId)
                .targetMemberId(currentMember.getId())
                .build();
        return ApiResponse.success(memberWriteService.rejectFollow(followRequestDto));
    }

    @PostMapping("/profile-image/upload")
    public ApiResponse<ProfileImageSuccessDto> uploadProfile(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal CustomOAuth2User currentMember) {
        UploadProfileImageRequestDto uploadProfileImageRequestDto = UploadProfileImageRequestDto.builder()
                .file(file)
                .memberId(currentMember.getId())
                .build();
        return ApiResponse.success(memberWriteService.uploadProfileImage(uploadProfileImageRequestDto));
    }

    @GetMapping("/follow/{memberId}/followings")
    public ApiResponse<List<FollowsResponseDto>> getFollowings(@PathVariable Long memberId) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .targetMemberId(memberId)
                .build();
        return ApiResponse.success(memberReadService.followingsSearch(followRequestDto));
    }

    @GetMapping("/follow/{memberId}/followers")
    public ApiResponse<List<FollowsResponseDto>> getFollowers(@PathVariable Long memberId) {
        FollowRequestDto followRequestDto = FollowRequestDto.builder()
                .targetMemberId(memberId)
                .build();
        return ApiResponse.success(memberReadService.followersSearch(followRequestDto));
    }
}