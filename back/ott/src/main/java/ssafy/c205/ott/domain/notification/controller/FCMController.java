package ssafy.c205.ott.domain.notification.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.c205.ott.domain.notification.dto.requestdto.FCMPushNotificationDto;
import ssafy.c205.ott.domain.notification.dto.requestdto.FCMTokenDto;
import ssafy.c205.ott.domain.notification.service.FCMService;

@Slf4j
@RestController
@RequestMapping("/api/push")
@RequiredArgsConstructor
public class FCMController {

    private final FCMService fcmService;

    @PostMapping("/device")
    public ResponseEntity<?> updateDeviceToken(@RequestBody FCMTokenDto fcmTokenDto) {
        log.info("FCMTokenDto: {}", fcmTokenDto);
        return fcmService.saveToken(fcmTokenDto);
    }

    @PostMapping("/test")
    public ResponseEntity<?> sendPushNotification(@RequestBody FCMPushNotificationDto fcmPushNotificationDto) {
        return fcmService.pushNotification(fcmPushNotificationDto);
    }
}
