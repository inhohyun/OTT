package ssafy.c205.ott.domain.notification.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class WebRtcNotification extends Notification {
    private Long rtcRequestMemberId;
    private String sessionId;
    private String rtcRequestMemberName;
}
