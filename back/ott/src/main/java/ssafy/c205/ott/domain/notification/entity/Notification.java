package ssafy.c205.ott.domain.notification.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import ssafy.c205.ott.common.entity.BaseEntity;

import java.time.LocalDateTime;

@Entity
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Notification{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    NotificationStatus notificationStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    NotificationType notificationType;

    @Column(nullable = false)
    private Long memberId;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Type(JsonType.class)
    @Column(name = "additionalData", columnDefinition = "longtext")
    private Map<String, Object> additionalData;

    public void updateNotificationStatus(NotificationStatus status) {
        this.notificationStatus = status;
    }
}
