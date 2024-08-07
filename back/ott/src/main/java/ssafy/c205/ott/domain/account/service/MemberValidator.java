package ssafy.c205.ott.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.account.dto.request.FollowRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.response.ValidateNicknameSuccessDto;
import ssafy.c205.ott.domain.account.entity.Follow;
import ssafy.c205.ott.domain.account.entity.FollowStatus;
import ssafy.c205.ott.domain.account.exception.*;
import ssafy.c205.ott.domain.account.repository.FollowRepository;
import ssafy.c205.ott.domain.account.repository.MemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberValidator {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    public void validateSelfRequest(MemberRequestDto memberRequestDto) {
        if (!(memberRequestDto.getId().longValue() == memberRequestDto.getCurrentId().longValue())) {
            throw new NotSelfRequestException();
        }
    }

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

    public void validateUnfollow(FollowRequestDto followRequestDto) {
        long targetMemberId = followRequestDto.getTargetMemberId();
        long requestMemberId = followRequestDto.getRequestMemberId();
        validateSelfFollow(targetMemberId, requestMemberId);
        isAlreadyUnfollowing(targetMemberId, requestMemberId);
    }

    public void validateAcceptFollow(FollowRequestDto followRequestDto) {
        long targetMemberId = followRequestDto.getTargetMemberId();
        long requestMemberId = followRequestDto.getRequestMemberId();
        validateSelfFollow(targetMemberId, requestMemberId);
        isPresentFollowRequest(targetMemberId, requestMemberId);
        isAlreadyFollowing(targetMemberId, requestMemberId);
    }

    public void validateRejectFollow(FollowRequestDto followRequestDto) {
        long targetMemberId = followRequestDto.getTargetMemberId();
        long requestMemberId = followRequestDto.getRequestMemberId();
        validateSelfFollow(targetMemberId, requestMemberId);
        isPresentFollowRequest(targetMemberId, requestMemberId);
    }

    public boolean isCurrentUser(MemberRequestDto memberRequestDto) {
        return memberRequestDto.getId().longValue() == memberRequestDto.getCurrentId().longValue();
    }

    private void validateSelfFollow(long targetMemberId, long requestMemberId) {
        if (targetMemberId == requestMemberId)
            throw new SelfFollowException();
    }

    private void isAlreadyFollowing(long targetMemberId, long requestMemberId) {
        Optional<Follow> findFollow = followRepository.findByToMemberIdAndFromMemberId(targetMemberId, requestMemberId);
        if (findFollow.isPresent() && findFollow.get().getFollowStatus() == FollowStatus.FOLLOWING) {
            throw new AlreadyFollowException();
        }
    }

    private void isAlreadyUnfollowing(long targetMemberId, long requestMemberId) {
        if(followRepository.findByToMemberIdAndFromMemberId(targetMemberId, requestMemberId).isEmpty())
            throw new AlreadyFollowException();
    }

    private void isPresentFollowRequest(long targetMemberId, long requestMemberId) {
        if(!followRepository.existsByToMemberIdAndFromMemberId(targetMemberId, requestMemberId))
            throw new FollowRequestNotFoundException();
    }

}
