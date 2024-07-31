package ssafy.c205.ott.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.common.entity.MemberTag;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.response.MemberInfoDto;
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

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberReadService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    public MemberInfoDto memberSearch(MemberRequestDto memberRequestDto) {
        Member member = findActiveMemberById(memberRequestDto.getId());
        FollowStatus followStatus = determineFollowStatus(memberRequestDto, member);
        int followingCount = member.getFollowings().size();
        int followerCount = member.getFollowers().size();
        List<Tag> tags = getTags(member);

        return buildMemberInfoDto(member, followStatus, followingCount, followerCount, tags);
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
        return member.getId().equals(memberRequestDto.getCurrentId());
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

    private List<Tag> getTags(Member member) {
        return member.getMemberTags().stream()
                .map(MemberTag::getTag)
                .toList();
    }

    private MemberInfoDto buildMemberInfoDto(Member member, FollowStatus followStatus, int followingCount, int followerCount, List<Tag> tags) {
        return MemberInfoDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .phoneNumber(member.getPhoneNumber())
                .introduction(member.getIntroduction())
                .profileImageUrl(member.getProfileImageUrl())
                .height(member.getHeight())
                .weight(member.getWeight())
                .gender(member.getGender())
                .closets(member.getClosets())
                .tags(tags)
                .bodyType(member.getBodyType())
                .publicStatus(member.getPublicStatus())
                .followingCount(followingCount)
                .followerCount(followerCount)
                .followStatus(followStatus)
                .build();
    }
}
