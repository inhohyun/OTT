package ssafy.c205.ott.common.security;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import ssafy.c205.ott.common.oauth.CustomSuccessHandler;
import ssafy.c205.ott.common.oauth.jwt.CustomLogoutFilter;
import ssafy.c205.ott.common.oauth.jwt.JWTFilter;
import ssafy.c205.ott.common.oauth.jwt.JWTUtil;
import ssafy.c205.ott.common.oauth.repository.CustomClientRegistrationRepository;
import ssafy.c205.ott.common.oauth.repository.RefreshRepository;
import ssafy.c205.ott.domain.account.service.CustomOAuth2UserService;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomSuccessHandler customSuccessHandler;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;
    private final CustomClientRegistrationRepository customClientRegistrationRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

//                        configuration.setAllowedOrigins(Arrays.asList("https://i11c205.p.ssafy.io/", "http://localhost:3000/")); //프론트단 주소
                        configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
                        configuration.setAllowedMethods(Collections.singletonList("*")); //get,put,post 모든 요청에 대한 허가
                        configuration.setAllowCredentials(true); //credential 가져올 수 있도록 설정
                        configuration.setAllowedHeaders(Collections.singletonList("*")); //어떤 헤더를 가져올지 설정
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Arrays.asList("Set-Cookie","Authorization")); //쿠키를 반환할거라서 쿠키랑 authorization을 설정해라
//                        configuration.setExposedHeaders(Collections.singletonList());

                        return configuration;
                    }
                }));

        //csrf disable
        http
                .csrf((auth) -> auth.disable());

        //Form 로그인 방식 disable
        http
                .formLogin((auth) -> auth.disable());

        //HTTP Basic 인증 방식 disable
        http
                .httpBasic((auth) -> auth.disable());

        //JWTFilter 추가
        http
                .addFilterAfter(new JWTFilter(jwtUtil), OAuth2LoginAuthenticationFilter.class);

        log.debug("oauth 들어가기 전");
        http
                .oauth2Login((oauth2) -> oauth2
                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                .userService(customOAuth2UserService))
                        .clientRegistrationRepository(customClientRegistrationRepository.clientRegistrationRepository())
                        .successHandler(customSuccessHandler)
                        .redirectionEndpoint(redirection -> redirection.baseUri("/api/login/oauth2/code/*")));

        //oauth2
        log.debug("oauth 들어가기 후");
        //경로별 인가 작업
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/login","/", "/reissue", "/oauth2/authorization/**", "/**").permitAll()
                        .anyRequest().authenticated());

        http
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class);

        //세션 설정 : STATELESS
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));


        return http.build();
    }

}
