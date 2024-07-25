package ssafy.c205.ott.common.oauth.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import ssafy.c205.ott.common.oauth.config.SocialClientRegistration;

@Configuration
@RequiredArgsConstructor
public class CustomClientRegistrationRepository {

    private final SocialClientRegistration socialClientRegistration;

    public ClientRegistrationRepository clientRegistrationRepository() {

        return new InMemoryClientRegistrationRepository(socialClientRegistration.naverClientRegistration(),
                socialClientRegistration.googleClientRegistration(), socialClientRegistration.kakoClientRegistration());
    }
}
