package ssafy.c205.ott.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.common.entity.MemberTag;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberTagRequestDto;
import ssafy.c205.ott.domain.account.dto.response.UpdateMemberSuccessDto;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.lookbook.service.TagService;
import ssafy.c205.ott.domain.recommend.repository.MemberTagRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberTagService {
    private final MemberRepository memberRepository;
    private final MemberTagRepository memberTagRepository;
    private final MemberValidator memberValidator;
    private final TagService tagService;

    @Transactional
    public UpdateMemberSuccessDto updateMemberTags(Long id, MemberTagRequestDto memberTagRequestDto) {
        memberValidator.validateSelfRequest(MemberRequestDto.builder()
                .id(memberTagRequestDto.getMemberId())
                .currentId(id)
                .build());

        Member member = memberRepository.findById(memberTagRequestDto.getMemberId())
                .orElseThrow(MemberNotFoundException::new);

        // 기존 태그 삭제
        memberTagRepository.deleteByMemberId(memberTagRequestDto.getMemberId());

        // 새로운 태그 추가
        List<MemberTag> memberTags = memberTagRequestDto.getTag().stream()
                .peek(tagService::addTag) // Lambda can be replaced with method reference
                .map(tagName -> new MemberTag(member, tagService.getTag(tagName)))
                .toList();
        memberTagRepository.saveAll(memberTags);

        return UpdateMemberSuccessDto.builder().memberId(member.getId()).build();
    }
}
