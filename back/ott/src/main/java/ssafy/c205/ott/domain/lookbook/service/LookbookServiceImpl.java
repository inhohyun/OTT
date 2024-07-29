package ssafy.c205.ott.domain.lookbook.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookFavoriteDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.TagLookbookDto;
import ssafy.c205.ott.domain.lookbook.entity.ActiveStatus;
import ssafy.c205.ott.domain.lookbook.entity.Favorite;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.entity.Tag;
import ssafy.c205.ott.domain.lookbook.repository.FavoriteRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookTagRepository;
import ssafy.c205.ott.domain.lookbook.repository.TagRepository;

@Slf4j
@Service
public class LookbookServiceImpl implements LookbookService {

    @Autowired
    private LookbookRepository lookbookRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private LookbookTagRepository lookbookTagRepository;
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Override
    public void createLookbook(LookbookDto lookbookCreateDto) {
        //태그 유무 확인 및 태그 추가
        List<LookbookTag> lookbookTags = new ArrayList<>();
        for (String tag : lookbookCreateDto.getTags()) {
            Tag tagEntity = tagRepository.findByName(tag);
            if (tagEntity == null) {
                tagRepository.save(Tag
                    .builder()
                    .name(tag)
                    .count(1L)
                    .build());
            } else {
                tagRepository.save(Tag
                    .builder()
                    .id(tagEntity.getId())
                    .name(tagEntity.getName())
                    .count(tagEntity.getCount() + 1)
                    .build());
            }
            //Todo : lookbook 어떻게 넣을지 생각
            lookbookTags.add(LookbookTag
                .builder()
//                .lookbook(lookbook)
                .tag(tagRepository.findByName(tag))
                .build());
        }
        //옷 사진 추가하기
        //Todo : 옷 끝나면 옷 정보 및 사진 넣기

        //룩북 추가하기
        //Todo : 옷 내용들, 옷 사진, 사용자 넣을 것
        lookbookRepository.save(Lookbook
            .builder()
            .content(lookbookCreateDto.getContent())
            .publicStatus(lookbookCreateDto.getPublicStatus())
            .lookbookTags(lookbookTags)
            .build());
    }

    @Override
    public LookbookDetailDto detailLookbook(String lookbookId) {
        Optional<Lookbook> odl = lookbookRepository.findById(Long.parseLong(lookbookId));
        Lookbook lookbook = null;
        if (odl.isPresent()) {
            lookbook = odl.get();
            lookbookRepository.save(Lookbook
                .builder()
                .id(lookbook.getId())
                .hitCount(lookbook.getHitCount() + 1)
                .build());
            return LookbookDetailDto
                .builder()
                .content(lookbook.getContent())
                .id(lookbook.getId())
                .lookbookItems(lookbook.getLookbookItemList())
                .lookbookImages(lookbook.getLookbookImages())
                .lookbookTags(lookbook.getLookbookTags())
                .member(lookbook.getMember())
                .hitCount(lookbook.getHitCount() + 1)
                .createdAt(lookbook.getCreatedAt())
                .build();
        } else {
            log.error("{}아이디를 갖은 룩북을 찾지 못했습니다.", lookbookId);
            return null;
        }
    }

    @Override
    public boolean deleteLookbook(String lookbookId) {
        //룩북 불러오기
        Optional<Lookbook> ol = lookbookRepository.findById(Long.parseLong(lookbookId));
        Lookbook lookbook = null;
        if (ol.isPresent()) {
            lookbook = ol.get();
            //태그 카운트 줄이기
            for (LookbookTag lookbookTag : lookbook.getLookbookTags()) {
                Tag tag = lookbookTag.getTag();
                if (tag.getCount() == 1) {
                    tagRepository.delete(tag);
                } else {
                    tagRepository.save(Tag
                        .builder()
                        .id(tag.getId())
                        .count(tag.getCount() - 1)
                        .build());
                }
                lookbookTagRepository.deleteById(lookbookTag.getId());
            }
            //룩북 삭제
            lookbookRepository.save(Lookbook
                .builder()
                .id(lookbook.getId())
                .activeStatus(ActiveStatus.INACTIVE)
                .build());
            log.info("룩북 제거 성공");
            return true;
        } else {
            log.error("{}아이디를 갖은 룩북을 찾지 못했습니다.", lookbookId);
            return false;
        }
    }

