package ssafy.c205.ott.domain.account.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ssafy.c205.ott.domain.account.dto.request.MemberRegisterRequestDto;
import ssafy.c205.ott.domain.account.dto.response.RegisterMemberSuccessDto;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.entity.MemberRole;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.closet.service.ClosetService;

@ExtendWith(MockitoExtension.class)
class MemberWriteServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private ClosetService closetService;

    @InjectMocks
    private MemberWriteService memberWriteService;

    MemberRegisterRequestDto memberRegisterRequestDto;

    @BeforeEach
    public void setUp(){
        memberRegisterRequestDto = MemberRegisterRequestDto.builder()
                .name("Test")
                .email("test@naver.com")
                .sso("testSso")
                .role(MemberRole.USER)
                .build();
    }

    @Test
    void 멤버등록테스트() {
        //given
        Member member = Member.builder()
                .name(memberRegisterRequestDto.getName())
                .email(memberRegisterRequestDto.getEmail())
                .sso(memberRegisterRequestDto.getSso())
                .role(memberRegisterRequestDto.getRole())
                .build();

        when(memberRepository.save(any(Member.class))).thenReturn(member);

        // when
        RegisterMemberSuccessDto result = memberWriteService.registerMember(memberRegisterRequestDto);

        // Then
        verify(memberRepository).save(any(Member.class));
        assertThat(member.getId()).isEqualTo(result.getMemberId());
    }


}