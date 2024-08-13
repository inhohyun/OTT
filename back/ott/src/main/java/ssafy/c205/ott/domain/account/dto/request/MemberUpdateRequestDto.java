package ssafy.c205.ott.domain.account.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import ssafy.c205.ott.common.entity.MemberTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.BodyType;
import ssafy.c205.ott.domain.account.entity.Gender;

import java.util.List;

@Builder
@Getter
public class MemberUpdateRequestDto {
    //Todo: 예외처리 구현
    private Long memberId;

    @Pattern(regexp = "^[a-zA-Z_]+$", message = "닉네임은 영어와 밑줄(_)만 사용할 수 있습니다.")
    @Size(max = 25, message = "닉네임은 25자 이하로 작성해야 합니다.")
    private String nickname;
    private String phoneNumber;
    private String introduction;
    private float height;
    private float weight;
    private Gender gender;
    private BodyType bodyType;
    private PublicStatus publicStatus;
}
