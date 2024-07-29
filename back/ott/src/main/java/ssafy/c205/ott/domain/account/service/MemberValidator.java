package ssafy.c205.ott.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.account.dto.request.FollowRequestDto;
import ssafy.c205.ott.domain.account.dto.response.ValidateNicknameSuccessDto;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.MemberNicknameDuplicateException;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.exception.SelfFollowException;
import ssafy.c205.ott.domain.account.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class MemberValidator {

    private final MemberRepository memberRepository;

    public ValidateNicknameSuccessDto validateMemberNickname(final String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new MemberNicknameDuplicateException();
        }
        return new ValidateNicknameSuccessDto();
    }

    public void validateFollow(FollowRequestDto followRequestDto) {
        if (followRequestDto.getRequestMemberId().equals(followRequestDto.getTargetMemberId()))
            throw new SelfFollowException();
    }

}
