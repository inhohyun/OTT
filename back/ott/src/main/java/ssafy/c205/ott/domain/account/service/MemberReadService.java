package ssafy.c205.ott.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.response.MemberInfoDto;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberReadService {

    private final MemberRepository memberRepository;

    public MemberInfoDto memberSearch(MemberRequestDto memberRequestDto) {
        Member member = memberRepository.findByIdAndActiveStatus(memberRequestDto.getId(), ActiveStatus.ACTIVE).orElseThrow(MemberNotFoundException::new);

        int followingCount = member.getFollowings().size();
        int followerCount = member.getFollowers().size();

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
                .bodyType(member.getBodyType())
                .publicStatus(member.getPublicStatus())
                .followingCount(followingCount)
                .followerCount(followerCount)
                .build();
    }
}