    @Override
    public boolean updateLookbook(String lookbookId, LookbookDto lookbookUpdateDto) {
        Optional<Lookbook> ol = lookbookRepository.findById(Long.parseLong(lookbookId));
        List<LookbookTag> lookbookTags = new ArrayList<>();
        if (ol.isPresent()) {
            Lookbook lookbook = ol.get();

            //기존 태그 삭제
            for (LookbookTag lookbookTag : lookbook.getLookbookTags()) {
                Tag tag = lookbookTag.getTag();
                if (tag.getCount() == 1) {
                    tagRepository.delete(tag);
                } else {
                    tagRepository.save(Tag.builder()
                        .id(tag.getId())
                        .count(tag.getCount() - 1)
                        .build());
                }
                lookbookTagRepository.delete(lookbookTag);
            }

            //신규 태그 등록
            for (String tag : lookbookUpdateDto.getTags()) {
                Tag tagEntity = tagRepository.findByName(tag);
                if (tagEntity == null) {
                    tagRepository.save(Tag
                        .builder()
                        .name(tag)
                        .count(1L)
                        .build());
                } else {
                    tagRepository.save(Tag
                        .builder()
                        .id(tagEntity.getId())
                        .count(tagEntity.getCount() + 1)
                        .build());
                }
                LookbookTag lookbookTag = LookbookTag
                    .builder()
                    .tag(tagRepository.findByName(tag))
                    .lookbook(lookbook)
                    .build();
                lookbookTagRepository.save(lookbookTag);
                lookbookTags.add(lookbookTag);
            }

            //옷 정보 수정
            //Todo : 옷 부분 끝나고 옷 정보 수정 구현

            //Todo : 옷 사진이랑 옷정보 수정정보 넣읅것
            lookbookRepository.save(Lookbook
                .builder()
                .id(lookbook.getId())
                .publicStatus(lookbookUpdateDto.getPublicStatus())
                .content(lookbookUpdateDto.getContent())
                .lookbookTags(lookbookTags)
                .build());
            return true;
        } else {
            return false;
        }
    }

    //Todo : 멤버값(Member) 넣어주기
    @Override
    public boolean likeLookbook(LookbookFavoriteDto lookbookFavoriteDto) {
        Optional<Lookbook> ol = lookbookRepository.findById(
            Long.valueOf(lookbookFavoriteDto.getLookbookId()));
        if (ol.isPresent()) {
            Lookbook lookbook = ol.get();
            favoriteRepository.save(Favorite
                .builder()
                .lookbook(lookbook)
                .build());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean dislikeLookbook(LookbookFavoriteDto lookbookFavoriteDto) {
        //Todo : 멤버 id로 id(pk)값 찾아서 null 위치에 넣기 / 예외 생각
        Favorite favoriteLookbook = favoriteRepository.findByLookbookIdAndUserId(
            Long.parseLong(lookbookFavoriteDto.getLookbookId()),
            null);
        favoriteRepository.delete(favoriteLookbook);
        return true;
    }

    @Override
    public int cntLikeLookbook(String lookbookId) {
        List<Favorite> lookbookLikes = favoriteRepository.findByLookbookId(
            Long.parseLong(lookbookId));
        if (lookbookLikes == null) {
            return -1;
        }
        return lookbookLikes.size();
    }

    // Todo : 룩북 썸네일 경로, 룩북의 유저정보, 생성일자로 보내줄 것
    @Override
    public List<Lookbook> findPublicLookbooks(String uid) {
        return lookbookRepository.findByMemberIdAndPublicStatus(Long.parseLong(uid),
            PublicStatus.PUBLIC);
    }

    // Todo : 룩북 썸네일 경로, 룩북의 유저정보, 생성일자로 보내줄 것
    @Override
    public List<Lookbook> findPrivateLookbooks(String uid) {
        return lookbookRepository.findByMemberIdAndPublicStatus(Long.parseLong(uid),
            PublicStatus.PRIVATE);
    }

    @Override
    public List<TagLookbookDto> findByTag(String[] tags) {
        HashMap<Long, Integer> map = new HashMap<>();
        for (String tag : tags) {
            Tag tagEntity = tagRepository.findByName(tag);
            //태그가 존재하지 않으면 다음 태그로 넘어감
            if (tagEntity == null) {
                continue;
            }

            //태그가 포함된 룩북들을 가지고 옴
            List<LookbookTag> findLookbooks = lookbookTagRepository.findByTagName(tag);
            for (LookbookTag findLookbook : findLookbooks) {
                Lookbook lookbook = findLookbook.getLookbook();
                long id = lookbook.getId();

                //검색 태그 카운팅
                if (map.containsKey(id)) {
                    map.put(id, map.get(id) + 1);
                } else {
                    map.put(id, 1);
                }
            }
        }
        // Hashmap value값을 기반으로 sort
        List<Long> keys = new ArrayList<>(map.keySet());
        Collections.sort(keys, (v1, v2) -> (map.get(v2).compareTo(map.get(v1))));

        // sort된 key값(lookbookid)로 룩북 정보를 가져와 리스트에 저장
        List<TagLookbookDto> lookbooks = new ArrayList<>();
        for (Long key : keys) {
            Optional<Lookbook> ol = lookbookRepository.findById(key);
            if (ol.isPresent()) {
                Lookbook lookbook = ol.get();
                lookbooks.add(TagLookbookDto
                    .builder()
                    .id(lookbook.getId())
                    .hitCount(lookbook.getHitCount())
                    .content(lookbook.getContent())
                    .publicStatus(lookbook.getPublicStatus())
                    .activeStatus(lookbook.getActiveStatus())
                    .member(lookbook.getMember())
                    .lookbookItemList(lookbook.getLookbookItemList())
                    .lookbookTags(lookbook.getLookbookTags())
                    .comments(lookbook.getComments())
                    .lookbookImages(lookbook.getLookbookImages())
                    .build()
                );
            }
        }

        //return
        return lookbooks;
    }
}
