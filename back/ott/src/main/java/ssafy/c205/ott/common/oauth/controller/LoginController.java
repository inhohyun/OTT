package ssafy.c205.ott.common.oauth.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Slf4j
public class LoginController {

    @GetMapping("/login/naver")
    public String naverLogin() {
        log.info("naverLogin");
        return "redirect:/api/oauth2/authorization/naver";
    }

    @GetMapping("/login/kakao")
    public String kakaoLogin() {
        log.info("kakaoLogin");
        return "redirect:/api/oauth2/authorization/kakao";
    }

    @GetMapping("/login/google")
    public String googleLogin() {
        log.info("googleLogin");
        return "redirect:/api/oauth2/authorization/google";
    }
}
