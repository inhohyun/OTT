package ssafy.c205.ott.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.account.dto.request.FollowRequestDto;
import ssafy.c205.ott.domain.account.dto.response.ValidateNicknameSuccessDto;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.AlreadyFollowException;
import ssafy.c205.ott.domain.account.exception.MemberNicknameDuplicateException;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.exception.SelfFollowException;
import ssafy.c205.ott.domain.account.repository.FollowRepository;
import ssafy.c205.ott.domain.account.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class MemberValidator {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    public ValidateNicknameSuccessDto validateMemberNickname(final String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new MemberNicknameDuplicateException();
        }
        return new ValidateNicknameSuccessDto();
    }

    public void validateFollow(FollowRequestDto followRequestDto) {
        long targetMemberId = followRequestDto.getTargetMemberId();
        long requestMemberId = followRequestDto.getRequestMemberId();
        validateSelfFollow(targetMemberId, requestMemberId);
        isAlreadyFollowing(targetMemberId, requestMemberId);
    }

    private void validateSelfFollow(long targetMemberId, long requestMemberId) {
        if (targetMemberId == requestMemberId)
            throw new SelfFollowException();
    }

    private void isAlreadyFollowing(long targetMemberId, long requestMemberId) {
        if(followRepository.findByToMemberIdAndFromMemberId(targetMemberId, requestMemberId).isPresent())
            throw new AlreadyFollowException();
    }

}
