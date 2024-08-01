package ssafy.c205.ott.common.oauth.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api")
@Slf4j
public class LoginController {

    @GetMapping("/login/naver")
    public ResponseEntity<?> naverLogin() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/oauth2/authorization/naver"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping("/login/kakao")
    public ResponseEntity<?> kakaoLogin() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/oauth2/authorization/kakao"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping("/login/google")
    public ResponseEntity<?> googleLogin() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/oauth2/authorization/google"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }
}
