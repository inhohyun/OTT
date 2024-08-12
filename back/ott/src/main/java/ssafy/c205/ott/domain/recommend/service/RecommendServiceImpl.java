package ssafy.c205.ott.domain.recommend.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.common.entity.MemberTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookSearchDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.TagLookbookDto;
import ssafy.c205.ott.domain.lookbook.entity.Favorite;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.repository.FavoriteRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookTagRepository;
import ssafy.c205.ott.domain.lookbook.repository.TagRepository;
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
    private final LookbookTagRepository lookbookTagRepository;
    private final TagRepository tagRepository;

    @Override
    public void recommendByHeightWeight() {
        List<Member> members = memberRepository.findByActiveStatus(ActiveStatus.ACTIVE);

        //K-Means를 통해 그룹화
        KMeans kMeans = new KMeans(10, members);
        kMeans.performClustering();

        //데이터베이스에 반영
        groupRepository.truncateMemberGroup();

        List<List<Member>> clusters = kMeans.getClusters();
        int idx = 0;
        for (List<Member> cluster : clusters) {
            for (Member member : cluster) {
                groupRepository.save(MemberGroup.builder().groupId(idx).member(
                    memberRepository.findByIdAndActiveStatus(member.getId(), ActiveStatus.ACTIVE)
                        .get()).build());
            }
            idx++;
        }
    }

    @Override
    public List<BodyResponseDto> getRecommendByHeightWeight(Long memberId) {
        //해당 멤버의 그룹을 찾기
        MemberGroup memberGroup = groupRepository.findByMemberId(memberId);
        List<BodyResponseDto> bodyResponseDtos = new ArrayList<>();

        //신규회원이여서 데이터가 없으면?
        if (memberGroup == null) {
            List<Lookbook> lookbooks = lookbookRepository.findByActiveStatus(
                ssafy.c205.ott.domain.lookbook.entity.ActiveStatus.ACTIVE);
            for (Lookbook lookbook : lookbooks) {
                boolean isFavorite = false;
                if (lookbook.getMember().getId() == memberId) {
                    continue;
                }
                Favorite favorite = favoriteRepository.findByLookbookIdAndMemberId(lookbook.getId(),
                    memberId);
                if (favorite != null) {
                    isFavorite = true;
                }
                bodyResponseDtos.add(
                    BodyResponseDto.builder().memberId(lookbook.getMember().getId())
                        .img(lookbook.getLookbookImages().get(0).getImageUrl()).cntFavorite(
                            lookbookService.cntLikeLookbook(String.valueOf(lookbook.getId())))
                        .cntComment(commentService.countComment(String.valueOf(lookbook.getId())))
                        .createdAt(lookbook.getCreatedAt())
                        .nickname(lookbook.getMember().getNickname()).lookbookId(lookbook.getId())
                        .isFavorite(isFavorite).build());
            }
            return bodyResponseDtos;
        }

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
                        .memberId(memberUid).lookbookId(lookbook.getId())
                        .nickname(lookbook.getMember().getNickname())
                        .createdAt(lookbook.getCreatedAt())
                        .cntComment(commentService.countComment(String.valueOf(lookbook.getId())))
                        .cntFavorite(
                            lookbookService.cntLikeLookbook(String.valueOf(lookbook.getId())))
                        .isFavorite(isFavorite).build());
            }
        }
        return bodyResponseDtos;
    }

    @Override
    public List<BodyResponseDto> getRecommendByBody(Long memberId) {
        //return할 배열 선언
        List<BodyResponseDto> bodyResponseDtos = new ArrayList<>();

        //현재 사용자 검색
        Member findMember = memberRepository.findByIdAndActiveStatus(memberId,
            ActiveStatus.ACTIVE).orElseThrow(MemberNotFoundException::new);

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
                member.getId(), PublicStatus.PUBLIC,
                ssafy.c205.ott.domain.lookbook.entity.ActiveStatus.ACTIVE);
            //룩북 추가
            for (Lookbook lookbook : lookbooks) {
                boolean isFavorite = false;
                Favorite myFavor = favoriteRepository.findByLookbookIdAndMemberId(lookbook.getId(),
                    member.getId());
                if (myFavor != null) {
                    isFavorite = true;
                }
                bodyResponseDtos.add(BodyResponseDto.builder()
                    .cntFavorite(lookbookService.cntLikeLookbook(String.valueOf(lookbook.getId())))
                    .img(lookbook.getLookbookImages().get(0).getImageUrl())
                    .cntComment(commentService.countComment(String.valueOf(lookbook.getId())))
                    .createdAt(lookbook.getCreatedAt()).nickname(lookbook.getMember().getNickname())
                    .memberId(lookbook.getMember().getId()).lookbookId(lookbook.getId())
                    .isFavorite(isFavorite).build());
            }
        }
        //체형이 같은사람이 없거나 룩북이 없으면
        if (bodyResponseDtos.isEmpty()) {
            List<Lookbook> lookbooks = lookbookRepository.findByActiveStatus(
                ssafy.c205.ott.domain.lookbook.entity.ActiveStatus.ACTIVE);

            //모든 룩북을 가져옴
            for (Lookbook lookbook : lookbooks) {
                if (lookbook.getMember().getId() == memberId) {
                    continue;
                }
                boolean isFavorite = false;
                Favorite favorite = favoriteRepository.findByLookbookIdAndMemberId(lookbook.getId(),
                    memberId);
                if (favorite != null) {
                    isFavorite = true;
                }
                bodyResponseDtos.add(BodyResponseDto.builder()
                    .cntFavorite(lookbookService.cntLikeLookbook(String.valueOf(lookbook.getId())))
                    .img(lookbook.getLookbookImages().get(0).getImageUrl())
                    .cntComment(commentService.countComment(String.valueOf(lookbook.getId())))
                    .createdAt(lookbook.getCreatedAt()).nickname(lookbook.getMember().getNickname())
                    .memberId(lookbook.getMember().getId()).lookbookId(lookbook.getId())
                    .isFavorite(isFavorite).build());
            }
        }

        //return
        return bodyResponseDtos;
    }

    @Override
    public List<BodyResponseDto> getRecommendByTag(Long memberId) {
        List<BodyResponseDto> bodyResponseDtos = new ArrayList<>();

        //사용자를 불러온다.
        Member member = memberRepository.findByIdAndActiveStatus(memberId, ActiveStatus.ACTIVE)
            .orElseThrow(MemberNotFoundException::new);
        List<MemberTag> memberTags = memberTagRepository.findByMemberId(memberId);

        //사용자의 룩북 태그들 조회(사용자의 좋아요한 게시물이 10개 이상일 때)
        List<Favorite> favorites = favoriteRepository.findByMemberId(memberId);
        HashMap<Long, Integer> map = new HashMap<>();
        if (favorites == null || favorites.isEmpty() || favorites.size() <= 10) {
            log.info("10개 미만으로 들어옴 / favorites 크기 : {}", favorites.size());
            //사용자 멤버태그로 추천 서비스(10개 이하일때)
            for (MemberTag memberTag : memberTags) {
                String tagName = memberTag.getTag().getName();
                log.info("tag : {}", tagName);

                //해당 태그의 유저들을 조회
                List<MemberTag> memberTagList = memberTagRepository.findByTagName(tagName);
                for (MemberTag tag : memberTagList) {
                    //본인제외
                    if (tag.getMember().getId() == memberId) {
                        continue;
                    }
                    Long curMemberId = tag.getMember().getId();

                    //태그 카운팅
                    if (map.containsKey(curMemberId)) {
                        map.put(curMemberId, map.get(curMemberId) + 1);
                    } else {
                        map.put(curMemberId, 1);
                    }
                }
            }
            //sort해서 태그 많이 포함된 유저들의 룩북들로 리스트 구성
            List<Long> keys = new ArrayList<>(map.keySet());
            Collections.sort(keys, (v1, v2) -> (map.get(v2).compareTo(map.get(v1))));
            for (Long key : keys) {
                Member otherMember = memberRepository.findByIdAndActiveStatus(key,
                    ActiveStatus.ACTIVE).orElseThrow(MemberNotFoundException::new);
                List<Lookbook> lookbooks = lookbookRepository.findByMemberIdAndActiveStatus(
                    otherMember.getId(),
                    ssafy.c205.ott.domain.lookbook.entity.ActiveStatus.ACTIVE);

                for (Lookbook lookbook : lookbooks) {
                    log.info("lookbook : {}", lookbook.toString());
                    boolean isFavorite = false;
                    Favorite myFavor = favoriteRepository.findByLookbookIdAndMemberId(
                        lookbook.getId(), otherMember.getId());
                    if (myFavor != null) {
                        isFavorite = true;
                    }

                    bodyResponseDtos.add(BodyResponseDto.builder().lookbookId(lookbook.getId())
                        .memberId(otherMember.getId()).cntFavorite(
                            lookbookService.cntLikeLookbook(String.valueOf(lookbook.getId())))
                        .cntComment(
                            commentService.countComment(String.valueOf(lookbook.getId())))
                        .img(lookbook.getLookbookImages().get(0).getImageUrl())
                        .nickname(otherMember.getNickname()).createdAt(lookbook.getCreatedAt())
                        .build());
                }
            }
        } else {
            log.info("룩북 좋아요 개수가 10개 넘을때");
            //사용자가 좋아요 누른 게시물들의 태그를 가져온다.
            for (Favorite favorite : favorites) {
                List<LookbookTag> lookbookTags = favorite.getLookbook().getLookbookTags();
                for (LookbookTag lookbookTag : lookbookTags) {
                    long tagId = lookbookTag.getTag().getId();
                    if (map.containsKey(tagId)) {
                        map.put(tagId, map.get(tagId) + 1);
                    } else {
                        map.put(tagId, 1);
                    }
                }
            }
            List<Long> keys = new ArrayList<>(map.keySet());
            Collections.sort(keys, (v1, v2) -> (map.get(v2).compareTo(map.get(v1))));
            String[] tags = new String[3];
            for (int i = 0; i < 3; i++) {
                tags[i] = tagRepository.findById(keys.get(i)).get().getName();
            }
            List<TagLookbookDto> lookbookDtos = lookbookService.findByTag(
                LookbookSearchDto.builder().tags(tags).build());
            for (TagLookbookDto lookbookDto : lookbookDtos) {
                bodyResponseDtos.add(BodyResponseDto.builder().createdAt(lookbookDto.getCreatedAt())
                    .lookbookId(lookbookDto.getLookbookId()).nickname(lookbookDto.getNickname())
                    .cntFavorite(lookbookDto.getCntFavorite())
                    .cntComment(lookbookDto.getCntComment()).memberId(
                        lookbookRepository.findById(lookbookDto.getLookbookId()).get().getMember()
                            .getId()).img(lookbookDto.getImg()).build());
            }
        }

        //태그가 겹치는 사람이 없으면
        if (bodyResponseDtos.isEmpty()) {
            List<Lookbook> lookbooks = lookbookRepository.findByActiveStatus(
                ssafy.c205.ott.domain.lookbook.entity.ActiveStatus.ACTIVE);
            for (Lookbook lookbook : lookbooks) {
                if (lookbook.getMember().getId() == memberId) {
                    continue;
                }
                boolean isFavorite = false;
                Favorite myFavor = favoriteRepository.findByLookbookIdAndMemberId(lookbook.getId(),
                    memberId);
                if (myFavor != null) {
                    isFavorite = true;
                }
                bodyResponseDtos.add(BodyResponseDto.builder()
                    .cntFavorite(lookbookService.cntLikeLookbook(String.valueOf(lookbook.getId())))
                    .img(lookbook.getLookbookImages().get(0).getImageUrl())
                    .cntComment(commentService.countComment(String.valueOf(lookbook.getId())))
                    .createdAt(lookbook.getCreatedAt()).nickname(lookbook.getMember().getNickname())
                    .memberId(lookbook.getMember().getId()).lookbookId(lookbook.getId())
                    .isFavorite(isFavorite).build());
            }
        }
        return bodyResponseDtos;
    }
}
