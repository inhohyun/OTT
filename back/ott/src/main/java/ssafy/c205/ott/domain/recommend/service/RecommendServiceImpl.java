package ssafy.c205.ott.domain.recommend.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendServiceImpl implements RecommendService{

    private final MemberRepository memberRepository;

    @Override
    public void recommendByHeightWeight() {
        List<Member> members = memberRepository.findByActiveStatus(ActiveStatus.ACTIVE);

    }
}
