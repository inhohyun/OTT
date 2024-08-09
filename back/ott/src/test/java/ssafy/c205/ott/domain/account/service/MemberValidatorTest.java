package ssafy.c205.ott.domain.account.service;//package ssafy.c205.ott.domain.account.service;
//
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//import ssafy.c205.ott.domain.account.entity.Member;
//import ssafy.c205.ott.domain.account.entity.MemberRole;
//import ssafy.c205.ott.domain.account.exception.MemberNicknameDuplicateException;
//
//@SpringBootTest
//@Transactional
//class MemberValidatorTest {
//
//    @PersistenceContext
//    EntityManager em;
//
//    @Autowired
//    MemberValidator memberValidator;
//
//    @Test
//    void 닉네임중복테스트() {
//        Member member = Member.builder()
//                .name("박지응")
//                .email("123132423@naver.com")
//                .sso("testtesdfsst")
//                .role(MemberRole.USER)
//                .build();
//        em.persist(member);
//        member.updateMember("JiEung2", null, null, null, 0L, 0L, null, null, null, null);
//
//        em.flush();
//        em.clear();
//
//        Assertions.assertThatThrownBy(() -> memberValidator.validateMemberNickname("JiEung2"))
//                .isInstanceOf(MemberNicknameDuplicateException.class);
//    }
//}