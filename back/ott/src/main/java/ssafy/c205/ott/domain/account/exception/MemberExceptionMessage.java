package ssafy.c205.ott.domain.account.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MemberExceptionMessage {
    MEMBER_NOT_FOUND("해당 유저가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    MEMBER_NICKNAME_DUPLICATE("이미 존재하는 닉네임입니다.", HttpStatus.CONFLICT.value()),
    SELF_FOLLOW("자기 자신은 팔로우할 수 없습니다.", HttpStatus.BAD_REQUEST.value()),
    ALREADY_FOLLOW("이미 팔로우 한 상대입니다.", HttpStatus.BAD_REQUEST.value()),;

    private final String message;
    private final int status;

    MemberExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
