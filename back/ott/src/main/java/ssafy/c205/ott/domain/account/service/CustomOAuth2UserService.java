package ssafy.c205.ott.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.common.oauth.dto.*;
import ssafy.c205.ott.domain.account.dto.request.MemberLoginUpdateRequestDto;
import ssafy.c205.ott.domain.account.dto.request.MemberRegisterRequestDto;
import ssafy.c205.ott.domain.account.dto.response.MemberRegisterDto;
import ssafy.c205.ott.domain.account.dto.response.RegisterMemberSuccessDto;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.entity.MemberRole;
import ssafy.c205.ott.domain.account.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final MemberWriteService memberWriteService;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("oAuth2User = " + oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;

        if (registrationId.equals("naver")) {

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());

        } else if (registrationId.equals("google")) {

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());

        } else if (registrationId.equals("kakao")) {

            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());

        } else {

            return null;
        }

        //리소스 서버에서 발급 받은 정보로 사용자를 특정할 아이디값을 만듦
        String sso = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
        Member existData = memberRepository.findBySso(sso);

        if (existData == null) {

            MemberRegisterRequestDto memberRegisterRequestDto = MemberRegisterRequestDto.builder()
                    .name(oAuth2Response.getName())
                    .sso(sso)
                    .email(oAuth2Response.getEmail())
                    .role(MemberRole.USER)
                    .build();

            RegisterMemberSuccessDto successDto = memberWriteService.registerMember(memberRegisterRequestDto);

            MemberRegisterDto memberRegisterDTO = MemberRegisterDto.builder()
                    .id(successDto.getMemberId())
                    .name(memberRegisterRequestDto.getName())
                    .sso(memberRegisterRequestDto.getSso())
                    .email(memberRegisterRequestDto.getEmail())
                    .role(memberRegisterRequestDto.getRole())
                    .build();


            return new CustomOAuth2User(memberRegisterDTO);
        } else {

            MemberLoginUpdateRequestDto memberLoginUpdateRequestDto = MemberLoginUpdateRequestDto.builder()
                    .memberId(existData.getId())
                    .email(oAuth2Response.getEmail())
                    .name(oAuth2Response.getName())
                    .build();

            memberWriteService.updateNameAndEmail(memberLoginUpdateRequestDto);

            MemberRegisterDto memberRegisterDTO = MemberRegisterDto.builder()
                    .name(existData.getName())
                    .sso(existData.getSso())
                    .email(existData.getEmail())
                    .role(existData.getRole())
                    .build();

            return new CustomOAuth2User(memberRegisterDTO);
        }

    }

}
