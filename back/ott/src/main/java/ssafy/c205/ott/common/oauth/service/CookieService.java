package ssafy.c205.ott.common.oauth.service;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {
    public ResponseCookie createCookie(String key, String value) {
        return ResponseCookie.from(key, value)
                .maxAge(60 * 60 * 60)
                .secure(true)
                .path("/")
                .httpOnly(false)
                .sameSite("None")  // SameSite=None 설정
                .build();
    }
}