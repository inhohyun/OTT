package ssafy.c205.ott.domain.account.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.domain.account.dto.request.MemberUpdateRequestDto;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.entity.MemberRole;
import ssafy.c205.ott.domain.account.exception.MemberNicknameDuplicateException;
import ssafy.c205.ott.domain.account.repository.MemberRepository;

@SpringBootTest
@Transactional
class MemberValidatorTest {

    @PersistenceContext
    EntityManager em;

    @Autowired
    MemberWriteService memberWriteService;
    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 닉네임중복테스트() {
        Member member = Member.builder()
                .name("박지응")
                .email("123132423@naver.com")
                .sso("testtesdfsst")
                .role(MemberRole.USER)
                .build();
        em.persist(member);
        member.updateMember("JiEung2", null, null, null, 0L, 0L, null, null, null);

        em.flush();
        em.clear();

        Member member2 = Member.builder()
                .name("박지응")
                .email("123123@naver.com")
                .sso("testtest")
                .role(MemberRole.USER)
                .build();
        em.persist(member2);
        em.flush();
        em.clear();

        Member findMember = memberRepository.findById(2L).get();


        MemberUpdateRequestDto requestDto = MemberUpdateRequestDto.builder()
                .memberId(findMember.getId())
                .nickname("JiEung2")
                .phoneNumber(findMember.getPhoneNumber())
                .introduction(findMember.getIntroduction())
                .profileImageUrl(findMember.getProfileImageUrl())
                .height(findMember.getHeight())
                .weight(findMember.getWeight())
                .gender(findMember.getGender())
                .bodyType(findMember.getBodyType())
                .publicStatus(findMember.getPublicStatus())
                .build();

        Assertions.assertThatThrownBy(() -> memberWriteService.updateMember(requestDto))
                .isInstanceOf(MemberNicknameDuplicateException.class);
    }
}