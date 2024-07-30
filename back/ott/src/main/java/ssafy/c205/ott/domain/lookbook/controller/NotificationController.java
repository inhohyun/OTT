package ssafy.c205.ott.domain.lookbook.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.c205.ott.domain.lookbook.service.NotificationService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping("/read/{notification_id}")
    public ResponseEntity<?> readNotification(
        @PathVariable("notification_id") String notificationId) {
        notificationService.readNotification(notificationId);
        return ResponseEntity.ok().body("알림 읽음처리를 완료했습니다.");
    }

    @DeleteMapping("/delete/{notification_id}")
    public ResponseEntity<?> deleteNotification(@PathVariable("notification_id") String notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok().body("아림 삭제처리를 완료했습니다.");
    }
}
