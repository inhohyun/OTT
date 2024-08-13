package ssafy.c205.ott.domain.notification.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.c205.ott.common.ApiResponse;
import ssafy.c205.ott.common.oauth.dto.CustomOAuth2User;
import ssafy.c205.ott.domain.notification.dto.request.WebRtcNotificationDto;
import ssafy.c205.ott.domain.notification.dto.request.WebRtcRequestDto;
import ssafy.c205.ott.domain.notification.dto.response.DeleteNotificationSuccessDto;
import ssafy.c205.ott.domain.notification.dto.response.NotificationResponseDto;
import ssafy.c205.ott.domain.notification.dto.response.NotificationSuccessDto;
import ssafy.c205.ott.domain.notification.entity.NotificationType;
import ssafy.c205.ott.domain.notification.service.NotificationReadService;
import ssafy.c205.ott.domain.notification.service.NotificationWriteService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationWriteService notificationWriteService;
    private final NotificationReadService notificationReadService;

    @GetMapping("/{memberId}")
    public ApiResponse<List<NotificationResponseDto>> searchNotification(@PathVariable("memberId") Long memberId) {
        return ApiResponse.success(notificationReadService.searchNotification(memberId));
    }

    @DeleteMapping("/{notificationId}")
    public ApiResponse<DeleteNotificationSuccessDto> deleteNotification(@PathVariable("notificationId") Long notificationId) {
        return ApiResponse.success(notificationWriteService.deleteNotification(notificationId));
    }

    @PostMapping("/meeting")
    public ApiResponse<NotificationSuccessDto> createWebRtcNotification(@RequestBody WebRtcRequestDto webRtcRequestDto, @AuthenticationPrincipal CustomOAuth2User currentMember) {

        WebRtcNotificationDto webRtcNotificationDto = WebRtcNotificationDto.builder()
                .sessionId(webRtcRequestDto.getSessionId())
                .notificationType(NotificationType.RTC)
                .memberId(webRtcRequestDto.getTargetMemberId())
                .rtcRequestMemberSso(currentMember.getUsername())
                .build();

        return ApiResponse.success(notificationWriteService.createWebRtcNotification(webRtcNotificationDto));
    }

    @GetMapping("/{memberId}/send")
    public ApiResponse<NotificationResponseDto> sendNotification(@PathVariable Long memberId){
        return ApiResponse.success(notificationReadService.sendNotification(memberId));
    }
}
