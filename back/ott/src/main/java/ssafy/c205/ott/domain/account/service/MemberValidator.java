package ssafy.c205.ott.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.account.exception.MemberNicknameDuplicateException;
import ssafy.c205.ott.domain.account.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class MemberValidator {

    private final MemberRepository memberRepository;

    public void validateMemberNickname(final String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new MemberNicknameDuplicateException();
        }
    }
}
