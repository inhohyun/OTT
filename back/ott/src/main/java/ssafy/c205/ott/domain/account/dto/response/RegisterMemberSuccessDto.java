package ssafy.c205.ott.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RegisterMemberSuccessDto {
    private final String message = "등록 완료";
    private final Long memberId;

    @Builder
    public RegisterMemberSuccessDto(Long memberId) {
        this.memberId = memberId;
    }
}
