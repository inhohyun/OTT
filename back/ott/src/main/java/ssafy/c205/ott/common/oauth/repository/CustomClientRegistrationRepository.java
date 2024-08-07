package ssafy.c205.ott.common.oauth.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import ssafy.c205.ott.common.oauth.config.SocialClientRegistration;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class CustomClientRegistrationRepository {

    private final SocialClientRegistration socialClientRegistration;

    public ClientRegistrationRepository clientRegistrationRepository() {
        log.info("Creating ClientRegistrationRepository");
        return new InMemoryClientRegistrationRepository(socialClientRegistration.naverClientRegistration(),
                socialClientRegistration.googleClientRegistration(), socialClientRegistration.kakoClientRegistration());
    }
}
