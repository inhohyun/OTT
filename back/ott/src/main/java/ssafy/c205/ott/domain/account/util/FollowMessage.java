package ssafy.c205.ott.domain.account.util;

import lombok.Getter;

@Getter
public enum FollowMessage {
    FOLLOW_REQUEST_MESSAGE("팔로우 요청을 완료하였습니다."),
    FOLLOW_SUCCESS_MESSAGE("팔로우를 성공했습니다."),
    UNFOLLOW_SUCCESS_MESSAGE("팔로우를 취소했습니다."),
    FOLLOW_ACCEPT_MESSAGE("팔로우 요청을 수락했습니다."),
    FOLLOW_REJECT_MESSAGE("팔로우 요청을 거절했습니다.");

    private final String message;

    FollowMessage(String message) {
        this.message = message;
    }
}
