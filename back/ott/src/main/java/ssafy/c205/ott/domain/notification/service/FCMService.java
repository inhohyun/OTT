package ssafy.c205.ott.domain.notification.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.notification.dto.requestdto.FCMPushNotificationDto;
import ssafy.c205.ott.domain.notification.dto.requestdto.FCMTokenDto;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FCMService {
 
    private final MemberRepository memberRepository;

    // FireBase 토큰 저장
    public ResponseEntity<?> saveToken(FCMTokenDto fcmTokenDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            Member member = memberRepository.findById(fcmTokenDto.getMemberId()).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
            member.updateFCMToken(fcmTokenDto.getToken());
            memberRepository.save(member);
            status = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    // 사용자에게 push 알림
    public ResponseEntity<?> pushNotification(FCMPushNotificationDto fcmPushNotificationDto){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            Member member = memberRepository.findById(fcmPushNotificationDto.getMemberId()).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
            if ("".equals(member.getFcmToken())) {
                resultMap.put("message", "유저의 FireBase 토큰이 없습니다.");
                status = HttpStatus.BAD_REQUEST;
            }
            else {
                String token = member.getFcmToken();
                Message message = Message.builder()
                        .setToken(token)
                        .setWebpushConfig(WebpushConfig.builder()
                                .putHeader("ttl", "300")
                                .setNotification(new WebpushNotification(fcmPushNotificationDto.getTitle(), fcmPushNotificationDto.getBody()))
                                .build())
                        .build();
                String response = FirebaseMessaging.getInstance().sendAsync(message).get();
                status = HttpStatus.OK;
                resultMap.put("response", response);
            }
        } catch (Exception e) {
            resultMap.put("message", "요청 실패");
            resultMap.put("exception", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }
}