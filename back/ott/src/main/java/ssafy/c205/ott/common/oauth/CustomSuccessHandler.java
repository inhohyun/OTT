package ssafy.c205.ott.common.oauth;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import ssafy.c205.ott.common.oauth.dto.CustomOAuth2User;
import ssafy.c205.ott.common.oauth.jwt.JWTUtil;
import ssafy.c205.ott.common.oauth.service.CookieService;
import ssafy.c205.ott.common.oauth.service.RefreshService;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import ssafy.c205.ott.domain.account.entity.MemberRole;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final RefreshService refreshService;
    private final CookieService cookieService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException{

        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        MemberRole role = MemberRole.valueOf(auth.getAuthority());

        //토큰 생성
        String accessToken = jwtUtil.createJwt("access", username, role, 600000L);
        String refreshToken = jwtUtil.createJwt("refresh", username, role, 86400000L);

        //Refresh 토큰 저장
        refreshService.addRefreshEntity(username, refreshToken, 86400000L);

        //응답 설정
        response.setHeader("access", accessToken);
        log.info("리프레시 토큰 생성");
        Cookie cookie = cookieService.createCookie("refresh", refreshToken);

        log.info("Access Token: {}", accessToken);
        log.info("Refresh Token: {}", refreshToken);
        log.info("Set-Cookie Header: {}", cookie.toString());

        response.addHeader("Set-Cookie", cookie.toString());
        response.setStatus(HttpStatus.OK.value());

        response.sendRedirect("https://i11c205.p.ssafy.io/oauth/callback");
    }

}
