package ssafy.c205.ott.domain.account.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.dto.request.MemberRegisterRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberUpdateRequestDto;
import ssafy.c205.ott.domain.account.dto.response.RegisterMemberSuccessDto;
import ssafy.c205.ott.domain.account.dto.response.UpdateMemberSuccessDto;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.BodyType;
import ssafy.c205.ott.domain.account.entity.Gender;
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

    @Mock
    private MemberValidator memberValidator;

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

    @Test
    void 멤버수정테스트() {
        //given
        Member member = Member.builder()
                .name(memberRegisterRequestDto.getName())
                .email(memberRegisterRequestDto.getEmail())
                .sso(memberRegisterRequestDto.getSso())
                .role(memberRegisterRequestDto.getRole())
                .build();

        when(memberRepository.save(any(Member.class))).thenAnswer(invocation -> {
            Member savedMember = invocation.getArgument(0);
            ReflectionTestUtils.setField(savedMember, "id", 1L);
            return savedMember;
        });

        when(memberRepository.findByIdAndActiveStatus(1L, ActiveStatus.ACTIVE)).thenReturn(Optional.of(member));
        when(memberRepository.findById(1L)).thenReturn(Optional.of(member));

        memberRepository.save(member);
        ReflectionTestUtils.setField(member, "id", 1L);

        MemberUpdateRequestDto memberUpdateRequestDto = MemberUpdateRequestDto.builder()
                .memberId(1L)
                .nickname("NewNickname")
                .phoneNumber("123-456-7890")
                .introduction("New Introduction")
                .profileImageUrl("http://newprofileimage.com")
                .height(180)
                .weight(75)
                .gender(Gender.MAN)
                .bodyType(BodyType.MUSCULAR)
                .publicStatus(PublicStatus.PUBLIC)
                .memberTags(null)
                .build();

        // when
        UpdateMemberSuccessDto result = memberWriteService.updateMember(memberUpdateRequestDto);

        // then
        Member updatedMember = memberRepository.findById(result.getMemberId()).orElseThrow();
        assertThat(updatedMember.getNickname()).isEqualTo(memberUpdateRequestDto.getNickname());
        assertThat(updatedMember.getPhoneNumber()).isEqualTo(memberUpdateRequestDto.getPhoneNumber());
        assertThat(updatedMember.getIntroduction()).isEqualTo(memberUpdateRequestDto.getIntroduction());
        assertThat(updatedMember.getProfileImageUrl()).isEqualTo(memberUpdateRequestDto.getProfileImageUrl());
        assertThat(updatedMember.getHeight()).isEqualTo(memberUpdateRequestDto.getHeight());
        assertThat(updatedMember.getWeight()).isEqualTo(memberUpdateRequestDto.getWeight());
        assertThat(updatedMember.getGender()).isEqualTo(memberUpdateRequestDto.getGender());
        assertThat(updatedMember.getBodyType()).isEqualTo(memberUpdateRequestDto.getBodyType());
        assertThat(updatedMember.getPublicStatus()).isEqualTo(memberUpdateRequestDto.getPublicStatus());
        assertThat(updatedMember.getMemberTags()).isEqualTo(memberUpdateRequestDto.getMemberTags());
    }

    @Test
    void 멤버삭제테스트(){
        //given
        Member member = Member.builder()
                .name(memberRegisterRequestDto.getName())
                .email(memberRegisterRequestDto.getEmail())
                .sso(memberRegisterRequestDto.getSso())
                .role(memberRegisterRequestDto.getRole())
                .build();

        when(memberRepository.save(any(Member.class))).thenAnswer(invocation -> {
            Member savedMember = invocation.getArgument(0);
            ReflectionTestUtils.setField(savedMember, "id", 1L);
            return savedMember;
        });

        when(memberRepository.findByIdAndActiveStatus(1L, ActiveStatus.ACTIVE)).thenReturn(Optional.of(member));
        when(memberRepository.findById(1L)).thenReturn(Optional.of(member));

        memberRepository.save(member);
        ReflectionTestUtils.setField(member, "id", 1L);

        MemberRequestDto memberRequestDto = MemberRequestDto.builder()
                .id(1L)
                .currentId(1L)
                .build();

        // when
        memberWriteService.deleteMember(memberRequestDto);
        Member findMember = memberRepository.findById(member.getId()).get();
        // then
        assertThat(findMember.getActiveStatus()).isEqualTo(ActiveStatus.INACTIVE);
    }

}