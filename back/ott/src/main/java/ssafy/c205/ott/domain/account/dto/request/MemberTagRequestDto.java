package ssafy.c205.ott.domain.account.dto.request;
import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class MemberTagRequestDto {
    Long memberId;
    List<String> tag;
}
