package ssafy.c205.ott.domain.account.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.common.util.AmazonS3Util;
import ssafy.c205.ott.domain.account.dto.request.*;
import ssafy.c205.ott.domain.account.dto.response.*;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Follow;
import ssafy.c205.ott.domain.account.entity.FollowStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.repository.FollowRepository;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import static ssafy.c205.ott.domain.account.util.FollowMessage.*;

import ssafy.c205.ott.domain.category.dto.CategoryRequestDto;
import ssafy.c205.ott.domain.category.service.CategoryService;
import ssafy.c205.ott.domain.closet.entity.Closet;
import ssafy.c205.ott.domain.closet.service.ClosetService;
import ssafy.c205.ott.domain.notification.dto.request.FollowNotificationDto;
import ssafy.c205.ott.domain.notification.entity.NotificationType;
import ssafy.c205.ott.domain.notification.service.NotificationWriteService;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberWriteService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final MemberValidator memberValidator;
    private final ClosetService closetService;
    private final CategoryService categoryService;
    private final NotificationWriteService notificationWriteService;
    private final AmazonS3Util amazonS3Util;

    public RegisterMemberSuccessDto registerMember(MemberRegisterRequestDto memberRegisterRequestDto) {
        Member member = Member.builder()
                .name(memberRegisterRequestDto.getName())
                .email(memberRegisterRequestDto.getEmail())
                .sso(memberRegisterRequestDto.getSso())
                .role(memberRegisterRequestDto.getRole())
                .build();

        initializeMemberClosetWithDefaultCategories(memberRepository.save(member));
        return new RegisterMemberSuccessDto(member.getId());
    }

    public UpdateMemberSuccessDto updateMember(Long id, MemberUpdateRequestDto memberUpdateRequestDto) {
        memberValidator.validateSelfRequest(MemberRequestDto.builder().id(memberUpdateRequestDto.getMemberId()).currentId(id).build());
        Member member = findMemberById(memberUpdateRequestDto.getMemberId());
        member.updateMember(memberUpdateRequestDto.getNickname(), memberUpdateRequestDto.getPhoneNumber(), memberUpdateRequestDto.getIntroduction(), memberUpdateRequestDto.getHeight()
                , memberUpdateRequestDto.getWeight(), memberUpdateRequestDto.getGender(), memberUpdateRequestDto.getBodyType(), memberUpdateRequestDto.getPublicStatus());
        return new UpdateMemberSuccessDto(member.getId());
    }

    public UpdateMemberSuccessDto updateNameAndEmail(MemberLoginUpdateRequestDto memberLoginUpdateRequestDto) {
        Member member = findMemberById(memberLoginUpdateRequestDto.getMemberId());
        member.updateNameAndEmail(memberLoginUpdateRequestDto.getEmail(), memberLoginUpdateRequestDto.getName());
        return new UpdateMemberSuccessDto(member.getId());
    }

    public DeleteMemberSuccessDto deleteMember(MemberRequestDto memberRequestDto) {
        memberValidator.validateSelfRequest(memberRequestDto);
        Member member = findMemberById(memberRequestDto.getId());
        member.deleteMember();
        return new DeleteMemberSuccessDto();
    }

    public FollowResponseDto followMember(FollowRequestDto followRequestDto) {
        Member targetMember = findMemberById(followRequestDto.getTargetMemberId());
        Member requestMember = findMemberById(followRequestDto.getRequestMemberId());
        memberValidator.validateFollow(followRequestDto);

        if (targetMember.getPublicStatus() == PublicStatus.PRIVATE) {
            return handlePrivateFollow(targetMember, requestMember);
        }
        return handlePublicFollow(targetMember, requestMember);
    }

    public FollowResponseDto unfollowMember(FollowRequestDto followRequestDto) {
        Member targetMember = findMemberById(followRequestDto.getTargetMemberId());
        Member requestMember = findMemberById(followRequestDto.getRequestMemberId());
        memberValidator.validateUnfollow(followRequestDto);
        followRepository.deleteByToMemberAndFromMember(targetMember, requestMember);

        return createFollowResponseDto(null, targetMember.getFollowers().size(), UNFOLLOW_SUCCESS_MESSAGE.getMessage());
    }

    private FollowResponseDto handlePublicFollow(Member targetMember, Member requestMember) {
        Follow follow = followRepository.save(createFollow(targetMember, requestMember, FollowStatus.FOLLOWING));
        createNotification(targetMember, requestMember, follow);
        return createFollowResponseDto(createFollow(targetMember, requestMember, FollowStatus.FOLLOWING).getFollowStatus(), targetMember.getFollowers().size(), FOLLOW_SUCCESS_MESSAGE.getMessage());
    }

    private FollowResponseDto handlePrivateFollow(Member targetMember, Member requestMember) {
        Follow follow = followRepository.save(createFollow(targetMember, requestMember, FollowStatus.WAIT));
        createNotification(targetMember, requestMember, follow);
        return createFollowResponseDto(createFollow(targetMember, requestMember, FollowStatus.WAIT).getFollowStatus(), 0, FOLLOW_REQUEST_MESSAGE.getMessage());
    }

    private void createNotification(Member targetMember, Member requestMember, Follow follow){
        notificationWriteService.createFollowNotification(FollowNotificationDto.builder()
                .notificationType(NotificationType.FOLLOW)
                .memberId(targetMember.getId())
                .followerId(requestMember.getId())
                .followId(follow.getId())
                .followerName(requestMember.getName())
                .followStatus(follow.getFollowStatus())
                .build());
    }

    private FollowResponseDto createFollowResponseDto(FollowStatus followStatus, int followerCount, String message) {
        return FollowResponseDto.builder()
                .followStatus(followStatus)
                .followerCount(followerCount)
                .message(message)
                .build();
    }

    private Follow createFollow(Member toMember, Member fromMember, FollowStatus followStatus) {
        return Follow.builder()
                .toMember(toMember)
                .fromMember(fromMember)
                .followStatus(followStatus)
                .build();
    }

    private Member findMemberById(Long id) {
        return memberRepository.findByIdAndActiveStatus(id, ActiveStatus.ACTIVE).orElseThrow(MemberNotFoundException::new);
    }

    public FollowResponseDto acceptFollow(FollowRequestDto followRequestDto) {
        Member targetMember = findMemberById(followRequestDto.getTargetMemberId());
        Member requestMember = findMemberById(followRequestDto.getRequestMemberId());
        memberValidator.validateAcceptFollow(followRequestDto);

        Follow follow = followRepository.findByToMemberAndFromMember(targetMember, requestMember).get();
        follow.updateFollowStatus();

        return createFollowResponseDto(follow.getFollowStatus(), targetMember.getFollowers().size(), FOLLOW_ACCEPT_MESSAGE.getMessage());
    }

    public FollowResponseDto rejectFollow(FollowRequestDto followRequestDto) {
        Member targetMember = findMemberById(followRequestDto.getTargetMemberId());
        Member requestMember = findMemberById(followRequestDto.getRequestMemberId());
        memberValidator.validateRejectFollow(followRequestDto);

        followRepository.deleteByToMemberAndFromMember(targetMember, requestMember);

        return createFollowResponseDto(null, 0, FOLLOW_REJECT_MESSAGE.getMessage());
    }

    public ProfileImageSuccessDto uploadProfileImage(UploadProfileImageRequestDto uploadProfileImageRequestDto) {
        String profileImageUrl = amazonS3Util.saveFile(uploadProfileImageRequestDto.getFile());
        Member member = findMemberById(uploadProfileImageRequestDto.getMemberId());
        member.updateProfileImage(profileImageUrl);

        return new ProfileImageSuccessDto();
    }

    private void initializeMemberClosetWithDefaultCategories(Member member) {
        Closet closet = closetService.createClosetForMember(member);

        // 기본 카테고리 등록
        List<String> defaultCategories = List.of("상의", "하의");

        defaultCategories.stream()
                .map(categoryName -> CategoryRequestDto.builder()
                        .closetId(closet.getId())
                        .name(categoryName)
                        .build())
                .forEach(categoryService::registerCategory);
    }

}
