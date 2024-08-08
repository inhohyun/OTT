package ssafy.c205.ott.domain.recommend.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ssafy.c205.ott.common.entity.MemberTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.BodyType;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.lookbook.entity.Favorite;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.repository.FavoriteRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.lookbook.service.CommentService;
import ssafy.c205.ott.domain.lookbook.service.LookbookService;
import ssafy.c205.ott.domain.recommend.dto.responsedto.BodyResponseDto;
import ssafy.c205.ott.domain.recommend.entity.MemberGroup;
import ssafy.c205.ott.domain.recommend.repository.MemberGroupRepository;
import ssafy.c205.ott.domain.recommend.repository.MemberTagRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendServiceImpl implements RecommendService {

    private final MemberRepository memberRepository;
    private final MemberGroupRepository groupRepository;
    private final LookbookRepository lookbookRepository;
    private final CommentService commentService;
    private final LookbookService lookbookService;
    private final FavoriteRepository favoriteRepository;
    private final MemberTagRepository memberTagRepository;

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
                boolean isFavorite = false;
                Favorite myFavor = favoriteRepository.findByLookbookIdAndMemberId(lookbook.getId(),
                    memberUid);
                if (myFavor != null) {
                    isFavorite = true;
                }

                bodyResponseDtos.add(
                    BodyResponseDto.builder().img(lookbook.getLookbookImages().get(0).getImageUrl())
                        .memberId(memberUid)
                        .lookbookId(lookbook.getId())
                        .nickname(lookbook.getMember().getNickname())
                        .createdAt(lookbook.getCreatedAt())
                        .cntComment(commentService.countComment(String.valueOf(lookbook.getId())))
                        .cntFavorite(
                            lookbookService.cntLikeLookbook(String.valueOf(lookbook.getId())))
                        .isFavorite(isFavorite)
                        .build());
            }
        }
        return bodyResponseDtos;
    }

    @Override
    public List<BodyResponseDto> getRecommendByBody(Long memberId) {
        //return할 배열 선언
        List<BodyResponseDto> bodyResponseDtos = new ArrayList<>();

        //현재 사용자 검색
        Optional<Member> om = memberRepository.findByIdAndActiveStatus(memberId,
            ActiveStatus.ACTIVE);
        Member findMember = null;
        if (om.isPresent()) {
            findMember = om.get();
        }

        //사용자와 같은 체형의 사용자들 검색
        List<Member> members = memberRepository.findByBodyTypeAndActiveStatus(
            findMember.getBodyType(), ActiveStatus.ACTIVE);

        for (Member member : members) {
            //회원탈퇴 or 나면 패스
            if (member.getId() == memberId || member.getActiveStatus()
                .equals(ActiveStatus.INACTIVE)) {
                continue;
            }

            //해당 사용자들의 룩북 조회 (공개 + 삭제X)
            List<Lookbook> lookbooks = lookbookRepository.findByMemberIdAndPublicStatusAndActiveStatus(
                member.getId(),
                PublicStatus.PUBLIC, ssafy.c205.ott.domain.lookbook.entity.ActiveStatus.ACTIVE);
            //룩북 추가
            for (Lookbook lookbook : lookbooks) {
                boolean isFavorite = false;
                Favorite myFavor = favoriteRepository.findByLookbookIdAndMemberId(lookbook.getId(), member.getId());
                if (myFavor != null) {
                    isFavorite = true;
                }
                bodyResponseDtos.add(BodyResponseDto
                    .builder()
                    .cntFavorite(lookbookService.cntLikeLookbook(String.valueOf(lookbook.getId())))
                    .img(lookbook.getLookbookImages().get(0).getImageUrl())
                    .cntComment(commentService.countComment(String.valueOf(lookbook.getId())))
                    .createdAt(lookbook.getCreatedAt())
                    .nickname(lookbook.getMember().getNickname())
                    .memberId(lookbook.getMember().getId())
                    .lookbookId(lookbook.getId())
                    .isFavorite(isFavorite)
                    .build());
            }
        }
        return bodyResponseDtos;
    }

    @Override
    public List<BodyResponseDto> getRecommendByTag(Long memberId) {
        List<BodyResponseDto> bodyResponseDtos = new ArrayList<>();
        Member member = null;
        Optional<Member> om = memberRepository.findByIdAndActiveStatus(memberId,
            ActiveStatus.ACTIVE);
        if (om.isPresent()) {
            member = om.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, memberId + "의 사용자를 찾지 못했습니다.");
        }
        List<MemberTag> memberTags = memberTagRepository.findByMemberId(memberId);
        for (MemberTag memberTag : memberTags) {
            memberTag.getTag();
        }

        return bodyResponseDtos;
    }
}
