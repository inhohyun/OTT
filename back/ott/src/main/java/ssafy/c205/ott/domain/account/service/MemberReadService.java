package ssafy.c205.ott.domain.account.service;

import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.common.oauth.dto.CustomOAuth2User;
import ssafy.c205.ott.domain.account.dto.request.FollowRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberSsoDto;
import ssafy.c205.ott.domain.account.dto.response.*;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Follow;
import ssafy.c205.ott.domain.account.entity.FollowStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.repository.FollowRepository;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.lookbook.entity.Tag;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberReadService {

    private final MemberValidator memberValidator;
    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    public MemberIdDto myIdSearch(CustomOAuth2User currentMember) {
        return MemberIdDto.builder().id(memberRepository.findBySso(currentMember.getUsername()).getId()).build();
    }

    public MemberNotificationDto myInfoSearch(MemberSsoDto memberSsoDto) {
        Member findMember = memberRepository.findBySso(memberSsoDto.getSso());
        return MemberNotificationDto.builder().memberId(findMember.getId()).memberName(findMember.getName()).build();
    }

    public MemberInfoDto memberSearch(MemberRequestDto memberRequestDto) {
        log.info("memberId" + memberRequestDto.getId());
        log.info("CurrentId" + memberRequestDto.getCurrentId());
        Member member = findActiveMemberById(memberRequestDto.getId());
        FollowStatus followStatus = determineFollowStatus(memberRequestDto, member);
        int followingCount = member.getFollowings().size();
        int followerCount = member.getFollowers().size();
        List<String> tags = getTags(member);

        if (memberValidator.isCurrentUser(memberRequestDto)) {
            return buildMyInfoDto(member, followStatus, followingCount, followerCount, tags);
        } else {
            return buildOtherInfoDto(member, followStatus, followingCount, followerCount, tags);
        }
    }

    public List<FollowsResponseDto> followingsSearch(FollowRequestDto followRequestDto) {
        List<Follow> followings = followRepository.findByFromMemberId(followRequestDto.getTargetMemberId());

        return followings.stream()
                .map(follow -> FollowsResponseDto.builder()
                        .memberId(follow.getToMember().getId())
                        .name(follow.getToMember().getName())
                        .nickname(follow.getToMember().getNickname())
                        .profileImageUrl(follow.getToMember().getProfileImageUrl())
                        .build())
                .collect(Collectors.toList());
    }

    public List<FollowsResponseDto> followersSearch(FollowRequestDto followRequestDto) {
        List<Follow> followings = followRepository.findByToMemberId(followRequestDto.getTargetMemberId());

        return followings.stream()
                .map(follow -> FollowsResponseDto.builder()
                        .memberId(follow.getFromMember().getId())
                        .name(follow.getFromMember().getName())
                        .nickname(follow.getFromMember().getNickname())
                        .profileImageUrl(follow.getFromMember().getProfileImageUrl())
                        .build())
                .collect(Collectors.toList());
    }

    public List<FollowsResponseDto> followRequestListSearch(MemberSsoDto memberSsoDto) {
        List<Follow> followingRequestList = followRepository.findByToMemberSsoAndFollowStatus(memberSsoDto.getSso(), FollowStatus.WAIT);

        return followingRequestList.stream()
                .map(follow -> FollowsResponseDto.builder()
                        .memberId(follow.getFromMember().getId())
                        .name(follow.getFromMember().getName())
                        .nickname(follow.getFromMember().getNickname())
                        .profileImageUrl(follow.getFromMember().getProfileImageUrl())
                        .build())
                .collect(Collectors.toList());
    }

    public List<MemberSearchResponseDto> findActiveMembersByNickname(String nickname, int offset, int limit) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        return memberRepository.findByNicknameContainingAndActiveStatus(nickname, ActiveStatus.ACTIVE, pageable)
                .stream()
                .map(MemberSearchResponseDto::new)
                .collect(Collectors.toList());
    }

    public Integer getFollowingsCount(MemberRequestDto requestDto) {
        return followRepository.countByFromMemberId(requestDto.getId());
    }

    private Member findActiveMemberById(Long memberId) {
        return memberRepository.findByIdAndActiveStatus(memberId, ActiveStatus.ACTIVE)
                .orElseThrow(MemberNotFoundException::new);
    }

    private FollowStatus determineFollowStatus(MemberRequestDto memberRequestDto, Member member) {
        if (isSelf(memberRequestDto, member)) {
            return FollowStatus.SELF;
        } else {
            return getFollowStatus(memberRequestDto, member);
        }
    }

    private boolean isSelf(MemberRequestDto memberRequestDto, Member member) {
        return member.getId().longValue() == memberRequestDto.getCurrentId().longValue();
    }

    private FollowStatus getFollowStatus(MemberRequestDto memberRequestDto, Member member) {
        Optional<Follow> findFollow = followRepository.findByToMemberIdAndFromMemberId(member.getId(), memberRequestDto.getId());
        if (findFollow.isEmpty()) {
            return FollowStatus.NOT_FOLLOWING;
        }
        Follow follow = findFollow.get();
        if (follow.getFollowStatus() == FollowStatus.WAIT) {
            return FollowStatus.WAIT;
        }

        return FollowStatus.FOLLOWING;
    }

    private List<String> getTags(Member member) {
        return member.getMemberTags().stream()
                .map(memberTag -> memberTag.getTag().getName())  // Tag의 name 필드만 추출
                .toList();
    }

    private MemberInfoDto buildMyInfoDto(Member member, FollowStatus followStatus, int followingCount, int followerCount, List<String> tags) {
        return MemberInfoDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .profileImageUrl(member.getProfileImageUrl())
                .height(member.getHeight())
                .weight(member.getWeight())
                .gender(member.getGender())
                .tags(tags)
                .bodyType(member.getBodyType())
                .publicStatus(member.getPublicStatus())
                .followingCount(followingCount)
                .followerCount(followerCount)
                .followStatus(followStatus)
                .build();
    }

    private MemberInfoDto buildOtherInfoDto(Member member, FollowStatus followStatus, int followingCount, int followerCount, List<String> tags) {
        return MemberInfoDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .profileImageUrl(member.getProfileImageUrl())
                .tags(tags)
                .publicStatus(member.getPublicStatus())
                .followingCount(followingCount)
                .followerCount(followerCount)
                .followStatus(followStatus)
                .build();
    }
}
