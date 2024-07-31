package ssafy.c205.ott.domain.account.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateMemberSuccessDto {
    private final String message = "수정 완료";
    private final Long memberId;

    @Builder
    public UpdateMemberSuccessDto(Long memberId) {
        this.memberId = memberId;
    }
}
