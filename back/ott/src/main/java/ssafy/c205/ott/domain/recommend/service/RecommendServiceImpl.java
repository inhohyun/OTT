package ssafy.c205.ott.domain.recommend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.lookbook.service.CommentService;
import ssafy.c205.ott.domain.lookbook.service.LookbookService;
import ssafy.c205.ott.domain.recommend.dto.responsedto.BodyResponseDto;
import ssafy.c205.ott.domain.recommend.entity.MemberGroup;
import ssafy.c205.ott.domain.recommend.repository.MemberGroupRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendServiceImpl implements RecommendService {

    private final MemberRepository memberRepository;
    private final MemberGroupRepository groupRepository;
    private final LookbookRepository lookbookRepository;
    private final CommentService commentService;
    private final LookbookService lookbookService;

    @Override
    public void recommendByHeightWeight() {
        List<Member> members = memberRepository.findByActiveStatus(ActiveStatus.ACTIVE);
        List<User> users = new ArrayList<>();
        for (Member member : members) {
            users.add(User.builder().memberId(member.getId()).height(member.getHeight())
                .weight(member.getWeight()).build());
        }

        //K-Means를 통해 그룹화
        KMeans kMeans = new KMeans(10, users);
        kMeans.performClustering();

        //데이터베이스에 반영
        groupRepository.truncateMemberGroup();

        List<List<User>> clusters = kMeans.getClusters();
        int idx = 0;
        for (List<User> cluster : clusters) {
            for (User user : cluster) {
                groupRepository.save(MemberGroup.builder().groupId(idx).member(
                    memberRepository.findByIdAndActiveStatus(user.getMemberId(),
                        ActiveStatus.ACTIVE).get()).build());
            }
            idx++;
        }
    }

    @Override
    public List<BodyResponseDto> getRecommendByHeightWeight(Long memberId) {
        //해당 멤버의 그룹을 찾기
        MemberGroup memberGroup = groupRepository.findByMemberId(memberId);
        List<BodyResponseDto> bodyResponseDtos = new ArrayList<>();

        //해당 그룹아이디의 사람들을 찾기
        List<MemberGroup> memberGroups = groupRepository.findByGroupId(memberGroup.getGroupId());
        for (MemberGroup mygroup : memberGroups) {
            Long memberUid = mygroup.getMember().getId();

            //본인이거나 회원탈퇴일경우 pass
            if (Objects.equals(mygroup.getMember().getId(), memberId) || mygroup.getMember()
                .getActiveStatus().equals(ActiveStatus.INACTIVE)) {
                continue;
            }

            //해당 유저의 공개, 삭제X 룩북 불러오기
            List<Lookbook> lookbooks = lookbookRepository.findByMemberIdAndPublicStatusAndActiveStatus(
                memberUid, PublicStatus.PUBLIC,
                ssafy.c205.ott.domain.lookbook.entity.ActiveStatus.ACTIVE);

            //출력 데이터 넣기
            for (Lookbook lookbook : lookbooks) {
                bodyResponseDtos.add(
                    BodyResponseDto.builder().img(lookbook.getLookbookImages().get(0).getImageUrl())
                        .memberId(memberUid).lookbookId(lookbook.getId())
                        .nickname(lookbook.getMember().getNickname())
                        .createdAt(lookbook.getCreatedAt())
                        .cntComment(commentService.countComment(String.valueOf(lookbook.getId())))
                        .cntFavorite(
                            lookbookService.cntLikeLookbook(String.valueOf(lookbook.getId())))
                        .build());
            }
        }
        return bodyResponseDtos;
    }
}
