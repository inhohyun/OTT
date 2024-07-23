package ssafy.c205.ott.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.common.entity.MemberTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.dto.request.MemberLoginUpdateRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberRegisterRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberUpdateRequestDto;
import ssafy.c205.ott.domain.account.dto.response.RegisterMemberSuccessDto;
import ssafy.c205.ott.domain.account.dto.response.UpdateMemberSuccessDto;
import ssafy.c205.ott.domain.account.entity.BodyType;
import ssafy.c205.ott.domain.account.entity.Gender;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.repository.MemberRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberWriteService {
    //Todo: 이미지 업로드 및 url 가져오기 구현
    private final MemberRepository memberRepository;

    public RegisterMemberSuccessDto registerMember(MemberRegisterRequestDto memberRegisterRequestDto) {
        Member member = Member.builder()
                .name(memberRegisterRequestDto.getName())
                .email(memberRegisterRequestDto.getEmail())
                .sso(memberRegisterRequestDto.getSso())
                .role(memberRegisterRequestDto.getRole())
                .build();

        memberRepository.save(member);
        return new RegisterMemberSuccessDto(member.getId());
    }


    public UpdateMemberSuccessDto updateMember(MemberUpdateRequestDto memberUpdateRequestDto) {

        Member member = memberRepository.findById(memberUpdateRequestDto.getMemberId()).orElseThrow(MemberNotFoundException::new);
        member.updateMember(memberUpdateRequestDto.getPhoneNumber(), memberUpdateRequestDto.getIntroduction(), memberUpdateRequestDto.getProfileImageUrl(), memberUpdateRequestDto.getHeight()
                , memberUpdateRequestDto.getWeight(), memberUpdateRequestDto.getGender(), memberUpdateRequestDto.getBodyType(), memberUpdateRequestDto.getPublicStatus());
        return new UpdateMemberSuccessDto(member.getId());
    }

    public UpdateMemberSuccessDto updateNameAndEmail(MemberLoginUpdateRequestDto memberLoginUpdateRequestDto) {

        Member member = memberRepository.findById(memberLoginUpdateRequestDto.getMemberId()).orElseThrow(MemberNotFoundException::new);
        member.updateNameAndEmail(memberLoginUpdateRequestDto.getEmail(), memberLoginUpdateRequestDto.getName());
        return new UpdateMemberSuccessDto(member.getId());
    }
}
